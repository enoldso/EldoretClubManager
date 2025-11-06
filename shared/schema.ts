import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userRoleEnum = pgEnum("user_role", ["member", "admin"]);
export const membershipTypeEnum = pgEnum("membership_type", ["Individual", "Family", "Corporate"]);
export const membershipStatusEnum = pgEnum("membership_status", ["Active", "Expiring Soon", "Expired"]);
export const bookingStatusEnum = pgEnum("booking_status", ["Confirmed", "Pending", "Cancelled"]);
export const orderStatusEnum = pgEnum("order_status", ["Pending", "Preparing", "Ready", "Completed", "Cancelled"]);
export const eventTypeEnum = pgEnum("event_type", ["Tournament", "Social", "Training"]);
export const loyaltyTierEnum = pgEnum("loyalty_tier", ["Bronze", "Silver", "Gold", "Platinum"]);
export const notificationTypeEnum = pgEnum("notification_type", ["booking", "payment", "event", "general", "achievement"]);

// Users table - handles authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Members table - member profile information
export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  membershipType: membershipTypeEnum("membership_type").notNull().default("Individual"),
  membershipStatus: membershipStatusEnum("membership_status").notNull().default("Active"),
  memberSince: timestamp("member_since").defaultNow().notNull(),
  expiryDate: timestamp("expiry_date").notNull(),
  handicap: decimal("handicap", { precision: 4, scale: 1 }),
  loyaltyPoints: integer("loyalty_points").notNull().default(0),
  lifetimePoints: integer("lifetime_points").notNull().default(0),
  loyaltyTier: loyaltyTierEnum("loyalty_tier").notNull().default("Bronze"),
});

// Caddies table
export const caddies = pgTable("caddies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("4.5"),
  experienceYears: integer("experience_years").notNull(),
  handicapRange: text("handicap_range").notNull(),
  available: boolean("available").notNull().default(true),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  caddieId: varchar("caddie_id").references(() => caddies.id),
  bookingDate: timestamp("booking_date").notNull(),
  timeSlot: text("time_slot").notNull(),
  partySize: integer("party_size").notNull().default(1),
  status: bookingStatusEnum("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Menu items table
export const menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  available: boolean("available").notNull().default(true),
  imageUrl: text("image_url"),
});

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("Pending"),
  orderType: text("order_type").notNull(), // "dine-in", "takeaway"
  tableNumber: text("table_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  menuItemId: varchar("menu_item_id").references(() => menuItems.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

// Events table
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location").notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  capacity: integer("capacity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url"),
});

// Event registrations table
export const eventRegistrations = pgTable("event_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
});

// Loyalty transactions table
export const loyaltyTransactions = pgTable("loyalty_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  points: integer("points").notNull(),
  activity: text("activity").notNull(),
  type: text("type").notNull(), // "earned" or "redeemed"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertMemberSchema = createInsertSchema(members).omit({ id: true, memberSince: true });
export const insertCaddieSchema = createInsertSchema(caddies).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertEventRegistrationSchema = createInsertSchema(eventRegistrations).omit({ id: true, registeredAt: true });
export const insertLoyaltyTransactionSchema = createInsertSchema(loyaltyTransactions).omit({ id: true, createdAt: true });
export const insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Member = typeof members.$inferSelect;
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Caddie = typeof caddies.$inferSelect;
export type InsertCaddie = z.infer<typeof insertCaddieSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type InsertEventRegistration = z.infer<typeof insertEventRegistrationSchema>;
export type LoyaltyTransaction = typeof loyaltyTransactions.$inferSelect;
export type InsertLoyaltyTransaction = z.infer<typeof insertLoyaltyTransactionSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
