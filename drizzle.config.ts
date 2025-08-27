import { defineConfig } from "drizzle-kit";
import { join } from "path";

// Default SQLite database path for development
const dbPath = process.env.DATABASE_URL || join(process.cwd(), 'database.sqlite');

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: dbPath,
  },
});
