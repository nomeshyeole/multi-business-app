import { db } from './db';
import { eq, and, gte, lt, sql, inArray } from 'drizzle-orm';
import { 
  users, businesses, services, reviews, bookings, availability, businessSettings,
  type User, type InsertUser,
  type Business, type InsertBusiness,
  type Service, type InsertService,
  type Review, type InsertReview,
  type Booking, type InsertBooking,
  type Availability, type InsertAvailability,
  type BusinessSettings, type InsertBusinessSettings
} from '../shared/schema';
import { addDays, format, parse, parseISO } from 'date-fns';

// Storage interface that defines all database operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Business methods
  getBusiness(id: number): Promise<Business | undefined>;
  getAllBusinesses(): Promise<Business[]>;
  getBusinessesByType(type: string): Promise<Business[]>;
  createBusiness(business: InsertBusiness): Promise<Business>;
  updateBusiness(id: number, business: Partial<InsertBusiness>): Promise<Business | undefined>;
  deleteBusiness(id: number): Promise<boolean>;
  
  // Service methods
  getService(id: number): Promise<Service | undefined>;
  getServicesForBusiness(businessId: number): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Review methods
  getReview(id: number): Promise<Review | undefined>;
  getReviewsForBusiness(businessId: number): Promise<Review[]>;
  getReviewsForUser(userId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  deleteReview(id: number): Promise<boolean>;

  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBookingsByService(serviceId: number): Promise<Booking[]>;
  checkAvailability(serviceId: number, date: string, timeSlot: string): Promise<boolean>;
  getAvailableTimeSlots(serviceId: number, date: string): Promise<string[]>;
  cancelBooking(id: number, reason?: string): Promise<Booking | undefined>;
  createRecurringBookings(initialBooking: InsertBooking, endDate: string): Promise<Booking[]>;
  getBookingsForReminders(): Promise<Booking[]>;
  markReminderSent(id: number): Promise<boolean>;

  // Availability methods
  createAvailability(availability: InsertAvailability): Promise<Availability>;
  getServiceAvailability(serviceId: number): Promise<Availability[]>;
  updateAvailability(id: number, availability: Partial<InsertAvailability>): Promise<Availability | undefined>;

  // Business Settings methods
  getBusinessSettings(businessId: number): Promise<BusinessSettings | undefined>;
  createBusinessSettings(settings: InsertBusinessSettings): Promise<BusinessSettings>;
  updateBusinessSettings(id: number, settings: Partial<InsertBusinessSettings>): Promise<BusinessSettings | undefined>;
}

// Database implementation of storage
export class DbStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Business methods
  async getBusiness(id: number): Promise<Business | undefined> {
    const result = await db.select().from(businesses).where(eq(businesses.id, id));
    return result[0];
  }

  async getAllBusinesses(): Promise<Business[]> {
    return await db.select().from(businesses);
  }

  async getBusinessesByType(type: string): Promise<Business[]> {
    return await db.select().from(businesses).where(eq(businesses.type, type));
  }

  async createBusiness(business: InsertBusiness): Promise<Business> {
    const result = await db.insert(businesses).values(business).returning();
    return result[0];
  }

  async updateBusiness(id: number, business: Partial<InsertBusiness>): Promise<Business | undefined> {
    const result = await db.update(businesses).set(business).where(eq(businesses.id, id)).returning();
    return result[0];
  }

  async deleteBusiness(id: number): Promise<boolean> {
    const result = await db.delete(businesses).where(eq(businesses.id, id)).returning();
    return result.length > 0;
  }

  // Service methods
  async getService(id: number): Promise<Service | undefined> {
    const result = await db.select().from(services).where(eq(services.id, id));
    return result[0];
  }

  async getServicesForBusiness(businessId: number): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.business_id, businessId));
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  // Review methods
  async getReview(id: number): Promise<Review | undefined> {
    const result = await db.select().from(reviews).where(eq(reviews.id, id));
    return result[0];
  }

  async getReviewsForBusiness(businessId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.business_id, businessId));
  }

  async getReviewsForUser(userId: number): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.user_id, userId));
  }

  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    return result[0];
  }

  async deleteReview(id: number): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return result.length > 0;
  }

  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    // Set cancellation deadline based on business settings
    if (!booking.cancellation_deadline) {
      const service = await this.getService(Number(booking.service_id));
      if (service) {
        const businessSetting = await this.getBusinessSettings(service.business_id);
        if (businessSetting) {
          const bookingDate = parseISO(booking.date);
          const cancellationHours = businessSetting.cancellation_hours || 24;
          const cancellationDeadline = addDays(bookingDate, -1 * (cancellationHours / 24));
          booking.cancellation_deadline = cancellationDeadline.toISOString();
        }
      }
    }

    const result = await db.insert(bookings).values({
      ...booking,
      created_at: new Date().toISOString()
    }).returning();
    
    return result[0];
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id));
    return result[0];
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select()
      .from(bookings)
      .where(eq(bookings.user_id, userId));
  }

  async getBookingsByService(serviceId: number): Promise<Booking[]> {
    return await db.select()
      .from(bookings)
      .where(eq(bookings.service_id, serviceId));
  }

  async checkAvailability(serviceId: number, date: string, timeSlot: string): Promise<boolean> {
    // 1. Get the day of week from the date
    const bookingDate = parseISO(date);
    const dayOfWeek = bookingDate.getDay();

    // 2. Check if there's an availability record for this service and day
    const availabilityResults = await db.select()
      .from(availability)
      .where(
        and(
          eq(availability.service_id, serviceId),
          eq(availability.day_of_week, dayOfWeek)
        )
      );

    if (availabilityResults.length === 0) {
      return false; // No availability for this service on this day
    }

    // Parse time slot string (format: "06:00 AM")
    const timeSlotParts = timeSlot.split(' ');
    const timeStr = timeSlotParts[0];
    const ampm = timeSlotParts[1];
    
    const [hourStr, minuteStr] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    // Convert to 24-hour format
    if (ampm === 'PM' && hour < 12) {
      hour += 12;
    } else if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const slotStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

    // 3. Check if the requested time slot falls within any of the availability windows
    let isWithinAvailableWindow = false;
    for (const avail of availabilityResults) {
      if (avail.start_time <= slotStartTime && slotStartTime < avail.end_time) {
        isWithinAvailableWindow = true;
        break;
      }
    }

    if (!isWithinAvailableWindow) {
      return false; // The requested time is outside of available hours
    }

    // 4. Count existing bookings for this time slot and compare with max_bookings
    const existingBookingsCount = await db.select({ count: sql<number>`count(*)` })
      .from(bookings)
      .where(
        and(
          eq(bookings.service_id, serviceId),
          eq(bookings.date, date),
          eq(bookings.time_slot, timeSlot),
          eq(bookings.booking_status, 'confirmed')
        )
      );

    // Find the relevant availability record to get max_bookings
    const relevantAvailability = availabilityResults.find(avail => 
      avail.start_time <= slotStartTime && slotStartTime < avail.end_time
    );

    const maxBookings = relevantAvailability ? relevantAvailability.max_bookings : 1;
    
    return existingBookingsCount[0].count < maxBookings;
  }

  async getAvailableTimeSlots(serviceId: number, date: string): Promise<string[]> {
    // 1. Get the day of week from the date
    const bookingDate = parseISO(date);
    const dayOfWeek = bookingDate.getDay();

    // 2. Get availability records for this service and day
    const availabilityResults = await db.select()
      .from(availability)
      .where(
        and(
          eq(availability.service_id, serviceId),
          eq(availability.day_of_week, dayOfWeek)
        )
      );

    if (availabilityResults.length === 0) {
      return []; // No availability for this service on this day
    }

    // 3. Get standard time slots
    const allTimeSlots = [
      "06:00 AM", "07:30 AM", "09:00 AM", "10:30 AM", "12:00 PM",
      "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"
    ];
    
    // 4. Filter time slots based on availability windows
    const availableTimeSlots = allTimeSlots.filter(timeSlot => {
      // Parse time slot
      const timeSlotParts = timeSlot.split(' ');
      const timeStr = timeSlotParts[0];
      const ampm = timeSlotParts[1];
      
      const [hourStr, minuteStr] = timeStr.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      // Convert to 24-hour format
      if (ampm === 'PM' && hour < 12) {
        hour += 12;
      } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
      }
      
      const slotStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Check if within any availability window
      for (const avail of availabilityResults) {
        if (avail.start_time <= slotStartTime && slotStartTime < avail.end_time) {
          return true;
        }
      }
      
      return false;
    });
    
    // 5. Check existing bookings for each available slot
    const finalAvailableSlots = [];
    
    for (const timeSlot of availableTimeSlots) {
      // Parse time slot to find the relevant availability record
      const timeSlotParts = timeSlot.split(' ');
      const timeStr = timeSlotParts[0];
      const ampm = timeSlotParts[1];
      
      const [hourStr, minuteStr] = timeStr.split(':');
      let hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      
      // Convert to 24-hour format
      if (ampm === 'PM' && hour < 12) {
        hour += 12;
      } else if (ampm === 'AM' && hour === 12) {
        hour = 0;
      }
      
      const slotStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Find the relevant availability record
      const relevantAvailability = availabilityResults.find(avail => 
        avail.start_time <= slotStartTime && slotStartTime < avail.end_time
      );
      
      if (!relevantAvailability) continue;
      
      // Count existing bookings
      const existingBookingsCount = await db.select({ count: sql<number>`count(*)` })
        .from(bookings)
        .where(
          and(
            eq(bookings.service_id, serviceId),
            eq(bookings.date, date),
            eq(bookings.time_slot, timeSlot),
            eq(bookings.booking_status, 'confirmed')
          )
        );
      
      // Check if slot is still available
      if (existingBookingsCount[0].count < relevantAvailability.max_bookings) {
        finalAvailableSlots.push(timeSlot);
      }
    }
    
    return finalAvailableSlots;
  }

  async cancelBooking(id: number, reason?: string): Promise<Booking | undefined> {
    // 1. Get the booking
    const booking = await this.getBooking(id);
    if (!booking) {
      return undefined;
    }

    // 2. Check if it can be canceled (not already canceled or completed)
    if (booking.booking_status !== 'confirmed') {
      return undefined;
    }

    // 3. Get business settings for refund policy
    const service = await this.getService(Number(booking.service_id));
    if (!service) {
      return undefined;
    }

    const businessSetting = await this.getBusinessSettings(service.business_id);
    
    // 4. Determine refund percentage based on cancellation deadline
    let refundPercentage = 0;
    
    if (booking.cancellation_deadline) {
      const now = new Date();
      const deadline = parseISO(booking.cancellation_deadline);
      
      if (now <= deadline) {
        // Full refund period
        refundPercentage = businessSetting?.refund_percentage || 100;
      } else {
        // Late cancellation period
        refundPercentage = businessSetting?.late_cancellation_refund_percentage || 50;
      }
    }

    // 5. Update the booking to canceled status
    const result = await db.update(bookings)
      .set({
        booking_status: 'cancelled',
        cancellation_reason: reason || 'User cancelled'
        // In a real app, you would also store refund information here
      })
      .where(eq(bookings.id, id))
      .returning();
    
    return result[0];
  }

  async createRecurringBookings(initialBooking: InsertBooking, endDate: string): Promise<Booking[]> {
    // 1. Create the initial booking
    const firstBooking = await this.createBooking({
      ...initialBooking,
      is_recurring: 1,
      recurrence_pattern: 'weekly',
      recurrence_end_date: endDate
    });

    // 2. Get service to check business settings
    const service = await this.getService(Number(initialBooking.service_id));
    if (!service) {
      return [firstBooking];
    }

    // 3. Get business settings for max recurring weeks
    const businessSetting = await this.getBusinessSettings(service.business_id);
    const maxRecurringWeeks = businessSetting?.max_recurring_weeks || 8;
    
    // 4. Parse dates
    const startDate = parseISO(initialBooking.date);
    const recurringEndDate = parseISO(endDate);
    
    // 5. Calculate number of weeks between start and end
    const weeksDiff = Math.ceil((recurringEndDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const weeksToCreate = Math.min(weeksDiff, maxRecurringWeeks);
    
    // 6. Create additional weekly bookings
    const allBookings = [firstBooking];
    
    for (let i = 1; i <= weeksToCreate; i++) {
      // Calculate next date (add 7 days)
      const nextDate = addDays(startDate, 7 * i);
      const nextDateString = nextDate.toISOString();
      
      // Check if this slot is available
      const isAvailable = await this.checkAvailability(
        Number(initialBooking.service_id), 
        nextDateString, 
        initialBooking.time_slot
      );
      
      if (!isAvailable) {
        continue; // Skip this date if not available
      }
      
      // Create the recurring booking
      const nextBooking = await this.createBooking({
        ...initialBooking,
        date: nextDateString,
        is_recurring: 1,
        parent_booking_id: firstBooking.id,
        recurrence_pattern: 'weekly',
        recurrence_end_date: endDate
      });
      
      allBookings.push(nextBooking);
    }
    
    return allBookings;
  }

  async getBookingsForReminders(): Promise<Booking[]> {
    const tomorrow = addDays(new Date(), 1);
    const tomorrowStr = format(tomorrow, 'yyyy-MM-dd');
    
    // Get bookings for tomorrow that haven't had reminders sent yet
    return await db.select()
      .from(bookings)
      .where(
        and(
          eq(bookings.reminder_sent, 0),
          eq(bookings.booking_status, 'confirmed'),
          sql`date(${bookings.date}) = date(${tomorrowStr})`
        )
      );
  }

  async markReminderSent(id: number): Promise<boolean> {
    const result = await db.update(bookings)
      .set({ reminder_sent: 1 })
      .where(eq(bookings.id, id))
      .returning();
      
    return result.length > 0;
  }

  // Availability methods
  async createAvailability(availabilityData: InsertAvailability): Promise<Availability> {
    const result = await db.insert(availability).values(availabilityData).returning();
    return result[0];
  }

  async getServiceAvailability(serviceId: number): Promise<Availability[]> {
    return await db.select()
      .from(availability)
      .where(eq(availability.service_id, serviceId));
  }

  async updateAvailability(id: number, availabilityData: Partial<InsertAvailability>): Promise<Availability | undefined> {
    const result = await db.update(availability)
      .set(availabilityData)
      .where(eq(availability.id, id))
      .returning();
    return result[0];
  }

  // Business Settings methods
  async getBusinessSettings(businessId: number): Promise<BusinessSettings | undefined> {
    const result = await db.select()
      .from(businessSettings)
      .where(eq(businessSettings.business_id, businessId));
    return result[0];
  }

  async createBusinessSettings(settings: InsertBusinessSettings): Promise<BusinessSettings> {
    const result = await db.insert(businessSettings).values(settings).returning();
    return result[0];
  }

  async updateBusinessSettings(id: number, settings: Partial<InsertBusinessSettings>): Promise<BusinessSettings | undefined> {
    const result = await db.update(businessSettings)
      .set(settings)
      .where(eq(businessSettings.id, id))
      .returning();
    return result[0];
  }
}
