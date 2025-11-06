import { useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import CaddieSelector from "@/components/CaddieSelector";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle } from "lucide-react";

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [selectedCaddie, setSelectedCaddie] = useState<string | null>(null);
  const [partySize, setPartySize] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBooking = () => {
    if (selectedSlot && selectedCaddie) {
      setShowConfirmation(true);
      console.log('Booking confirmed:', { selectedSlot, selectedCaddie, partySize });
    }
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-serif">Booking Confirmed!</CardTitle>
            <CardDescription>Your tee time has been successfully reserved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-md text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-medium">
                    {selectedSlot?.date.toLocaleDateString()} at {selectedSlot?.time}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Party Size</p>
                  <p className="font-medium">{partySize} {partySize === 1 ? 'player' : 'players'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Caddie</p>
                  <p className="font-medium">Assigned</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Booking ID</p>
                  <p className="font-medium">BK-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your registered email address.
            </p>
          </CardContent>
          <CardFooter className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setShowConfirmation(false)} data-testid="button-book-another">
              Book Another
            </Button>
            <Button onClick={() => window.location.hash = '#dashboard'} data-testid="button-view-bookings">
              View My Bookings
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-page-title">
          Book Tee Time
        </h1>
        <p className="text-muted-foreground">Reserve your preferred slot and caddie</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <BookingCalendar onSelectSlot={(date, time) => setSelectedSlot({ date, time })} />
          <CaddieSelector onSelectCaddie={setSelectedCaddie} />
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your selection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="party-size">Party Size</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="party-size"
                    type="number"
                    min="1"
                    max="4"
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
                    className="max-w-24"
                    data-testid="input-party-size"
                  />
                  <span className="text-sm text-muted-foreground">players</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date & Time</span>
                  {selectedSlot ? (
                    <Badge variant="outline">{selectedSlot.time}</Badge>
                  ) : (
                    <span className="text-muted-foreground">Not selected</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Caddie</span>
                  {selectedCaddie ? (
                    <Badge variant="outline">Assigned</Badge>
                  ) : (
                    <span className="text-muted-foreground">Not selected</span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Party Size</span>
                  <span className="font-medium">{partySize}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">$45.00</span>
                </div>
                <p className="text-xs text-muted-foreground">Per person tee time fee</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleBooking}
                disabled={!selectedSlot || !selectedCaddie}
                data-testid="button-confirm-booking"
              >
                Confirm Booking
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
