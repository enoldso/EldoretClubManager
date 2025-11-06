import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
  caddies: number;
}

interface BookingCalendarProps {
  onSelectSlot?: (date: Date, time: string) => void;
}

export default function BookingCalendar({ onSelectSlot }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const timeSlots: TimeSlot[] = [
    { time: "07:00 AM", available: true, caddies: 4 },
    { time: "08:00 AM", available: true, caddies: 3 },
    { time: "09:00 AM", available: false, caddies: 0 },
    { time: "10:00 AM", available: true, caddies: 5 },
    { time: "11:00 AM", available: true, caddies: 2 },
    { time: "12:00 PM", available: true, caddies: 4 },
    { time: "01:00 PM", available: false, caddies: 0 },
    { time: "02:00 PM", available: true, caddies: 6 },
    { time: "03:00 PM", available: true, caddies: 3 },
    { time: "04:00 PM", available: true, caddies: 4 },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    onSelectSlot?.(selectedDate, time);
    console.log('Selected:', formatDate(selectedDate), time);
  };

  return (
    <Card data-testid="card-booking-calendar">
      <CardHeader>
        <CardTitle>Book Tee Time</CardTitle>
        <CardDescription>Select your preferred date and time slot</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeDate(-1)}
            data-testid="button-previous-day"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center flex-1">
            <p className="font-medium" data-testid="text-selected-date">{formatDate(selectedDate)}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeDate(1)}
            data-testid="button-next-day"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.time}
              onClick={() => slot.available && handleSelectTime(slot.time)}
              disabled={!slot.available}
              className={`p-4 rounded-md border text-left transition-colors ${
                selectedTime === slot.time
                  ? 'bg-primary text-primary-foreground border-primary'
                  : slot.available
                  ? 'hover-elevate active-elevate-2 bg-card'
                  : 'opacity-50 cursor-not-allowed bg-muted'
              }`}
              data-testid={`button-timeslot-${slot.time.replace(/[\s:]/g, '-')}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-3 w-3" />
                <span className="font-medium text-sm">{slot.time}</span>
              </div>
              {slot.available ? (
                <Badge variant="secondary" className="text-xs">
                  {slot.caddies} caddies
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs">
                  Booked
                </Badge>
              )}
            </button>
          ))}
        </div>

        {selectedTime && (
          <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
            <p className="text-sm font-medium">Selected Time</p>
            <p className="text-lg font-serif text-primary">{selectedTime} on {formatDate(selectedDate)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
