// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { eq, and, desc, sql as sql2 } from "drizzle-orm";

// server/db.ts
var mockDb = {
  query: {
    // Add your mock queries here
    users: {
      findMany: async () => [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
      ]
      // Add more mock methods as needed
    }
    // Add other tables/collections as needed
  }
  // Add other database methods you might need
};
var db = mockDb;

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var userRoleEnum = pgEnum("user_role", ["member", "admin"]);
var membershipTypeEnum = pgEnum("membership_type", ["Individual", "Family", "Corporate"]);
var membershipStatusEnum = pgEnum("membership_status", ["Active", "Expiring Soon", "Expired"]);
var bookingStatusEnum = pgEnum("booking_status", ["Confirmed", "Pending", "Cancelled"]);
var orderStatusEnum = pgEnum("order_status", ["Pending", "Preparing", "Ready", "Completed", "Cancelled"]);
var eventTypeEnum = pgEnum("event_type", ["Tournament", "Social", "Training"]);
var loyaltyTierEnum = pgEnum("loyalty_tier", ["Bronze", "Silver", "Gold", "Platinum"]);
var notificationTypeEnum = pgEnum("notification_type", ["booking", "payment", "event", "general", "achievement"]);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var members = pgTable("members", {
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
  loyaltyTier: loyaltyTierEnum("loyalty_tier").notNull().default("Bronze")
});
var caddies = pgTable("caddies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("4.5"),
  experienceYears: integer("experience_years").notNull(),
  handicapRange: text("handicap_range").notNull(),
  available: boolean("available").notNull().default(true)
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  caddieId: varchar("caddie_id").references(() => caddies.id),
  bookingDate: timestamp("booking_date").notNull(),
  timeSlot: text("time_slot").notNull(),
  partySize: integer("party_size").notNull().default(1),
  status: bookingStatusEnum("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var menuItems = pgTable("menu_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  available: boolean("available").notNull().default(true),
  imageUrl: text("image_url")
});
var orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default("Pending"),
  orderType: text("order_type").notNull(),
  // "dine-in", "takeaway"
  tableNumber: text("table_number"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  menuItemId: varchar("menu_item_id").references(() => menuItems.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull()
});
var events = pgTable("events", {
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
  imageUrl: text("image_url")
});
var eventRegistrations = pgTable("event_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventId: varchar("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  registeredAt: timestamp("registered_at").defaultNow().notNull()
});
var loyaltyTransactions = pgTable("loyalty_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  points: integer("points").notNull(),
  activity: text("activity").notNull(),
  type: text("type").notNull(),
  // "earned" or "redeemed"
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  memberId: varchar("member_id").references(() => members.id, { onDelete: "cascade" }).notNull(),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertMemberSchema = createInsertSchema(members).omit({ id: true, memberSince: true });
var insertCaddieSchema = createInsertSchema(caddies).omit({ id: true });
var insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });
var insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
var insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
var insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
var insertEventSchema = createInsertSchema(events).omit({ id: true });
var insertEventRegistrationSchema = createInsertSchema(eventRegistrations).omit({ id: true, registeredAt: true });
var insertLoyaltyTransactionSchema = createInsertSchema(loyaltyTransactions).omit({ id: true, createdAt: true });
var insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });

// server/storage.ts
var PostgresStorage = class {
  // Users
  async getUserById(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  async createUser(user) {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  // Members
  async getMemberByUserId(userId) {
    const [member] = await db.select().from(members).where(eq(members.userId, userId));
    return member;
  }
  async getMemberById(id) {
    const [member] = await db.select().from(members).where(eq(members.id, id));
    return member;
  }
  async getAllMembers() {
    return db.select().from(members);
  }
  async createMember(member) {
    const [newMember] = await db.insert(members).values(member).returning();
    return newMember;
  }
  async updateMember(id, member) {
    const [updated] = await db.update(members).set(member).where(eq(members.id, id)).returning();
    return updated;
  }
  async updateMemberPoints(memberId, points) {
    await db.update(members).set({
      loyaltyPoints: sql2`${members.loyaltyPoints} + ${points}`,
      lifetimePoints: sql2`${members.lifetimePoints} + ${Math.abs(points)}`
    }).where(eq(members.id, memberId));
  }
  // Caddies
  async getAllCaddies() {
    return db.select().from(caddies);
  }
  async getAvailableCaddies() {
    return db.select().from(caddies).where(eq(caddies.available, true));
  }
  async getCaddieById(id) {
    const [caddie] = await db.select().from(caddies).where(eq(caddies.id, id));
    return caddie;
  }
  async createCaddie(caddie) {
    const [newCaddie] = await db.insert(caddies).values(caddie).returning();
    return newCaddie;
  }
  async updateCaddie(id, caddie) {
    const [updated] = await db.update(caddies).set(caddie).where(eq(caddies.id, id)).returning();
    return updated;
  }
  // Bookings
  async getBookingsByMemberId(memberId) {
    return db.select().from(bookings).where(eq(bookings.memberId, memberId)).orderBy(desc(bookings.bookingDate));
  }
  async getBookingById(id) {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }
  async getAllBookings() {
    return db.select().from(bookings).orderBy(desc(bookings.bookingDate));
  }
  async getBookingsByDate(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return db.select().from(bookings).where(and(
      sql2`${bookings.bookingDate} >= ${startOfDay}`,
      sql2`${bookings.bookingDate} <= ${endOfDay}`
    ));
  }
  async createBooking(booking) {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
  async updateBooking(id, booking) {
    const [updated] = await db.update(bookings).set(booking).where(eq(bookings.id, id)).returning();
    return updated;
  }
  async deleteBooking(id) {
    await db.delete(bookings).where(eq(bookings.id, id));
  }
  // Menu Items
  async getAllMenuItems() {
    return db.select().from(menuItems);
  }
  async getMenuItemsByCategory(category) {
    return db.select().from(menuItems).where(eq(menuItems.category, category));
  }
  async getMenuItemById(id) {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }
  async createMenuItem(item) {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }
  async updateMenuItem(id, item) {
    const [updated] = await db.update(menuItems).set(item).where(eq(menuItems.id, id)).returning();
    return updated;
  }
  // Orders
  async getOrdersByMemberId(memberId) {
    return db.select().from(orders).where(eq(orders.memberId, memberId)).orderBy(desc(orders.createdAt));
  }
  async getOrderById(id) {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }
  async getAllOrders() {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }
  async createOrder(order) {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
  async updateOrderStatus(id, status) {
    const [updated] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return updated;
  }
  // Order Items
  async getOrderItemsByOrderId(orderId) {
    return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  async createOrderItem(item) {
    const [newItem] = await db.insert(orderItems).values(item).returning();
    return newItem;
  }
  // Events
  async getAllEvents() {
    return db.select().from(events).orderBy(events.eventDate);
  }
  async getEventById(id) {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }
  async getEventsByType(type) {
    return db.select().from(events).where(eq(events.eventType, type)).orderBy(events.eventDate);
  }
  async createEvent(event) {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  async updateEvent(id, event) {
    const [updated] = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return updated;
  }
  // Event Registrations
  async getEventRegistrationsByEventId(eventId) {
    return db.select().from(eventRegistrations).where(eq(eventRegistrations.eventId, eventId));
  }
  async getEventRegistrationsByMemberId(memberId) {
    return db.select().from(eventRegistrations).where(eq(eventRegistrations.memberId, memberId));
  }
  async createEventRegistration(registration) {
    const [newReg] = await db.insert(eventRegistrations).values(registration).returning();
    return newReg;
  }
  async deleteEventRegistration(eventId, memberId) {
    await db.delete(eventRegistrations).where(
      and(
        eq(eventRegistrations.eventId, eventId),
        eq(eventRegistrations.memberId, memberId)
      )
    );
  }
  // Loyalty Transactions
  async getLoyaltyTransactionsByMemberId(memberId) {
    return db.select().from(loyaltyTransactions).where(eq(loyaltyTransactions.memberId, memberId)).orderBy(desc(loyaltyTransactions.createdAt));
  }
  async createLoyaltyTransaction(transaction) {
    const [newTransaction] = await db.insert(loyaltyTransactions).values(transaction).returning();
    return newTransaction;
  }
  // Notifications
  async getNotificationsByMemberId(memberId) {
    return db.select().from(notifications).where(eq(notifications.memberId, memberId)).orderBy(desc(notifications.createdAt));
  }
  async createNotification(notification) {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }
  async markNotificationAsRead(id) {
    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id));
  }
};
var storage = new PostgresStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
import createMemoryStore from "memorystore";
var MemoryStore = createMemoryStore(session);
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "eldoret-club-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1e3 * 60 * 60 * 24 * 7
      // 7 days
    },
    store: new MemoryStore({
      checkPeriod: 864e5
    })
  };
  if (app2.get("env") === "production") {
    app2.set("trust proxy", 1);
    sessionSettings.cookie = {
      ...sessionSettings.cookie,
      secure: true
    };
  }
  app2.use(session(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email.toLowerCase());
          if (!user) {
            return done(null, false, { message: "Invalid email or password" });
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Forbidden: Admin access required" });
}

// server/routes.ts
import passport2 from "passport";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  setupAuth(app2);
  app2.post("/api/auth/login", (req, res, next) => {
    passport2.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      req.logIn(user, async (err2) => {
        if (err2) {
          return res.status(500).json({ message: "Login failed" });
        }
        let memberProfile = null;
        if (user.role === "member") {
          memberProfile = await storage.getMemberByUserId(user.id);
        }
        res.json({
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          },
          member: memberProfile
        });
      });
    })(req, res, next);
  });
  app2.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });
  app2.get("/api/auth/me", isAuthenticated, async (req, res) => {
    const user = req.user;
    let memberProfile = null;
    if (user.role === "member") {
      memberProfile = await storage.getMemberByUserId(user.id);
    }
    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      member: memberProfile
    });
  });
  app2.get("/api/members", isAdmin, async (req, res) => {
    try {
      const members2 = await storage.getAllMembers();
      res.json(members2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });
  app2.get("/api/members/:id", isAuthenticated, async (req, res) => {
    try {
      const member = await storage.getMemberById(req.params.id);
      if (!member) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch member" });
    }
  });
  app2.patch("/api/members/:id", isAuthenticated, async (req, res) => {
    try {
      const updated = await storage.updateMember(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update member" });
    }
  });
  app2.get("/api/caddies", isAuthenticated, async (req, res) => {
    try {
      const caddies2 = await storage.getAllCaddies();
      res.json(caddies2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch caddies" });
    }
  });
  app2.get("/api/caddies/available", isAuthenticated, async (req, res) => {
    try {
      const caddies2 = await storage.getAvailableCaddies();
      res.json(caddies2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available caddies" });
    }
  });
  app2.post("/api/caddies", isAdmin, async (req, res) => {
    try {
      const validation = insertCaddieSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).message });
      }
      const caddie = await storage.createCaddie(validation.data);
      res.status(201).json(caddie);
    } catch (error) {
      res.status(500).json({ message: "Failed to create caddie" });
    }
  });
  app2.patch("/api/caddies/:id", isAdmin, async (req, res) => {
    try {
      const updated = await storage.updateCaddie(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Caddie not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update caddie" });
    }
  });
  app2.get("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      if (user.role === "admin") {
        const bookings2 = await storage.getAllBookings();
        res.json(bookings2);
      } else {
        const member = await storage.getMemberByUserId(user.id);
        if (!member) {
          return res.status(404).json({ message: "Member profile not found" });
        }
        const bookings2 = await storage.getBookingsByMemberId(member.id);
        res.json(bookings2);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  app2.post("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const member = await storage.getMemberByUserId(user.id);
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }
      const validation = insertBookingSchema.safeParse({
        ...req.body,
        memberId: member.id
      });
      if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).message });
      }
      const booking = await storage.createBooking(validation.data);
      await storage.createNotification({
        memberId: member.id,
        type: "booking",
        title: "Booking Created",
        message: `Your tee time for ${new Date(booking.bookingDate).toLocaleDateString()} at ${booking.timeSlot} has been created.`,
        read: false
      });
      await storage.updateMemberPoints(member.id, 50);
      await storage.createLoyaltyTransaction({
        memberId: member.id,
        points: 50,
        activity: "Tee Time Booking",
        type: "earned"
      });
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });
  app2.patch("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const updated = await storage.updateBooking(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking" });
    }
  });
  app2.delete("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBooking(req.params.id);
      res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel booking" });
    }
  });
  app2.get("/api/menu", async (req, res) => {
    try {
      const menuItems2 = await storage.getAllMenuItems();
      res.json(menuItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });
  app2.post("/api/menu", isAdmin, async (req, res) => {
    try {
      const validation = insertMenuItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).message });
      }
      const menuItem = await storage.createMenuItem(validation.data);
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to create menu item" });
    }
  });
  app2.patch("/api/menu/:id", isAdmin, async (req, res) => {
    try {
      const updated = await storage.updateMenuItem(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update menu item" });
    }
  });
  app2.get("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      if (user.role === "admin") {
        const orders2 = await storage.getAllOrders();
        res.json(orders2);
      } else {
        const member = await storage.getMemberByUserId(user.id);
        if (!member) {
          return res.status(404).json({ message: "Member profile not found" });
        }
        const orders2 = await storage.getOrdersByMemberId(member.id);
        res.json(orders2);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  app2.post("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const member = await storage.getMemberByUserId(user.id);
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }
      const { items, ...orderData } = req.body;
      const validation = insertOrderSchema.safeParse({
        ...orderData,
        memberId: member.id
      });
      if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).message });
      }
      const order = await storage.createOrder(validation.data);
      for (const item of items) {
        await storage.createOrderItem({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price
        });
      }
      const points = Math.floor(parseFloat(order.total));
      await storage.updateMemberPoints(member.id, points);
      await storage.createLoyaltyTransaction({
        memberId: member.id,
        points,
        activity: "Dining Purchase",
        type: "earned"
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  app2.patch("/api/orders/:id/status", isAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const updated = await storage.updateOrderStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  app2.get("/api/orders/:id/items", isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getOrderItemsByOrderId(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order items" });
    }
  });
  app2.get("/api/events", async (req, res) => {
    try {
      const events2 = await storage.getAllEvents();
      res.json(events2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });
  app2.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  app2.post("/api/events", isAdmin, async (req, res) => {
    try {
      const validation = insertEventSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: fromZodError(validation.error).message });
      }
      const event = await storage.createEvent(validation.data);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to create event" });
    }
  });
  app2.patch("/api/events/:id", isAdmin, async (req, res) => {
    try {
      const updated = await storage.updateEvent(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update event" });
    }
  });
  app2.get("/api/events/:id/registrations", isAuthenticated, async (req, res) => {
    try {
      const registrations = await storage.getEventRegistrationsByEventId(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });
  app2.get("/api/members/:id/events", isAuthenticated, async (req, res) => {
    try {
      const registrations = await storage.getEventRegistrationsByMemberId(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch member events" });
    }
  });
  app2.post("/api/events/:id/register", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const member = await storage.getMemberByUserId(user.id);
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }
      const registration = await storage.createEventRegistration({
        eventId: req.params.id,
        memberId: member.id
      });
      await storage.updateMemberPoints(member.id, 100);
      await storage.createLoyaltyTransaction({
        memberId: member.id,
        points: 100,
        activity: "Event Registration",
        type: "earned"
      });
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ message: "Failed to register for event" });
    }
  });
  app2.delete("/api/events/:eventId/register/:memberId", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEventRegistration(req.params.eventId, req.params.memberId);
      res.json({ message: "Event registration cancelled" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel registration" });
    }
  });
  app2.get("/api/loyalty/transactions/:memberId", isAuthenticated, async (req, res) => {
    try {
      const transactions = await storage.getLoyaltyTransactionsByMemberId(req.params.memberId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch loyalty transactions" });
    }
  });
  app2.post("/api/loyalty/redeem", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const member = await storage.getMemberByUserId(user.id);
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }
      const { points, reward } = req.body;
      if (member.loyaltyPoints < points) {
        return res.status(400).json({ message: "Insufficient points" });
      }
      await storage.updateMemberPoints(member.id, -points);
      await storage.createLoyaltyTransaction({
        memberId: member.id,
        points: -points,
        activity: `Redeemed: ${reward}`,
        type: "redeemed"
      });
      res.json({ message: "Points redeemed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to redeem points" });
    }
  });
  app2.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const user = req.user;
      const member = await storage.getMemberByUserId(user.id);
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }
      const notifications2 = await storage.getNotificationsByMemberId(member.id);
      res.json(notifications2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.patch("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "127.0.0.1",
    reusePort: false
  }, () => {
    log(`serving on port ${port}`);
  });
})();
