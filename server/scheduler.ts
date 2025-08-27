import { IStorage } from './storage-enhanced';
import { sendBookingReminders } from './booking-routes';

// Simple scheduler class
export class BookingReminderScheduler {
  private storage: IStorage;
  private interval: NodeJS.Timer | null = null;
  private intervalMs: number = 24 * 60 * 60 * 1000; // Default: once a day

  constructor(storage: IStorage, intervalMs?: number) {
    this.storage = storage;
    
    if (intervalMs) {
      this.intervalMs = intervalMs;
    }
  }

  // Start the scheduler
  start(): void {
    if (this.interval) {
      return; // Already started
    }

    console.log(`Starting booking reminder scheduler with interval of ${this.intervalMs}ms`);
    
    // Run once immediately on startup
    this.runTask();
    
    // Then schedule future runs
    this.interval = setInterval(() => this.runTask(), this.intervalMs);
  }

  // Stop the scheduler
  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('Booking reminder scheduler stopped');
    }
  }

  // The task that sends reminders
  private async runTask(): Promise<void> {
    try {
      console.log('Running booking reminder task...');
      const count = await sendBookingReminders(this.storage);
      console.log(`Sent ${count} booking reminders`);
    } catch (error) {
      console.error('Error in booking reminder task:', error);
    }
  }
}
