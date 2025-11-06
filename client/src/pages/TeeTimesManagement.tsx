import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Calendar as CalendarIcon, Clock, Users, Flag, User, CheckCircle2, XCircle, Clock4 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TeeTime = {
  id: string;
  date: string;
  time: string;
  course: 'Championship' | 'Executive' | '9-Hole';
  players: {
    name: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    memberId: string;
  }[];
  status: 'available' | 'booked' | 'completed' | 'cancelled';
  holes: 9 | 18;
  cartIncluded: boolean;
  caddie?: string;
  specialRequests?: string;
};

export default function TeeTimesManagement() {
  // Dummy data for tee times
  const teeTimes: TeeTime[] = [
    {
      id: 'TT-2023-001',
      date: '2023-11-10',
      time: '07:30',
      course: 'Championship',
      players: [
        { name: 'Dr. James Mwangi', status: 'confirmed', memberId: 'M001' },
        { name: 'Sarah Wanjiku', status: 'confirmed', memberId: 'M002' },
        { name: 'Michael Ochieng', status: 'confirmed', memberId: 'M003' },
        { name: 'Amina Hassan', status: 'pending', memberId: 'M004' },
      ],
      status: 'booked',
      holes: 18,
      cartIncluded: true,
      caddie: 'John Kipchoge',
      specialRequests: 'Early check-in at 7:00 AM',
    },
    {
      id: 'TT-2023-002',
      date: '2023-11-10',
      time: '08:15',
      course: 'Executive',
      players: [
        { name: 'Robert Kamau', status: 'confirmed', memberId: 'M005' },
        { name: 'Elizabeth Wangui', status: 'cancelled', memberId: 'M006' },
      ],
      status: 'booked',
      holes: 9,
      cartIncluded: false,
      specialRequests: 'Vegetarian lunch for 2 after the round',
    },
    {
      id: 'TT-2023-003',
      date: '2023-11-10',
      time: '09:30',
      course: 'Championship',
      players: [],
      status: 'available',
      holes: 18,
      cartIncluded: true,
    },
    {
      id: 'TT-2023-004',
      date: '2023-11-10',
      time: '10:45',
      course: '9-Hole',
      players: [
        { name: 'David Omondi', status: 'confirmed', memberId: 'M007' },
      ],
      status: 'booked',
      holes: 9,
      cartIncluded: true,
      caddie: 'Peter Kimutai',
    },
    {
      id: 'TT-2023-005',
      date: '2023-11-10',
      time: '12:00',
      course: 'Championship',
      players: [
        { name: 'Grace Wambui', status: 'confirmed', memberId: 'M008' },
        { name: 'Brian Kiprop', status: 'confirmed', memberId: 'M009' },
        { name: 'Esther Muthoni', status: 'confirmed', memberId: 'M010' },
        { name: 'Daniel Otieno', status: 'confirmed', memberId: 'M011' },
      ],
      status: 'booked',
      holes: 18,
      cartIncluded: true,
      caddie: 'Samuel Njoroge',
      specialRequests: 'Corporate event - 4 players',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: TeeTime['status']) => {
    const statusMap = {
      available: { label: 'Available', variant: 'default' as const },
      booked: { label: 'Booked', variant: 'secondary' as const },
      completed: { label: 'Completed', variant: 'outline' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getPlayerStatusIcon = (status: 'confirmed' | 'pending' | 'cancelled') => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock4 className="h-4 w-4 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tee Times Management</h1>
          <p className="text-muted-foreground">
            Manage all tee time bookings and availability
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Tee Time
          </Button>
        </div>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="this-week">This Week</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tee times..."
                className="pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>All Status</DropdownMenuItem>
                <DropdownMenuItem>Available</DropdownMenuItem>
                <DropdownMenuItem>Booked</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
                <DropdownMenuItem>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tee Times for {formatDate(new Date().toISOString())}</CardTitle>
                  <CardDescription>
                    {teeTimes.filter(t => t.status === 'booked').length} bookings, {teeTimes.filter(t => t.status === 'available').length} available slots
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    View Timeline
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Players</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teeTimes.map((teeTime) => (
                    <TableRow key={teeTime.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {teeTime.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-muted-foreground" />
                          {teeTime.course}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {teeTime.holes} holes • {teeTime.cartIncluded ? 'Cart Included' : 'Walking'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {teeTime.players.length > 0 ? (
                          <div className="space-y-1">
                            {teeTime.players.map((player) => (
                              <div key={player.memberId} className="flex items-center gap-2">
                                {getPlayerStatusIcon(player.status)}
                                <span className={player.status === 'cancelled' ? 'line-through text-muted-foreground' : ''}>
                                  {player.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No players</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {teeTime.caddie && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            Caddie: {teeTime.caddie}
                          </div>
                        )}
                        {teeTime.specialRequests && (
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {teeTime.specialRequests}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(teeTime.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Players
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Assign Caddie
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-amber-600">
                              <Clock className="mr-2 h-4 w-4" />
                              Modify Time
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Tee Time
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
      </Tabs>
    </div>
  );
}
