import { db, dbHelpers, eq, and, or, desc } from './db';
import * as schema from '@shared/schema';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

// Import all schema tables for type safety
const {
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
  
  // Tee Time Scoring
  getTeeTimes(): Promise<Array<{
    id: string;
    date: Date;
    time: string;
    course: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    players: Array<{
      id: string;
      name: string;
      handicap: number;
      scores: Array<{
        holeNumber: number;
        score: number;
        putts?: number;
        fairwayHit?: boolean;
        greensInRegulation?: boolean;
        sandSave?: boolean;
      }>;
      total: number;
      verified: boolean;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }>>;
  
  getTeeTimeScores(teeTimeId: string): Promise<Record<string, {
    name: string;
    handicap: number;
    scores: Array<{
      holeNumber: number;
      score: number;
      putts?: number;
      fairwayHit?: boolean;
      greensInRegulation?: boolean;
      sandSave?: boolean;
    }>;
    total: number;
    verified: boolean;
  }>>;
  
  saveTeeTimeScores(
    teeTimeId: string, 
    userId: string, 
    scores: Record<string, any>
  ): Promise<void>;
  
  verifyTeeTimeScores(
    teeTimeId: string, 
    playerId: string, 
    verifiedBy: string, 
    verified: boolean
  ): Promise<void>;
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
        loyaltyPoints: sql`${schema.members.loyaltyPoints} + ${points}` as any,
        lifetimePoints: sql`${schema.members.lifetimePoints} + ${Math.abs(points)}` as any,
        updatedAt: new Date()
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
      .set({ isRead: true })
      .where(eq(schema.notifications.id, id));
  }

  // Tee Time Scoring Implementation
  async getTeeTimes(): Promise<Array<{
    id: string;
    date: Date;
    time: string;
    course: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
    players: Array<{
      id: string;
      name: string;
      handicap: number;
      scores: Array<{
        holeNumber: number;
        score: number;
        putts?: number;
        fairwayHit?: boolean;
        greensInRegulation?: boolean;
        sandSave?: boolean;
      }>;
      total: number;
      verified: boolean;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }>> {
    // In a real implementation, we would join the teeTimes, teeTimePlayers, and scores tables
    // For now, we'll use the mock data as a fallback
    try {
      // This is a placeholder for the actual database query
      // const teeTimes = await db.query.teeTimes.findMany({
      //   with: {
      //     players: {
      //       with: {
      //         scores: true
      //       }
      //     }
      //   },
      //   orderBy: (teeTimes, { asc }) => [asc(teeTimes.date), asc(teeTimes.time)]
      // });
      
      // Return mock data for now
      return [
        {
          id: '1',
          date: new Date('2023-06-15T09:00:00Z'),
          time: '09:00 AM',
          course: 'Championship Course',
          status: 'scheduled',
          players: [
            {
              id: 'user1',
              name: 'John Doe',
              handicap: 12,
              scores: Array(18).fill(0).map((_, i) => ({
                holeNumber: i + 1,
                score: Math.floor(Math.random() * 5) + 3, // Random score between 3-7
                putts: Math.floor(Math.random() * 3) + 1,
                fairwayHit: Math.random() > 0.5,
                greensInRegulation: Math.random() > 0.6,
                sandSave: Math.random() > 0.8,
              })),
              total: 85,
              verified: false,
            },
            {
              id: 'user2',
              name: 'Jane Smith',
              handicap: 8,
              scores: Array(18).fill(0).map((_, i) => ({
                holeNumber: i + 1,
                score: Math.floor(Math.random() * 4) + 3, // Random score between 3-6
                putts: Math.floor(Math.random() * 2) + 1,
                fairwayHit: Math.random() > 0.6,
                greensInRegulation: Math.random() > 0.7,
                sandSave: Math.random() > 0.7,
              })),
              total: 78,
              verified: true,
            },
          ],
          createdAt: new Date('2023-06-10T14:30:00Z'),
          updatedAt: new Date('2023-06-10T14:30:00Z'),
        },
      ];
    } catch (error) {
      console.error('Error fetching tee times:', error);
      throw new Error('Failed to fetch tee times');
    }
  }

  async getTeeTimeScores(teeTimeId: string): Promise<Record<string, {
    name: string;
    handicap: number;
    scores: Array<{
      holeNumber: number;
      score: number;
      putts?: number;
      fairwayHit?: boolean;
      greensInRegulation?: boolean;
      sandSave?: boolean;
    }>;
    total: number;
    verified: boolean;
  }>> {
    // In a real implementation, this would query the database
    // For now, return mock data
    const holes = Array.from({ length: 18 }, (_, i) => ({
      holeNumber: i + 1,
      score: Math.floor(Math.random() * 3) + 4, // Random score between 4-6
      putts: Math.floor(Math.random() * 3) + 1, // 1-3 putts
      fairwayHit: Math.random() > 0.3, // 70% chance of hitting fairway
      greensInRegulation: Math.random() > 0.5, // 50% GIR
      sandSave: Math.random() > 0.7, // 30% sand save
    }));

    return {
      '1': {
        name: 'John Doe',
        handicap: 12.4,
        scores: holes,
        total: holes.reduce((sum, hole) => sum + (hole.score || 0), 0),
        verified: false
      },
      '2': {
        name: 'Jane Smith',
        handicap: 8.7,
        scores: holes.map(hole => ({
          ...hole,
          score: Math.max(3, hole.score! - 1) // Jane is a bit better
        })),
        total: holes.reduce((sum, hole) => sum + (hole.score || 0) - 1, 0),
        verified: false
      },
      '3': {
        name: 'Bob Johnson',
        handicap: 18.2,
        scores: holes.map(hole => ({
          ...hole,
          score: hole.score! + 1 // Bob is a bit worse
        })),
        total: holes.reduce((sum, hole) => sum + (hole.score || 0) + 1, 0),
        verified: false
      }
    };
  }

  async saveTeeTimeScores(
    teeTimeId: string, 
    userId: string, 
    scores: Record<string, any>
  ): Promise<void> {
    try {
      // In a real implementation, we would:
      // 1. Start a transaction
      // 2. Verify the user has permission to save these scores
      // 3. Validate the scores
      // 4. Save to the database
      // 5. Update any aggregates (e.g., total score, stats)
      // 6. Commit the transaction
      
      // Example implementation (commented out for now):
      // await db.transaction(async (tx) => {
      //   // 1. Verify tee time exists and is in progress
      //   const teeTime = await tx.query.teeTimes.findFirst({
      //     where: and(
      //       eq(schema.teeTimes.id, teeTimeId),
      //       eq(schema.teeTimes.status, 'in_progress')
      //     )
      //   });
      //   
      //   if (!teeTime) {
      //     throw new Error('Tee time not found or not in progress');
      //   }
      //   
      //   // 2. Verify user is a player in this tee time
      //   const player = await tx.query.teeTimePlayers.findFirst({
      //     where: and(
      //       eq(schema.teeTimePlayers.teeTimeId, teeTimeId),
      //       eq(schema.teeTimePlayers.userId, userId)
      //     )
      //   });
      //   
      //   if (!player) {
      //     throw new Error('You are not a player in this tee time');
      //   }
      //   
      //   // 3. Save scores
      //   for (const [playerId, playerScores] of Object.entries(scores)) {
      //     // Validate and save each player's scores
      //     // ...
      //   }
      // });
      
      // For now, just log and simulate a delay
      console.log(`Saving scores for tee time ${teeTimeId} by user ${userId}`, scores);
      return new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error saving scores for tee time ${teeTimeId}:`, error);
      throw new Error('Failed to save tee time scores');
    }
  }

  async verifyTeeTimeScores(
    teeTimeId: string, 
    playerId: string, 
    verifiedBy: string, 
    verified: boolean
  ): Promise<void> {
    // In a real implementation, this would update the verification status in the database
    console.log(`Verifying scores for player ${playerId} in tee time ${teeTimeId} by ${verifiedBy}: ${verified}`);
    // Simulate database operation
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

export const storage = new PostgresStorage();
