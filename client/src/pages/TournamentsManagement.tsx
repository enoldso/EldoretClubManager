import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Calendar as CalendarIcon, Users, Trophy, Award, Clock, MapPin, User, CheckCircle2, XCircle } from "lucide-react";
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

type TournamentStatus = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';

type Tournament = {
  id: string;
  name: string;
  date: string;
  course: string;
  format: string;
  status: TournamentStatus;
  participants: number;
  maxParticipants: number;
  registrationDeadline: string;
  entryFee: number;
  prizePool: number;
  description?: string;
  organizer?: string;
  contactEmail?: string;
  rules?: string[];
};

export default function TournamentsManagement() {
  // Dummy data for tournaments
  const tournaments: Tournament[] = [
    {
      id: 'T-2023-001',
      name: 'Eldoret Club Championship',
      date: '2023-12-15',
      course: 'Championship',
      format: 'Stroke Play',
      status: 'upcoming',
      participants: 32,
      maxParticipants: 64,
      registrationDeadline: '2023-12-10',
      entryFee: 2500,
      prizePool: 150000,
      description: 'Annual club championship open to all members. 36 holes of stroke play over two days.',
      organizer: 'Eldoret Golf Club',
      contactEmail: 'tournaments@eldoretgolfclub.com',
      rules: [
        'USGA Rules apply',
        'Maximum handicap: 24 for men, 36 for women',
        'Motorized carts allowed',
        'Proper golf attire required'
      ]
    },
    {
      id: 'T-2023-002',
      name: 'Corporate Challenge',
      date: '2023-11-25',
      course: 'Executive',
      format: 'Scramble',
      status: 'upcoming',
      participants: 18,
      maxParticipants: 20,
      registrationDeadline: '2023-11-20',
      entryFee: 5000,
      prizePool: 50000,
      description: 'Team event for corporate sponsors. Teams of 4 players.',
      organizer: 'Eldoret Business Network'
    },
    {
      id: 'T-2023-003',
      name: 'Junior Open',
      date: '2023-11-18',
      course: '9-Hole',
      format: 'Match Play',
      status: 'in_progress',
      participants: 12,
      maxParticipants: 16,
      registrationDeadline: '2023-11-15',
      entryFee: 1000,
      prizePool: 25000,
      description: 'Tournament for junior golfers under 18 years old.',
      organizer: 'Eldoret Junior Golf Academy'
    },
    {
      id: 'T-2023-004',
      name: 'Seniors Tournament',
      date: '2023-10-30',
      course: 'Championship',
      format: 'Stableford',
      status: 'completed',
      participants: 28,
      maxParticipants: 40,
      registrationDeadline: '2023-10-25',
      entryFee: 2000,
      prizePool: 80000,
      description: 'Tournament for members 50 years and above.',
      organizer: 'Eldoret Senior Golfers Association'
    },
    {
      id: 'T-2023-005',
      name: 'Ladies Invitational',
      date: '2023-12-05',
      course: 'Executive',
      format: 'Best Ball',
      status: 'upcoming',
      participants: 10,
      maxParticipants: 24,
      registrationDeadline: '2023-11-30',
      entryFee: 1800,
      prizePool: 45000,
      description: 'Ladies-only tournament with morning tee times.',
      organizer: 'Eldoret Ladies Golf Section'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: TournamentStatus) => {
    const statusMap = {
      upcoming: { label: 'Upcoming', variant: 'default' as const },
      in_progress: { label: 'In Progress', variant: 'secondary' as const },
      completed: { label: 'Completed', variant: 'outline' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getFormatBadge = (format: string) => {
    return <Badge variant="outline" className="text-xs">{format}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments Management</h1>
          <p className="text-muted-foreground">
            Manage all golf tournaments and events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Tournament
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Tournaments</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tournaments..."
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
                <DropdownMenuItem>All Formats</DropdownMenuItem>
                <DropdownMenuItem>Stroke Play</DropdownMenuItem>
                <DropdownMenuItem>Match Play</DropdownMenuItem>
                <DropdownMenuItem>Scramble</DropdownMenuItem>
                <DropdownMenuItem>Best Ball</DropdownMenuItem>
                <DropdownMenuItem>Stableford</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Tournaments</CardTitle>
                  <CardDescription>
                    {tournaments.filter(t => t.status === 'upcoming').length} tournaments scheduled
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Export Schedule
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tournament</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournaments
                    .filter(tournament => tournament.status === 'upcoming')
                    .map((tournament) => (
                      <TableRow key={tournament.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            {tournament.name}
                          </div>
                          {tournament.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {tournament.description}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            {formatDate(tournament.date)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reg. until: {formatDate(tournament.registrationDeadline)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <MapPin className="mr-1 h-3 w-3" />
                            {tournament.course}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getFormatBadge(tournament.format)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {tournament.participants} / {tournament.maxParticipants}
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{
                                  width: `${(tournament.participants / tournament.maxParticipants) * 100}%`
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(tournament.status)}
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
                                Manage Participants
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Award className="mr-2 h-4 w-4" />
                                Set Up Leaderboard
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-amber-600">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Tournament
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

        <TabsContent value="in_progress" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tournaments In Progress</CardTitle>
                  <CardDescription>
                    {tournaments.filter(t => t.status === 'in_progress').length} active tournaments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {tournaments.filter(t => t.status === 'in_progress').length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournaments
                      .filter(tournament => tournament.status === 'in_progress')
                      .map((tournament) => (
                        <TableRow key={tournament.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Trophy className="h-5 w-5 text-amber-500" />
                              {tournament.name}
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(tournament.date)}</TableCell>
                          <TableCell>{tournament.course}</TableCell>
                          <TableCell>{getFormatBadge(tournament.format)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              {tournament.participants}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(tournament.status)}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View Leaderboard
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No tournaments in progress</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check back later or create a new tournament.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
