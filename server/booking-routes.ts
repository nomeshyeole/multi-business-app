import express from 'express';
import { IStorage } from './storage-enhanced';
import { authenticate } from './auth';
import { addDays, format, parseISO } from 'date-fns';
import { z } from 'zod';

// Type for authenticated request
interface AuthRequest extends express.Request {
  userId?: number;
}

export function setupBookingRoutes(app: express.Express, storage: IStorage) {
  // Check availability endpoint
  app.get('/api/bookings/availability', async (req, res) => {
    try {
      const serviceId = parseInt(req.query.serviceId as string);
      const date = req.query.date as string;
      const timeSlot = req.query.timeSlot as string;

      if (!serviceId || !date) {
        return res.status(400).json({ error: 'Service ID and date are required' });
      }

      // If timeSlot is provided, check specific slot availability
      if (timeSlot) {
        const isAvailable = await storage.checkAvailability(serviceId, date, timeSlot);
        return res.json({ isAvailable });
      } 
      
      // Otherwise, return all available slots for the date
      const availableSlots = await storage.getAvailableTimeSlots(serviceId, date);
      return res.json({ availableSlots });
    } catch (error) {
      console.error('Error checking availability:', error);
      return res.status(500).json({ error: 'Failed to check availability' });
    }
  });

  // Create booking endpoint
  app.post('/api/bookings', authenticate, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Validate required fields
      const bookingSchema = z.object({
        service_id: z.number(),
        date: z.string(),
        time_slot: z.string(),
        payment_method: z.string(),
        payment_status: z.string(),
        is_recurring: z.boolean().optional(),
        recurrence_end_date: z.string().optional()
      });

      const validatedData = bookingSchema.parse(req.body);
      
      // Check if the slot is available
      const isAvailable = await storage.checkAvailability(
        validatedData.service_id, 
        validatedData.date, 
        validatedData.time_slot
      );
      
      if (!isAvailable) {
        return res.status(400).json({ error: 'This time slot is not available' });
      }

      // Handle recurring bookings
      if (validatedData.is_recurring && validatedData.recurrence_end_date) {
        const bookings = await storage.createRecurringBookings(
          {
            user_id: req.userId,
            service_id: validatedData.service_id,
            date: validatedData.date,
            time_slot: validatedData.time_slot,
            payment_method: validatedData.payment_method,
            payment_status: validatedData.payment_status,
            booking_status: 'confirmed'
          },
          validatedData.recurrence_end_date
        );
        
        return res.status(201).json({
          message: `Created ${bookings.length} recurring bookings`,
          bookings
        });
      }

      // Regular single booking
      const booking = await storage.createBooking({
        user_id: req.userId,
        service_id: validatedData.service_id,
        date: validatedData.date,
        time_slot: validatedData.time_slot,
        payment_method: validatedData.payment_method,
        payment_status: validatedData.payment_status,
        booking_status: 'confirmed'
      });
      
      return res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid booking data', details: error.errors });
      }
      
      return res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  // Get user's bookings
  app.get('/api/bookings', authenticate, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const userBookings = await storage.getBookingsByUser(req.userId);
      return res.json(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Get single booking
  app.get('/api/bookings/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      // Only allow users to see their own bookings or admins (future feature)
      if (booking.user_id !== req.userId) {
        return res.status(403).json({ error: 'Not authorized to view this booking' });
      }
      
      return res.json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      return res.status(500).json({ error: 'Failed to fetch booking' });
    }
  });

  // Cancel booking
  app.post('/api/bookings/:id/cancel', authenticate, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      
      // Only allow users to cancel their own bookings
      if (booking.user_id !== req.userId) {
        return res.status(403).json({ error: 'Not authorized to cancel this booking' });
      }
      
      const { reason } = req.body;
      const cancelledBooking = await storage.cancelBooking(bookingId, reason);
      
      if (!cancelledBooking) {
        return res.status(400).json({ error: 'Could not cancel booking' });
      }
      
      return res.json({
        message: 'Booking cancelled successfully',
        booking: cancelledBooking
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      return res.status(500).json({ error: 'Failed to cancel booking' });
    }
  });

  // Create or update service availability
  app.post('/api/services/:id/availability', authenticate, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const serviceId = parseInt(req.params.id);
      const service = await storage.getService(serviceId);
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      // In a real app, check if user is the business owner or admin
      // For now, we'll allow any authenticated user to update availability
      
      const availabilityRecords = req.body.availability;
      if (!Array.isArray(availabilityRecords)) {
        return res.status(400).json({ error: 'Availability must be an array' });
      }
      
      const createdRecords = [];
      
      for (const record of availabilityRecords) {
        const { day_of_week, start_time, end_time, max_bookings } = record;
        
        // Validate required fields
        if (day_of_week === undefined || !start_time || !end_time) {
          return res.status(400).json({ error: 'Each availability record must have day_of_week, start_time, and end_time' });
        }
        
        const availabilityRecord = await storage.createAvailability({
          service_id: serviceId,
          day_of_week,
          start_time,
          end_time,
          max_bookings: max_bookings || 1
        });
        
        createdRecords.push(availabilityRecord);
      }
      
      return res.status(201).json(createdRecords);
    } catch (error) {
      console.error('Error setting availability:', error);
      return res.status(500).json({ error: 'Failed to set availability' });
    }
  });

  // Get service availability
  app.get('/api/services/:id/availability', async (req, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      const service = await storage.getService(serviceId);
      
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      const availability = await storage.getServiceAvailability(serviceId);
      return res.json(availability);
    } catch (error) {
      console.error('Error fetching availability:', error);
      return res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  // Set business settings
  app.post('/api/businesses/:id/settings', authenticate, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      
      const businessId = parseInt(req.params.id);
      const business = await storage.getBusiness(businessId);
      
      if (!business) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      // In a real app, check if user is the business owner or admin
      // For now, we'll allow any authenticated user to update settings
      
      // Check if settings already exist
      const existingSettings = await storage.getBusinessSettings(businessId);
      
      if (existingSettings) {
        // Update existing settings
        const updatedSettings = await storage.updateBusinessSettings(existingSettings.id, {
          ...req.body,
          business_id: businessId
        });
        
        return res.json(updatedSettings);
      } else {
        // Create new settings
        const newSettings = await storage.createBusinessSettings({
          business_id: businessId,
          ...req.body
        });
        
        return res.status(201).json(newSettings);
      }
    } catch (error) {
      console.error('Error setting business settings:', error);
      return res.status(500).json({ error: 'Failed to set business settings' });
    }
  });

  // Get business settings
  app.get('/api/businesses/:id/settings', async (req, res) => {
    try {
      const businessId = parseInt(req.params.id);
      const business = await storage.getBusiness(businessId);
      
      if (!business) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      const settings = await storage.getBusinessSettings(businessId);
      
      if (!settings) {
        return res.status(404).json({ error: 'No settings found for this business' });
      }
      
      return res.json(settings);
    } catch (error) {
      console.error('Error fetching business settings:', error);
      return res.status(500).json({ error: 'Failed to fetch business settings' });
    }
  });

  return app;
}

// A separate function that can be run as a scheduled job
export async function sendBookingReminders(storage: IStorage) {
  try {
    const bookingsNeedingReminders = await storage.getBookingsForReminders();
    console.log(`Found ${bookingsNeedingReminders.length} bookings needing reminders`);
    
    for (const booking of bookingsNeedingReminders) {
      // In a real app, you would send an email or SMS here
      console.log(`Sending reminder for booking ${booking.id} on ${booking.date} at ${booking.time_slot}`);
      
      // Mark reminder as sent
      await storage.markReminderSent(booking.id);
    }
    
    return bookingsNeedingReminders.length;
  } catch (error) {
    console.error('Error sending booking reminders:', error);
    throw error;
  }
}
