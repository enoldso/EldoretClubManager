import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "./db";
import * as schema from "@shared/schema";
import type {
  User, InsertUser,
  Member, InsertMember,
  Caddie, InsertCaddie,
  Booking, InsertBooking,
  MenuItem, InsertMenuItem,
  Order, InsertOrder,
  OrderItem, InsertOrderItem,
  Event, InsertEvent,
  EventRegistration, InsertEventRegistration,
  LoyaltyTransaction, InsertLoyaltyTransaction,
  Notification, InsertNotification
} from "@shared/schema";

export interface IStorage {
  // Users
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Members
  getMemberByUserId(userId: string): Promise<Member | undefined>;
  getMemberById(id: string): Promise<Member | undefined>;
  getAllMembers(): Promise<Member[]>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;
  updateMemberPoints(memberId: string, points: number): Promise<void>;
  
  // Caddies
  getAllCaddies(): Promise<Caddie[]>;
  getAvailableCaddies(): Promise<Caddie[]>;
  getCaddieById(id: string): Promise<Caddie | undefined>;
  createCaddie(caddie: InsertCaddie): Promise<Caddie>;
  updateCaddie(id: string, caddie: Partial<InsertCaddie>): Promise<Caddie | undefined>;
  
  // Bookings
  getBookingsByMemberId(memberId: string): Promise<Booking[]>;
  getBookingById(id: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBookingsByDate(date: Date): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<void>;
  
  // Menu Items
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItemById(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined>;
  
  // Orders
  getOrdersByMemberId(memberId: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Order Items
  getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | undefined>;
  getEventsByType(type: string): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  
  // Event Registrations
  getEventRegistrationsByEventId(eventId: string): Promise<EventRegistration[]>;
  getEventRegistrationsByMemberId(memberId: string): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  deleteEventRegistration(eventId: string, memberId: string): Promise<void>;
  
  // Loyalty Transactions
  getLoyaltyTransactionsByMemberId(memberId: string): Promise<LoyaltyTransaction[]>;
  createLoyaltyTransaction(transaction: InsertLoyaltyTransaction): Promise<LoyaltyTransaction>;
  
  // Notifications
  getNotificationsByMemberId(memberId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: string): Promise<void>;
}

export class PostgresStorage implements IStorage {
  // Users
  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser;
  }

  // Members
  async getMemberByUserId(userId: string): Promise<Member | undefined> {
    const [member] = await db.select().from(schema.members).where(eq(schema.members.userId, userId));
    return member;
  }

  async getMemberById(id: string): Promise<Member | undefined> {
    const [member] = await db.select().from(schema.members).where(eq(schema.members.id, id));
    return member;
  }

  async getAllMembers(): Promise<Member[]> {
    return db.select().from(schema.members);
  }

  async createMember(member: InsertMember): Promise<Member> {
    const [newMember] = await db.insert(schema.members).values(member).returning();
    return newMember;
  }

  async updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined> {
    const [updated] = await db.update(schema.members).set(member).where(eq(schema.members.id, id)).returning();
    return updated;
  }

  async updateMemberPoints(memberId: string, points: number): Promise<void> {
    await db.update(schema.members)
      .set({
        loyaltyPoints: sql`${schema.members.loyaltyPoints} + ${points}`,
        lifetimePoints: sql`${schema.members.lifetimePoints} + ${Math.abs(points)}`
      })
      .where(eq(schema.members.id, memberId));
  }

  // Caddies
  async getAllCaddies(): Promise<Caddie[]> {
    return db.select().from(schema.caddies);
  }

  async getAvailableCaddies(): Promise<Caddie[]> {
    return db.select().from(schema.caddies).where(eq(schema.caddies.available, true));
  }

  async getCaddieById(id: string): Promise<Caddie | undefined> {
    const [caddie] = await db.select().from(schema.caddies).where(eq(schema.caddies.id, id));
    return caddie;
  }

  async createCaddie(caddie: InsertCaddie): Promise<Caddie> {
    const [newCaddie] = await db.insert(schema.caddies).values(caddie).returning();
    return newCaddie;
  }

  async updateCaddie(id: string, caddie: Partial<InsertCaddie>): Promise<Caddie | undefined> {
    const [updated] = await db.update(schema.caddies).set(caddie).where(eq(schema.caddies.id, id)).returning();
    return updated;
  }

  // Bookings
  async getBookingsByMemberId(memberId: string): Promise<Booking[]> {
    return db.select().from(schema.bookings)
      .where(eq(schema.bookings.memberId, memberId))
      .orderBy(desc(schema.bookings.bookingDate));
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(schema.bookings).where(eq(schema.bookings.id, id));
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return db.select().from(schema.bookings).orderBy(desc(schema.bookings.bookingDate));
  }

  async getBookingsByDate(date: Date): Promise<Booking[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return db.select().from(schema.bookings)
      .where(and(
        sql`${schema.bookings.bookingDate} >= ${startOfDay}`,
        sql`${schema.bookings.bookingDate} <= ${endOfDay}`
      ));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(schema.bookings).values(booking).returning();
    return newBooking;
  }

  async updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined> {
    const [updated] = await db.update(schema.bookings).set(booking).where(eq(schema.bookings.id, id)).returning();
    return updated;
  }

  async deleteBooking(id: string): Promise<void> {
    await db.delete(schema.bookings).where(eq(schema.bookings.id, id));
  }

  // Menu Items
  async getAllMenuItems(): Promise<MenuItem[]> {
    return db.select().from(schema.menuItems);
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return db.select().from(schema.menuItems).where(eq(schema.menuItems.category, category));
  }

  async getMenuItemById(id: string): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(schema.menuItems).where(eq(schema.menuItems.id, id));
    return item;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(schema.menuItems).values(item).returning();
    return newItem;
  }

  async updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem | undefined> {
    const [updated] = await db.update(schema.menuItems).set(item).where(eq(schema.menuItems.id, id)).returning();
    return updated;
  }

  // Orders
  async getOrdersByMemberId(memberId: string): Promise<Order[]> {
    return db.select().from(schema.orders)
      .where(eq(schema.orders.memberId, memberId))
      .orderBy(desc(schema.orders.createdAt));
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id));
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return db.select().from(schema.orders).orderBy(desc(schema.orders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(schema.orders).values(order).returning();
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [updated] = await db.update(schema.orders).set({ status: status as any }).where(eq(schema.orders.id, id)).returning();
    return updated;
  }

  // Order Items
  async getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
    return db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, orderId));
  }

  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const [newItem] = await db.insert(schema.orderItems).values(item).returning();
    return newItem;
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(schema.events).orderBy(schema.events.eventDate);
  }

  async getEventById(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(schema.events).where(eq(schema.events.id, id));
    return event;
  }

  async getEventsByType(type: string): Promise<Event[]> {
    return db.select().from(schema.events)
      .where(eq(schema.events.eventType, type as any))
      .orderBy(schema.events.eventDate);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(schema.events).values(event).returning();
    return newEvent;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const [updated] = await db.update(schema.events).set(event).where(eq(schema.events.id, id)).returning();
    return updated;
  }

  // Event Registrations
  async getEventRegistrationsByEventId(eventId: string): Promise<EventRegistration[]> {
    return db.select().from(schema.eventRegistrations).where(eq(schema.eventRegistrations.eventId, eventId));
  }

  async getEventRegistrationsByMemberId(memberId: string): Promise<EventRegistration[]> {
    return db.select().from(schema.eventRegistrations).where(eq(schema.eventRegistrations.memberId, memberId));
  }

  async createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration> {
    const [newReg] = await db.insert(schema.eventRegistrations).values(registration).returning();
    return newReg;
  }

  async deleteEventRegistration(eventId: string, memberId: string): Promise<void> {
    await db.delete(schema.eventRegistrations).where(
      and(
        eq(schema.eventRegistrations.eventId, eventId),
        eq(schema.eventRegistrations.memberId, memberId)
      )
    );
  }

  // Loyalty Transactions
  async getLoyaltyTransactionsByMemberId(memberId: string): Promise<LoyaltyTransaction[]> {
    return db.select().from(schema.loyaltyTransactions)
      .where(eq(schema.loyaltyTransactions.memberId, memberId))
      .orderBy(desc(schema.loyaltyTransactions.createdAt));
  }

  async createLoyaltyTransaction(transaction: InsertLoyaltyTransaction): Promise<LoyaltyTransaction> {
    const [newTransaction] = await db.insert(schema.loyaltyTransactions).values(transaction).returning();
    return newTransaction;
  }

  // Notifications
  async getNotificationsByMemberId(memberId: string): Promise<Notification[]> {
    return db.select().from(schema.notifications)
      .where(eq(schema.notifications.memberId, memberId))
      .orderBy(desc(schema.notifications.createdAt));
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(schema.notifications).values(notification).returning();
    return newNotification;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db.update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.id, id));
  }
}

export const storage = new PostgresStorage();
