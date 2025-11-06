import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, CreditCard, Mail, Trophy } from "lucide-react";

export interface Notification {
  id: string;
  type: "booking" | "payment" | "event" | "general" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
}

export default function NotificationPanel({ notifications, onMarkAsRead }: NotificationPanelProps) {
  const iconMap = {
    booking: Calendar,
    payment: CreditCard,
    event: Mail,
    general: Bell,
    achievement: Trophy
  };

  const colorMap = {
    booking: "text-primary",
    payment: "text-chart-2",
    event: "text-chart-4",
    general: "text-muted-foreground",
    achievement: "text-chart-1"
  };

  return (
    <Card data-testid="card-notifications">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated with club activities</CardDescription>
          </div>
          {notifications.filter(n => !n.read).length > 0 && (
            <Badge variant="destructive">
              {notifications.filter(n => !n.read).length} new
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No notifications</p>
        ) : (
          notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <button
                key={notification.id}
                onClick={() => onMarkAsRead?.(notification.id)}
                className={`w-full text-left p-3 rounded-md border transition-colors hover-elevate ${
                  !notification.read ? 'bg-primary/5 border-primary/20' : 'bg-card'
                }`}
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${colorMap[notification.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
