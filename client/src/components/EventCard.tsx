import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "Tournament" | "Social" | "Training";
  capacity: number;
  registered: number;
  price: number;
  image?: string;
}

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
}

export default function EventCard({ event, onRegister }: EventCardProps) {
  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;

  const typeColors: Record<string, string> = {
    Tournament: "bg-primary text-primary-foreground",
    Social: "bg-chart-2 text-white",
    Training: "bg-chart-4 text-white"
  };

  const handleRegister = () => {
    if (!isFull) {
      onRegister?.(event.id);
      console.log('Registered for event:', event.title);
    }
  };

  return (
    <Card className="overflow-hidden" data-testid={`card-event-${event.id}`}>
      {event.image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl font-serif" data-testid={`text-event-title-${event.id}`}>
            {event.title}
          </CardTitle>
          <Badge className={typeColors[event.type]}>{event.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>
            {event.registered}/{event.capacity} registered
            {spotsLeft > 0 && spotsLeft <= 5 && (
              <Badge variant="outline" className="ml-2 text-xs">
                {spotsLeft} spots left
              </Badge>
            )}
          </span>
        </div>
        <div className="pt-2">
          <p className="text-lg font-bold text-primary" data-testid={`text-event-price-${event.id}`}>
            ${event.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleRegister}
          disabled={isFull}
          data-testid={`button-register-${event.id}`}
        >
          {isFull ? 'Event Full' : 'Register Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
