import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticate, register, login, type AuthRequest } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post('/api/auth/register', register);
  app.post('/api/auth/login', login);
  
  // User routes
  app.get('/api/users/:id', async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: 'User not found' });
      
      // Remove password before sending response
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Business routes
  // Get all businesses or filter by type
  app.get('/api/businesses', async (req, res) => {
    try {
      const { type } = req.query;
      let businesses;
      
      if (type) {
        businesses = await storage.getBusinessesByType(type as string);
      } else {
        businesses = await storage.getAllBusinesses();
      }
      
      return res.json(businesses);
    } catch (error) {
      console.error('Error getting businesses:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Get single business by ID
  app.get('/api/businesses/:id', async (req, res) => {
    try {
      const business = await storage.getBusiness(parseInt(req.params.id));
      if (!business) return res.status(404).json({ error: 'Business not found' });
      return res.json(business);
    } catch (error) {
      console.error('Error getting business:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create business (requires authentication)
  app.post('/api/businesses', authenticate, async (req: AuthRequest, res) => {
    try {
      const business = await storage.createBusiness({
        ...req.body,
        owner_id: req.userId
      });
      return res.status(201).json(business);
    } catch (error) {
      console.error('Error creating business:', error);
      return res.status(400).json({ error: 'Invalid business data' });
    }
  });
  
  // Update business (requires authentication and ownership)
  app.put('/api/businesses/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const businessId = parseInt(req.params.id);
      
      // Check if business exists and user is the owner
      const existingBusiness = await storage.getBusiness(businessId);
      if (!existingBusiness) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      if (existingBusiness.owner_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to update this business' });
      }
      
      // Update business
      const business = await storage.updateBusiness(businessId, req.body);
      return res.json(business);
    } catch (error) {
      console.error('Error updating business:', error);
      return res.status(400).json({ error: 'Invalid business data' });
    }
  });
  
  // Delete business (requires authentication and ownership)
  app.delete('/api/businesses/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const businessId = parseInt(req.params.id);
      
      // Check if business exists and user is the owner
      const existingBusiness = await storage.getBusiness(businessId);
      if (!existingBusiness) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      if (existingBusiness.owner_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this business' });
      }
      
      // Delete business
      const success = await storage.deleteBusiness(businessId);
      if (success) {
        return res.status(204).send();
      } else {
        return res.status(500).json({ error: 'Failed to delete business' });
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Service routes
  // Get services for a business
  app.get('/api/businesses/:id/services', async (req, res) => {
    try {
      const services = await storage.getServicesForBusiness(parseInt(req.params.id));
      return res.json(services);
    } catch (error) {
      console.error('Error getting services:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create service (requires authentication)
  app.post('/api/services', authenticate, async (req: AuthRequest, res) => {
    try {
      const businessId = req.body.business_id;
      
      // Check if business exists and user is the owner
      const existingBusiness = await storage.getBusiness(businessId);
      if (!existingBusiness) {
        return res.status(404).json({ error: 'Business not found' });
      }
      
      if (existingBusiness.owner_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to add services to this business' });
      }
      
      // Create service
      const service = await storage.createService(req.body);
      return res.status(201).json(service);
    } catch (error) {
      console.error('Error creating service:', error);
      return res.status(400).json({ error: 'Invalid service data' });
    }
  });
  
  // Update service (requires authentication)
  app.put('/api/services/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      // Get service
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      // Check if user is the business owner
      const business = await storage.getBusiness(service.business_id);
      if (!business || business.owner_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to update this service' });
      }
      
      // Update service
      const updatedService = await storage.updateService(serviceId, req.body);
      return res.json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      return res.status(400).json({ error: 'Invalid service data' });
    }
  });
  
  // Delete service (requires authentication)
  app.delete('/api/services/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const serviceId = parseInt(req.params.id);
      
      // Get service
      const service = await storage.getService(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      
      // Check if user is the business owner
      const business = await storage.getBusiness(service.business_id);
      if (!business || business.owner_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this service' });
      }
      
      // Delete service
      const success = await storage.deleteService(serviceId);
      if (success) {
        return res.status(204).send();
      } else {
        return res.status(500).json({ error: 'Failed to delete service' });
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Review routes
  // Get reviews for a business
  app.get('/api/businesses/:id/reviews', async (req, res) => {
    try {
      const reviews = await storage.getReviewsForBusiness(parseInt(req.params.id));
      return res.json(reviews);
    } catch (error) {
      console.error('Error getting reviews:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create review (requires authentication)
  app.post('/api/reviews', authenticate, async (req: AuthRequest, res) => {
    try {
      const review = await storage.createReview({
        ...req.body,
        user_id: req.userId,
        created_at: new Date().toISOString()
      });
      return res.status(201).json(review);
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(400).json({ error: 'Invalid review data' });
    }
  });
  
  // Delete review (requires authentication and ownership)
  app.delete('/api/reviews/:id', authenticate, async (req: AuthRequest, res) => {
    try {
      const reviewId = parseInt(req.params.id);
      
      // Get review
      const review = await storage.getReview(reviewId);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      // Check if user is the review author
      if (review.user_id !== req.userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this review' });
      }
      
      // Delete review
      const success = await storage.deleteReview(reviewId);
      if (success) {
        return res.status(204).send();
      } else {
        return res.status(500).json({ error: 'Failed to delete review' });
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
