import express from 'express';
import cors from 'cors';
import { DbStorage } from './storage-enhanced';
import { setupBookingRoutes } from './booking-routes';
import { BookingReminderScheduler } from './scheduler';
import { db } from './db';
import path from 'path';

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// Create storage instance
const storage = new DbStorage();

// Set up routes
const withBookingRoutes = setupBookingRoutes(app, storage);

// Add all other routes (from original routes.ts)
import { registerRoutes } from './routes';
registerRoutes(app);

// Start the booking reminder scheduler
const reminderScheduler = new BookingReminderScheduler(storage);
reminderScheduler.start();

// Clean up when the server shuts down
process.on('SIGINT', () => {
  console.log('Server shutting down...');
  reminderScheduler.stop();
  // SQLite doesn't require explicit close in better-sqlite3
  process.exit(0);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist/public')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/public/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[${new Date().toLocaleTimeString()}] [express] Server running at http://localhost:${PORT}`);
});

export default app;
