import NotificationPanel from '../NotificationPanel';

export default function NotificationPanelExample() {
  const notifications = [
    {
      id: "1",
      type: "booking" as const,
      title: "Tee Time Confirmed",
      message: "Your booking for March 15, 2025 at 9:00 AM has been confirmed. Caddie assigned: James Kipchoge.",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: "2",
      type: "event" as const,
      title: "New Event: Spring Championship",
      message: "Registration now open for the Spring Championship 2025. Limited spots available.",
      timestamp: "1 day ago",
      read: false
    },
    {
      id: "3",
      type: "payment" as const,
      title: "Payment Received",
      message: "Your payment of $150.00 for event registration has been processed successfully.",
      timestamp: "2 days ago",
      read: true
    },
    {
      id: "4",
      type: "achievement" as const,
      title: "Milestone Reached!",
      message: "Congratulations! You've earned 10,000 lifetime loyalty points and unlocked Gold tier benefits.",
      timestamp: "3 days ago",
      read: true
    }
  ];

  return (
    <div className="p-6 max-w-2xl">
      <NotificationPanel 
        notifications={notifications}
        onMarkAsRead={(id) => console.log('Mark as read:', id)}
      />
    </div>
  );
}
