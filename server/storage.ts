import { db } from './db';
import { eq } from 'drizzle-orm';
import { 
  users, businesses, services, reviews,
  type User, type InsertUser,
  type Business, type InsertBusiness,
  type Service, type InsertService,
  type Review, type InsertReview
} from '../shared/schema';

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
    const result = await db.update(businesses)
      .set(business)
      .where(eq(businesses.id, id))
      .returning();
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
    return await db.select()
      .from(services)
      .where(eq(services.business_id, businessId));
  }
  
  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }
  
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
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
    return await db.select()
      .from(reviews)
      .where(eq(reviews.business_id, businessId));
  }
  
  async getReviewsForUser(userId: number): Promise<Review[]> {
    return await db.select()
      .from(reviews)
      .where(eq(reviews.user_id, userId));
  }
  
  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    return result[0];
  }
  
  async deleteReview(id: number): Promise<boolean> {
    const result = await db.delete(reviews).where(eq(reviews.id, id)).returning();
    return result.length > 0;
  }
}

// For backwards compatibility, keep the MemStorage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      email: insertUser.email || null,
      name: insertUser.name || null,
      created_at: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  // Placeholder implementations
  async getBusiness(id: number): Promise<Business | undefined> { return undefined; }
  async getAllBusinesses(): Promise<Business[]> { return []; }
  async getBusinessesByType(type: string): Promise<Business[]> { return []; }
  async createBusiness(business: InsertBusiness): Promise<Business> { throw new Error('Not implemented'); }
  async updateBusiness(id: number, business: Partial<InsertBusiness>): Promise<Business | undefined> { return undefined; }
  async deleteBusiness(id: number): Promise<boolean> { return false; }
  
  async getService(id: number): Promise<Service | undefined> { return undefined; }
  async getServicesForBusiness(businessId: number): Promise<Service[]> { return []; }
  async createService(service: InsertService): Promise<Service> { throw new Error('Not implemented'); }
  async updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined> { return undefined; }
  async deleteService(id: number): Promise<boolean> { return false; }
  
  async getReview(id: number): Promise<Review | undefined> { return undefined; }
  async getReviewsForBusiness(businessId: number): Promise<Review[]> { return []; }
  async getReviewsForUser(userId: number): Promise<Review[]> { return []; }
  async createReview(review: InsertReview): Promise<Review> { throw new Error('Not implemented'); }
  async deleteReview(id: number): Promise<boolean> { return false; }
}

// Export a single instance to be used throughout the application
export const storage = new DbStorage();
