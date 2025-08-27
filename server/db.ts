import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../shared/schema';
import { join } from 'path';

// Path for the SQLite database
const dbPath = join(process.cwd(), 'database.sqlite');

// Create database connection
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

// Log successful database connection
console.log(`Database connected at: ${dbPath}`);
