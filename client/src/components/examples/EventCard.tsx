import EventCard from '../EventCard';
import eventImage from '@assets/generated_images/Golf_tournament_event_0a909d15.png';

export default function EventCardExample() {
  const events = [
    {
      id: "1",
      title: "Spring Championship 2025",
      description: "Annual spring golf championship open to all members. Compete for the club trophy and prizes.",
      date: "March 15, 2025",
      time: "8:00 AM - 4:00 PM",
      location: "Eldoret Club Main Course",
      type: "Tournament" as const,
      capacity: 80,
      registered: 65,
      price: 150.00,
      image: eventImage
    },
    {
      id: "2",
      title: "Wine & Dine Evening",
      description: "Elegant evening of fine dining and wine tasting with live music in the clubhouse.",
      date: "March 20, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Clubhouse Dining Hall",
      type: "Social" as const,
      capacity: 60,
      registered: 45,
      price: 85.00
    },
    {
      id: "3",
      title: "Beginner Golf Clinic",
      description: "Learn the fundamentals of golf with our professional instructors. All equipment provided.",
      date: "March 22, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Practice Range",
      type: "Training" as const,
      capacity: 15,
      registered: 15,
      price: 45.00
    }
  ];

  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onRegister={(id) => console.log('Register for event:', id)}
          />
        ))}
      </div>
    </div>
  );
}
