import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin, isMember } from "./auth";
import passport from "passport";
import { insertBookingSchema, insertOrderSchema, insertEventRegistrationSchema, insertLoyaltyTransactionSchema, insertMemberSchema, insertCaddieSchema, insertMenuItemSchema, insertEventSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // Auth routes
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      req.logIn(user, async (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        
        // Get member profile if user is a member
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

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", isAuthenticated, async (req, res) => {
    const user = req.user as any;
    
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

  // Member routes
  app.get("/api/members", isAdmin, async (req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });

  app.get("/api/members/:id", isAuthenticated, async (req, res) => {
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

  app.patch("/api/members/:id", isAuthenticated, async (req, res) => {
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

  // Caddies
  app.get("/api/caddies", isAuthenticated, async (req, res) => {
    try {
      const caddies = await storage.getAllCaddies();
      res.json(caddies);
    } catch (error) {
      console.error("Error fetching caddies:", error);
      res.status(500).json({ message: "Failed to fetch caddies" });
    }
  });

  app.get("/api/caddies/available", isAuthenticated, async (req, res) => {
    try {
      const caddies = await storage.getAvailableCaddies();
      res.json(caddies);
    } catch (error) {
      console.error("Error fetching available caddies:", error);
      res.status(500).json({ message: "Failed to fetch available caddies" });
    }
  });

  app.post("/api/caddies", isAdmin, async (req, res) => {
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

  app.patch("/api/caddies/:id", isAdmin, async (req, res) => {
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

  // Booking routes
  app.get("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      
      if (user.role === "admin") {
        const bookings = await storage.getAllBookings();
        res.json(bookings);
      } else {
        const member = await storage.getMemberByUserId(user.id);
        if (!member) {
          return res.status(404).json({ message: "Member profile not found" });
        }
        const bookings = await storage.getBookingsByMemberId(member.id);
        res.json(bookings);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
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
      
      // Create notification
      await storage.createNotification({
        memberId: member.id,
        type: "booking",
        title: "Booking Created",
        message: `Your tee time for ${new Date(booking.bookingDate).toLocaleDateString()} at ${booking.timeSlot} has been created.`,
        read: false
      });
      
      // Award loyalty points
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

  app.patch("/api/bookings/:id", isAuthenticated, async (req, res) => {
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

  app.delete("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBooking(req.params.id);
      res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel booking" });
    }
  });

  // Menu items routes
  app.get("/api/menu", async (req, res) => {
    try {
      const menuItems = await storage.getAllMenuItems();
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.post("/api/menu", isAdmin, async (req, res) => {
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

  app.patch("/api/menu/:id", isAdmin, async (req, res) => {
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

  // Order routes
  app.get("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      
      if (user.role === "admin") {
        const orders = await storage.getAllOrders();
        res.json(orders);
      } else {
        const member = await storage.getMemberByUserId(user.id);
        if (!member) {
          return res.status(404).json({ message: "Member profile not found" });
        }
        const orders = await storage.getOrdersByMemberId(member.id);
        res.json(orders);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
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
      
      // Create order items
      for (const item of items) {
        await storage.createOrderItem({
          orderId: order.id,
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          price: item.price
        });
      }
      
      // Award loyalty points (1 point per dollar)
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

  app.patch("/api/orders/:id/status", isAdmin, async (req, res) => {
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

  app.get("/api/orders/:id/items", isAuthenticated, async (req, res) => {
    try {
      const items = await storage.getOrderItemsByOrderId(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order items" });
    }
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
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

  app.post("/api/events", isAdmin, async (req, res) => {
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

  app.patch("/api/events/:id", isAdmin, async (req, res) => {
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

  // Event registration routes
  app.get("/api/events/:id/registrations", isAuthenticated, async (req, res) => {
    try {
      const registrations = await storage.getEventRegistrationsByEventId(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });

  app.get("/api/members/:id/events", isAuthenticated, async (req, res) => {
    try {
      const registrations = await storage.getEventRegistrationsByMemberId(req.params.id);
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch member events" });
    }
  });

  app.post("/api/events/:id/register", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const member = await storage.getMemberByUserId(user.id);
      
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }

      const registration = await storage.createEventRegistration({
        eventId: req.params.id,
        memberId: member.id
      });
      
      // Award loyalty points
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

  app.delete("/api/events/:eventId/register/:memberId", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteEventRegistration(req.params.eventId, req.params.memberId);
      res.json({ message: "Event registration cancelled" });
    } catch (error) {
      res.status(500).json({ message: "Failed to cancel registration" });
    }
  });

  // Loyalty routes
  app.get("/api/loyalty/transactions/:memberId", isAuthenticated, async (req, res) => {
    try {
      const transactions = await storage.getLoyaltyTransactionsByMemberId(req.params.memberId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch loyalty transactions" });
    }
  });

  app.post("/api/loyalty/redeem", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
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

  // Notification routes
  app.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as any;
      const member = await storage.getMemberByUserId(user.id);
      
      if (!member) {
        return res.status(404).json({ message: "Member profile not found" });
      }

      const notifications = await storage.getNotificationsByMemberId(member.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.patch("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      await storage.markNotificationAsRead(req.params.id);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
