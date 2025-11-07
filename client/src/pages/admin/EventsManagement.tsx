import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Calendar as CalendarIcon, Users, MapPin, Clock, CheckCircle, XCircle, Edit, Trash2, CalendarDays, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventStatus = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
type EventType = 'tournament' | 'social' | 'charity' | 'workshop' | 'other';

type Event = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  status: EventStatus;
  image?: string;
  organizer: string;
  contactEmail: string;
  registrationDeadline: string;
};

type Participant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'confirmed' | 'waiting' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
};

const EventsManagement = () => {
  // Dummy data for events
  const events: Event[] = [
    {
      id: 'EVT-001',
      title: 'Annual Golf Championship',
      description: 'Join us for our premier annual golf championship with exciting prizes!',
      type: 'tournament',
      startDate: '2025-12-15',
      endDate: '2025-12-17',
      time: '08:00 AM',
      location: 'Championship Course',
      maxParticipants: 100,
      currentParticipants: 78,
      price: 5000,
      status: 'upcoming',
      organizer: 'Eldoret Golf Club',
      contactEmail: 'events@eldoretgolfclub.com',
      registrationDeadline: '2025-12-10'
    },
    {
      id: 'EVT-002',
      title: 'Charity Golf Day',
      description: 'Play golf for a cause! All proceeds go to local children\'s hospital.',
      type: 'charity',
      startDate: '2025-11-25',
      endDate: '2025-11-25',
      time: '10:00 AM',
      location: 'Main Course',
      maxParticipants: 50,
      currentParticipants: 42,
      price: 2500,
      status: 'upcoming',
      organizer: 'Eldoret Community Foundation',
      contactEmail: 'charity@ecf.org',
      registrationDeadline: '2025-11-20'
    },
    {
      id: 'EVT-003',
      title: 'Golf Basics Workshop',
      description: 'Learn the fundamentals of golf from our professional instructors.',
      type: 'workshop',
      startDate: '2025-11-20',
      endDate: '2025-11-20',
      time: '02:00 PM',
      location: 'Driving Range',
      maxParticipants: 20,
      currentParticipants: 15,
      price: 1500,
      status: 'upcoming',
      organizer: 'Eldoret Golf Academy',
      contactEmail: 'academy@eldoretgolf.com',
      registrationDeadline: '2025-11-18'
    },
    {
      id: 'EVT-004',
      title: 'Monthly Social Tournament',
      description: 'Monthly social gathering for members to network and enjoy friendly competition.',
      type: 'social',
      startDate: '2025-11-10',
      endDate: '2025-11-10',
      time: '09:00 AM',
      location: 'Executive Course',
      maxParticipants: 40,
      currentParticipants: 40,
      price: 2000,
      status: 'in_progress',
      organizer: 'Eldoret Golf Club',
      contactEmail: 'social@eldoretgolfclub.com',
      registrationDeadline: '2025-11-08'
    },
    {
      id: 'EVT-005',
      title: 'Junior Golf Camp',
      description: 'Summer golf camp for young golfers aged 8-16.',
      type: 'workshop',
      startDate: '2025-10-30',
      endDate: '2025-10-30',
      time: '09:00 AM',
      location: 'Practice Greens',
      maxParticipants: 30,
      currentParticipants: 28,
      price: 1000,
      status: 'completed',
      organizer: 'Eldoret Junior Golf Program',
      contactEmail: 'juniors@eldoretgolf.com',
      registrationDeadline: '2025-10-25'
    },
  ];

  // Dummy data for participants
  const participants: Record<string, Participant[]> = {
    'EVT-001': Array.from({ length: 15 }, (_, i) => ({
      id: `PART-${i + 1}`,
      name: `Participant ${i + 1}`,
      email: `participant${i + 1}@example.com`,
      phone: `+2547${Math.floor(10000000 + Math.random() * 90000000)}`,
      registrationDate: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: ['confirmed', 'waiting', 'cancelled'][Math.floor(Math.random() * 3)] as 'confirmed' | 'waiting' | 'cancelled',
      paymentStatus: ['paid', 'pending', 'refunded'][Math.floor(Math.random() * 3)] as 'paid' | 'pending' | 'refunded',
    })),
    'EVT-002': Array.from({ length: 8 }, (_, i) => ({
      id: `PART-${i + 50}`,
      name: `Participant ${i + 50}`,
      email: `participant${i + 50}@example.com`,
      phone: `+2547${Math.floor(10000000 + Math.random() * 90000000)}`,
      registrationDate: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: ['confirmed', 'waiting', 'cancelled'][Math.floor(Math.random() * 3)] as 'confirmed' | 'waiting' | 'cancelled',
      paymentStatus: ['paid', 'pending', 'refunded'][Math.floor(Math.random() * 3)] as 'paid' | 'pending' | 'refunded',
    })),
  };

  const getStatusBadge = (status: EventStatus) => {
    const statusMap = {
      upcoming: { label: 'Upcoming', variant: 'default' as const },
      in_progress: { label: 'In Progress', variant: 'secondary' as const },
      completed: { label: 'Completed', variant: 'outline' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getTypeBadge = (type: EventType) => {
    const typeMap = {
      tournament: { label: 'Tournament', variant: 'default' as const },
      social: { label: 'Social', variant: 'secondary' as const },
      charity: { label: 'Charity', variant: 'destructive' as const },
      workshop: { label: 'Workshop', variant: 'outline' as const },
      other: { label: 'Other', variant: 'secondary' as const },
    };
    
    const { label, variant } = typeMap[type] || { label: type, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  const getParticipantStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      confirmed: { label: 'Confirmed', variant: 'default' },
      waiting: { label: 'Waiting', variant: 'secondary' },
      cancelled: { label: 'Cancelled', variant: 'destructive' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      paid: { label: 'Paid', variant: 'default' },
      pending: { label: 'Pending', variant: 'secondary' },
      refunded: { label: 'Refunded', variant: 'outline' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
          <p className="text-muted-foreground">
            Manage golf events, tournaments, and participant registrations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">
            <CalendarDays className="mr-2 h-4 w-4" />
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Past Events
          </TabsTrigger>
          <TabsTrigger value="participants">
            <Users className="mr-2 h-4 w-4" />
            Participants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage upcoming golf events and tournaments
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
                <Button variant="outline" size="sm" className="h-10">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events
                    .filter(event => ['upcoming', 'in_progress'].includes(event.status))
                    .map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div>{event.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {event.description}
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(event.type)}</TableCell>
                        <TableCell>
                          <div className="font-medium">{event.startDate}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.time}
                          </div>
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>
                              {event.currentParticipants}/{event.maxParticipants}
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ 
                                width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                                maxWidth: '100%'
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Event
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View Participants
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Events</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage past events and their data
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events
                    .filter(event => ['completed', 'cancelled'].includes(event.status))
                    .map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>{getTypeBadge(event.type)}</TableCell>
                        <TableCell>{event.startDate}</TableCell>
                        <TableCell>
                          {event.currentParticipants}/{event.maxParticipants}
                        </TableCell>
                        <TableCell>{getStatusBadge(event.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View Participants
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Tag className="mr-2 h-4 w-4" />
                                View Results
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Participants</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage participant registrations and check-ins
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-4">
                <div className="flex-1">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select an event...</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {new Date(event.startDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Export List
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(participants).flatMap(([eventId, eventParticipants]) =>
                    eventParticipants.map((participant) => (
                      <TableRow key={`${eventId}-${participant.id}`}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phone}</TableCell>
                        <TableCell>{participant.registrationDate}</TableCell>
                        <TableCell>{getParticipantStatusBadge(participant.status)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(participant.paymentStatus)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Registration
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Check In
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Registration
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsManagement;
