import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'react-hot-toast';
import { Loader2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  price?: number;
  hasPaidOption: boolean;
}

const EventsPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isRSVPDialogOpen, setIsRSVPDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paid' | 'unpaid'>('unpaid');
  const [rsvpStatus, setRsvpStatus] = useState<Record<number, { status: 'going' | 'not_going' | 'pending'; paid: boolean }>>({});
  // Sample events data - in a real app, this would come from an API
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Wine Tasting Night',
      date: '2025-11-15',
      time: '7:00 PM',
      location: 'Main Lounge',
      description: 'Join us for an evening of fine wines and gourmet pairings.',
      image: '/images/events/wine-tasting.jpg',
      price: 2500,
      hasPaidOption: true,
    },
    {
      id: 2,
      title: 'Jazz Night',
      date: '2025-11-20',
      time: '8:00 PM',
      location: 'Garden Terrace',
      description: 'Smooth jazz performances by renowned artists in our beautiful garden setting.',
      image: '/images/events/jazz-night.jpg',
      price: 1500,
      hasPaidOption: true,
    },
    {
      id: 3,
      title: 'Chef\'s Special Dinner',
      date: '2025-11-25',
      time: '7:30 PM',
      location: 'Main Restaurant',
      description: 'Exclusive multi-course dinner prepared by our executive chef.',
      image: '/images/events/chef-special.jpg',
      price: 3500,
      hasPaidOption: true,
    },
  ]);

  const handleRSVP = (event: Event) => {
    setSelectedEvent(event);
    setIsRSVPDialogOpen(true);
  };

  const handleRSVPSubmit = async () => {
    if (!selectedEvent) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setRsvpStatus(prev => ({
        ...prev,
        [selectedEvent.id]: { 
          status: 'going', 
          paid: paymentMethod === 'paid' 
        }
      }));
      
      toast.success(`RSVP Successful! You have successfully RSVP'd for ${selectedEvent.title}. ${paymentMethod === 'paid' ? 'Payment received. Looking forward to seeing you!' : 'Please make payment at the venue.'}`);
      
      setIsRSVPDialogOpen(false);
    } catch (error) {
      toast.error("Failed to process your RSVP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelRSVP = async (eventId: number) => {
    try {
      // In a real app, this would be an API call to cancel RSVP
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      setRsvpStatus(prev => ({
        ...prev,
        [eventId]: { 
          status: 'not_going',
          paid: false
        }
      }));
      
      toast.success("Your RSVP has been cancelled.");
    } catch (error) {
      toast.error("Failed to cancel RSVP. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          + Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-700">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {event.title}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {event.location}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  Learn More
                </button>
                {rsvpStatus[event.id]?.status === 'going' ? (
                  <div className="flex space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      {rsvpStatus[event.id]?.paid ? 'Paid' : 'Registered'}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelRSVP(event.id);
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRSVP(event);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Past Events</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">No past events to display</p>
          </div>
        </div>
      </div>
      
      {/* RSVP Dialog */}
      <Dialog open={isRSVPDialogOpen} onOpenChange={setIsRSVPDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>RSVP for {selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.hasPaidOption 
                ? "Please select your payment option:" 
                : "Please confirm your attendance:"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent?.hasPaidOption && (
            <div className="grid gap-4 py-4">
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value: 'paid' | 'unpaid') => setPaymentMethod(value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paid" id="paid" />
                  <Label htmlFor="paid" className="flex-1">
                    <div>Pay Now (KSh {selectedEvent?.price?.toLocaleString()})</div>
                    <p className="text-sm text-muted-foreground">
                      Secure payment via M-Pesa
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unpaid" id="unpaid" />
                  <Label htmlFor="unpaid" className="flex-1">
                    <div>Pay at Venue</div>
                    <p className="text-sm text-muted-foreground">
                      Pay when you arrive at the event
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRSVPDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRSVPSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm RSVP"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPage;
