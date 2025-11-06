import { db } from "./db";
import * as schema from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("🌱 Seeding database...");

  // Create test users
  const memberPassword = await bcrypt.hash("member123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  const [memberUser] = await db.insert(schema.users).values({
    email: "member@eldoretclub.com",
    password: memberPassword,
    role: "member"
  }).returning();

  const [adminUser] = await db.insert(schema.users).values({
    email: "admin@eldoretclub.com",
    password: adminPassword,
    role: "admin"
  }).returning();

  // Create member profile
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const [member] = await db.insert(schema.members).values({
    userId: memberUser.id,
    firstName: "John",
    lastName: "Doe",
    phone: "+254 712 345 678",
    membershipType: "Individual",
    membershipStatus: "Active",
    expiryDate,
    handicap: "12.0",
    loyaltyPoints: 12450,
    lifetimePoints: 45820,
    loyaltyTier: "Gold"
  }).returning();

  // Create caddies
  const caddies = await db.insert(schema.caddies).values([
    { name: "James Kipchoge", rating: "4.8", experienceYears: 8, handicapRange: "0-15", available: true },
    { name: "Peter Kimutai", rating: "4.9", experienceYears: 12, handicapRange: "All levels", available: true },
    { name: "David Korir", rating: "4.7", experienceYears: 5, handicapRange: "15-30", available: false },
    { name: "Michael Ruto", rating: "4.6", experienceYears: 6, handicapRange: "0-20", available: true }
  ]).returning();

  // Create menu items
  await db.insert(schema.menuItems).values([
    { name: "Grilled Salmon", description: "Fresh Atlantic salmon with lemon butter sauce, seasonal vegetables", price: "28.50", category: "Main Course", available: true },
    { name: "Caesar Salad", description: "Crispy romaine lettuce, parmesan, croutons, classic dressing", price: "12.00", category: "Appetizer", available: true },
    { name: "Beef Tenderloin", description: "Prime beef with truffle mashed potatoes and red wine reduction", price: "42.00", category: "Main Course", available: true },
    { name: "Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, tomato", price: "16.00", category: "Light Fare", available: true },
    { name: "Lobster Bisque", description: "Rich and creamy soup with fresh lobster", price: "14.00", category: "Appetizer", available: true },
    { name: "Chocolate Lava Cake", description: "Warm chocolate cake with vanilla ice cream", price: "10.00", category: "Dessert", available: true },
    { name: "Chicken Alfredo", description: "Grilled chicken with creamy fettuccine pasta", price: "24.00", category: "Main Course", available: true },
    { name: "Fish & Chips", description: "Beer-battered cod with hand-cut fries", price: "18.00", category: "Light Fare", available: true }
  ]);

  // Create events
  const eventDate1 = new Date();
  eventDate1.setDate(eventDate1.getDate() + 10);

  const eventDate2 = new Date();
  eventDate2.setDate(eventDate2.getDate() + 15);

  const eventDate3 = new Date();
  eventDate3.setDate(eventDate3.getDate() + 17);

  const [event1, event2, event3] = await db.insert(schema.events).values([
    {
      title: "Spring Championship 2025",
      description: "Annual spring golf championship open to all members. Compete for the club trophy and amazing prizes.",
      eventDate: eventDate1,
      startTime: "08:00",
      endTime: "16:00",
      location: "Eldoret Club Main Course",
      eventType: "Tournament",
      capacity: 80,
      price: "150.00"
    },
    {
      title: "Wine & Dine Evening",
      description: "Elegant evening of fine dining and wine tasting with live music in the clubhouse.",
      eventDate: eventDate2,
      startTime: "18:00",
      endTime: "22:00",
      location: "Clubhouse Dining Hall",
      eventType: "Social",
      capacity: 60,
      price: "85.00"
    },
    {
      title: "Beginner Golf Clinic",
      description: "Learn the fundamentals of golf with our professional instructors. All equipment provided.",
      eventDate: eventDate3,
      startTime: "10:00",
      endTime: "12:00",
      location: "Practice Range",
      eventType: "Training",
      capacity: 15,
      price: "45.00"
    }
  ]).returning();

  // Create some event registrations
  await db.insert(schema.eventRegistrations).values([
    { eventId: event1.id, memberId: member.id },
    { eventId: event2.id, memberId: member.id }
  ]);

  // Create bookings for the member
  const bookingDate1 = new Date();
  bookingDate1.setDate(bookingDate1.getDate() + 5);

  const bookingDate2 = new Date();
  bookingDate2.setDate(bookingDate2.getDate() + 8);

  await db.insert(schema.bookings).values([
    {
      memberId: member.id,
      caddieId: caddies[0].id,
      bookingDate: bookingDate1,
      timeSlot: "09:00 AM",
      partySize: 1,
      status: "Confirmed"
    },
    {
      memberId: member.id,
      caddieId: caddies[1].id,
      bookingDate: bookingDate2,
      timeSlot: "10:00 AM",
      partySize: 2,
      status: "Pending"
    }
  ]);

  // Create loyalty transactions
  await db.insert(schema.loyaltyTransactions).values([
    { memberId: member.id, points: 50, activity: "Tee Time Booking", type: "earned" },
    { memberId: member.id, points: 125, activity: "Dining Purchase", type: "earned" },
    { memberId: member.id, points: -1500, activity: "Redeemed: Dining Credit", type: "redeemed" },
    { memberId: member.id, points: 100, activity: "Event Registration", type: "earned" }
  ]);

  // Create notifications
  await db.insert(schema.notifications).values([
    {
      memberId: member.id,
      type: "booking",
      title: "Tee Time Confirmed",
      message: `Your booking for ${bookingDate1.toLocaleDateString()} at 9:00 AM has been confirmed. Caddie assigned: James Kipchoge.`,
      read: false
    },
    {
      memberId: member.id,
      type: "event",
      title: "New Event: Spring Championship",
      message: "Registration now open for the Spring Championship 2025. Limited spots available.",
      read: false
    },
    {
      memberId: member.id,
      type: "payment",
      title: "Payment Received",
      message: "Your payment of $150.00 for event registration has been processed successfully.",
      read: true
    }
  ]);

  console.log("✅ Database seeded successfully!");
  console.log("\nTest Credentials:");
  console.log("Member: member@eldoretclub.com / member123");
  console.log("Admin: admin@eldoretclub.com / admin123");
  
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
