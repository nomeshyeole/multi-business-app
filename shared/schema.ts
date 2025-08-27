import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  name: text("name"),
  created_at: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Businesses table
export const businesses = sqliteTable("businesses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(), // e.g., 'electronics', 'clothing', 'food'
  description: text("description"),
  image_url: text("image_url"),
  contact_phone: text("contact_phone"),
  contact_email: text("contact_email"),
  address: text("address"),
  operating_hours: text("operating_hours"),
  rating: real("rating").default(0),
  review_count: integer("review_count").default(0),
  owner_id: integer("owner_id").references(() => users.id),
  created_at: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertBusinessSchema = createInsertSchema(businesses);

export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;

// Services table
export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  business_id: integer("business_id").references(() => businesses.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"),
  duration: text("duration"),
  capacity: integer("capacity"),
  image_url: text("image_url"),
  created_at: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertServiceSchema = createInsertSchema(services);

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Reviews table
export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  business_id: integer("business_id").references(() => businesses.id).notNull(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertReviewSchema = createInsertSchema(reviews);

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Bookings table
export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id").references(() => users.id).notNull(),
  service_id: integer("service_id").references(() => services.id).notNull(),
  date: text("date").notNull(), // Store as ISO string
  time_slot: text("time_slot").notNull(),
  payment_method: text("payment_method").notNull(), // 'cash' or 'online'
  payment_status: text("payment_status").notNull(), // 'pending', 'paid', 'failed'
  booking_status: text("booking_status").notNull(), // 'confirmed', 'cancelled', 'completed'
  is_recurring: integer("is_recurring").default(0),
  recurrence_pattern: text("recurrence_pattern"), // 'weekly'
  recurrence_end_date: text("recurrence_end_date"), // ISO string
  cancellation_deadline: text("cancellation_deadline"), // ISO string
  cancellation_reason: text("cancellation_reason"),
  reminder_sent: integer("reminder_sent").default(0),
  parent_booking_id: integer("parent_booking_id").references(() => bookings.id),
  created_at: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

export const insertBookingSchema = createInsertSchema(bookings);

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Availability table
export const availability = sqliteTable("availability", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  service_id: integer("service_id").references(() => services.id).notNull(),
  day_of_week: integer("day_of_week").notNull(), // 0 = Sunday, 1 = Monday, etc.
  start_time: text("start_time").notNull(), // HH:MM format
  end_time: text("end_time").notNull(), // HH:MM format
  max_bookings: integer("max_bookings").default(1),
});

export const insertAvailabilitySchema = createInsertSchema(availability);

export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type Availability = typeof availability.$inferSelect;

// Business settings table for cancellation policies
export const businessSettings = sqliteTable("business_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  business_id: integer("business_id").references(() => businesses.id).notNull(),
  cancellation_hours: integer("cancellation_hours").default(24),
  refund_percentage: integer("refund_percentage").default(100),
  late_cancellation_refund_percentage: integer("late_cancellation_refund_percentage").default(50),
  allow_recurring_bookings: integer("allow_recurring_bookings").default(1),
  max_recurring_weeks: integer("max_recurring_weeks").default(8),
});

export const insertBusinessSettingsSchema = createInsertSchema(businessSettings);

export type InsertBusinessSettings = z.infer<typeof insertBusinessSettingsSchema>;
export type BusinessSettings = typeof businessSettings.$inferSelect;
