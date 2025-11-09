import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Pool } = pg;
import * as schema from '@shared/schema';
import { eq, and, or, desc, asc, sql, count, sum, avg, max, min, SQL } from 'drizzle-orm';
import { PgTable, PgColumn } from 'drizzle-orm/pg-core';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/eldoret_club',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create the Drizzle instance with the schema
export const db = drizzle(pool, { schema });

// Type for tables with an 'id' column
type TableWithId = PgTable & { id: PgColumn };

// Helper functions for common operations
export const dbHelpers = {
  // Find first matching record
  async findFirst<T>(
    table: PgTable,
    where: (table: PgTable) => SQL | undefined
  ): Promise<T | undefined> {
    const whereClause = where(table);
    const query = db.select().from(table);
    const results = whereClause 
      ? await query.where(whereClause).limit(1)
      : await query.limit(1);
    return results[0] as T | undefined;
  },

  // Find many records
  async findMany<T>(
    table: PgTable,
    where?: (table: PgTable) => SQL | undefined
  ): Promise<T[]> {
    const query = db.select().from(table);
    const whereClause = where ? where(table) : undefined;
    const results = whereClause 
      ? await query.where(whereClause)
      : await query;
    return results as T[];
  },

  // Create a new record
  async create<T extends { id: string }>(
    table: PgTable,
    data: Omit<T, 'id'> & { id?: string }
  ): Promise<T> {
    const [result] = await db.insert(table).values(data).returning();
    return result as T;
  },

  // Update a record
  async update<T>(
    table: PgTable & { id: PgColumn },
    id: string,
    data: Record<string, any>
  ): Promise<T | undefined> {
    const [result] = await db
      .update(table)
      .set(data)
      .where(eq(table.id as PgColumn, id))
      .returning();
    return (result as unknown) as T | undefined;
  },

  // Delete a record
  async delete(table: PgTable & { id: PgColumn }, id: string): Promise<void> {
    await db.delete(table).where(eq(table.id as PgColumn, id));
  },

  // Execute a raw SQL query
  async execute<T = any>(sql: string, params: any[] = []): Promise<{ rows: T[] }> {
    const client = await pool.connect();
    try {
      const result = await client.query(sql, params);
      return { rows: result.rows };
    } finally {
      client.release();
    }
  }
};

// Export all schema tables for easy access
export const {
  users,
  members,
  caddies,
  bookings,
  menuItems,
  orders,
  orderItems,
  events,
  eventRegistrations,
  loyaltyTransactions,
  notifications,
} = schema;

// Re-export Drizzle's query builders and operators
export { eq, and, or, desc, asc, sql, count, sum, avg, max, min };

// Export the pool for direct access when needed
export { pool };
