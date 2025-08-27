-- Add availability table to track available time slots
CREATE TABLE availability (
  id INTEGER PRIMARY KEY,
  service_id INTEGER NOT NULL REFERENCES services(id),
  day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, etc.
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  max_bookings INTEGER NOT NULL DEFAULT 1,
  UNIQUE(service_id, day_of_week, start_time)
);

-- Add new fields to bookings table
ALTER TABLE bookings ADD COLUMN is_recurring BOOLEAN DEFAULT 0;
ALTER TABLE bookings ADD COLUMN recurrence_pattern TEXT DEFAULT NULL;
ALTER TABLE bookings ADD COLUMN recurrence_end_date TEXT DEFAULT NULL;
ALTER TABLE bookings ADD COLUMN cancellation_deadline TEXT DEFAULT NULL;
ALTER TABLE bookings ADD COLUMN cancellation_reason TEXT DEFAULT NULL;
ALTER TABLE bookings ADD COLUMN reminder_sent BOOLEAN DEFAULT 0;
ALTER TABLE bookings ADD COLUMN parent_booking_id INTEGER DEFAULT NULL REFERENCES bookings(id);

-- Create index for better performance on recurring booking queries
CREATE INDEX idx_bookings_recurring ON bookings(is_recurring);
CREATE INDEX idx_bookings_parent ON bookings(parent_booking_id);

-- Create business settings table for cancellation policies
CREATE TABLE business_settings (
  id INTEGER PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id),
  cancellation_hours INTEGER NOT NULL DEFAULT 24,
  refund_percentage INTEGER NOT NULL DEFAULT 100,
  late_cancellation_refund_percentage INTEGER NOT NULL DEFAULT 50,
  allow_recurring_bookings BOOLEAN NOT NULL DEFAULT 1,
  max_recurring_weeks INTEGER NOT NULL DEFAULT 8
);
