import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Users, CheckCircle, XCircle, Clock as ClockIcon, UserCheck, UserX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Booking {
  id: string;
  date: string;
  time: string;
  players: number;
  caddies: Array<{
    id: string;
    name: string;
    rate: number;
    count: number;
  }>;
  totalCost: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  invitedMembers: Array<{
    id: string;
    name: string;
    email: string;
    status: 'pending' | 'accepted' | 'declined';
    avatar: string;
  }>;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the user's bookings
    const fetchBookings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockBookings: Booking[] = [
          {
            id: 'BK-123456',
            date: '2025-12-15',
            time: '09:30 AM',
            players: 3,
            caddies: [
              { id: '1', name: 'James Kipchoge', rate: 50, count: 2 },
              { id: '2', name: 'Peter Kimutai', rate: 60, count: 1 }
            ],
            totalCost: 300,
            status: 'confirmed',
            invitedMembers: [
              { id: 'M002', name: 'Sarah Wanjiku', email: 'sarah.w@example.com', status: 'accepted', avatar: '/avatars/avatar-2.jpg' },
              { id: 'M003', name: 'Michael Ochieng', email: 'm.ochieng@example.com', status: 'pending', avatar: '/avatars/avatar-3.jpg' },
              { id: 'M004', name: 'Amina Hassan', email: 'a.hassan@example.com', status: 'declined', avatar: '/avatars/avatar-4.jpg' }
            ]
          },
          {
            id: 'BK-123457',
            date: '2025-12-20',
            time: '02:15 PM',
            players: 2,
            caddies: [
              { id: '4', name: 'Michael Ruto', rate: 55, count: 2 }
            ],
            totalCost: 200,
            status: 'confirmed',
            invitedMembers: [
              { id: 'M001', name: 'Dr. James Mwangi', email: 'james.mwangi@example.com', status: 'accepted', avatar: '/avatars/avatar-1.jpg' }
            ]
          }
        ];
        
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const confirmedBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const pastBookings = []; // In a real app, this would be filtered from the bookings

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getMemberStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-amber-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">View and manage your upcoming and past tee time bookings</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {confirmedBookings.length === 0 && pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground text-sm">Book your next tee time to get started</p>
                <Button className="mt-4">Book Now</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {confirmedBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  getStatusBadge={getStatusBadge}
                  getMemberStatusIcon={getMemberStatusIcon}
                />
              ))}
              
              {pendingBookings.map((booking) => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  getStatusBadge={getStatusBadge}
                  getMemberStatusIcon={getMemberStatusIcon}
                />
              ))}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastBookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ClockIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No past bookings</h3>
                <p className="text-muted-foreground text-sm">Your past bookings will appear here</p>
              </CardContent>
            </Card>
          ) : (
            pastBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                getStatusBadge={getStatusBadge}
                getMemberStatusIcon={getMemberStatusIcon}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
  getStatusBadge: (status: string) => React.ReactNode;
  getMemberStatusIcon: (status: string) => React.ReactNode;
}

function BookingCard({ booking, getStatusBadge, getMemberStatusIcon }: BookingCardProps) {
  const totalPlayers = booking.players + booking.invitedMembers.filter(m => m.status === 'accepted').length;
  
  return (
    <Card key={booking.id} className="overflow-hidden">
      <div className="md:flex">
        <div className="p-6 flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-serif font-semibold">Tee Time #{booking.id}</h3>
              {getStatusBadge(booking.status)}
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">
                {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{booking.time}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${booking.totalCost}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Caddie Details */}
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <UserCheck className="h-4 w-4 mr-2 text-primary" />
              Caddie Details
            </h4>
            <div className="space-y-3">
              {booking.caddies.map((caddie) => (
                <div key={caddie.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-medium">{caddie.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {caddie.count} {caddie.count > 1 ? 'players' : 'player'} × ${caddie.rate}
                    </div>
                  </div>
                  <div className="font-medium">${(caddie.rate * caddie.count).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Details */}
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Players ({totalPlayers})
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <UserCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-sm text-muted-foreground">Host</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  Confirmed
                </Badge>
              </div>

              {booking.invitedMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">Invited</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {member.status === 'pending' && (
                      <span className="text-xs text-amber-500 mr-2">Pending</span>
                    )}
                    {getMemberStatusIcon(member.status)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="border-t p-4 bg-muted/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Booking ID: {booking.id}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none">
              View Details
            </Button>
            {booking.status === 'confirmed' && (
              <Button variant="destructive" className="flex-1 sm:flex-none">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
