import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './db';
import { join } from 'path';
import { promises as fs } from 'fs';

// Path to migrations directory
const migrationsDir = join(process.cwd(), 'migrations');

async function createMigrationsFolder() {
  try {
    await fs.mkdir(migrationsDir, { recursive: true });
    console.log(`Created migrations folder at: ${migrationsDir}`);
  } catch (err) {
    // Directory might already exist, which is fine
    console.log(`Migrations folder already exists at: ${migrationsDir}`);
  }
}

async function runMigrations() {
  console.log('Starting database migrations...');
  
  // Make sure migrations folder exists
  await createMigrationsFolder();
  
  try {
    await migrate(db, { migrationsFolder: migrationsDir });
    console.log('Database migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations
runMigrations();
