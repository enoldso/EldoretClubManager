import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, TrendingUp, Utensils, Trophy, Plus, Search, Filter, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
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

type Booking = {
  id: string;
  member: string;
  date: string;
  time: string;
  course: string;
  players: number;
  caddie: string;
  status: string;
  amount: number;
  payment: string;
  specialRequests: string;
};

type TableAction = {
  icon: 'view' | 'edit' | 'delete';
  label: string;
  onClick: (row: Booking) => void;
  variant?: 'ghost' | 'outline' | 'default' | 'secondary' | 'destructive';
};

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "1,856",
      icon: Users,
      description: "Active memberships",
      trend: { value: 4.2, label: "from last month" },
      change: 'increase' as const
    },
    {
      title: "Today's Bookings",
      value: "47",
      icon: Calendar,
      description: "Tee times scheduled",
      trend: { value: 12, label: "vs yesterday" },
      change: 'increase' as const
    },
    {
      title: "Monthly Revenue",
      value: "KSh 2,845,600",
      icon: DollarSign,
      description: "Current month",
      trend: { value: 8.7, label: "from last month" },
      change: 'increase' as const
    },
    {
      title: "Active Caddies",
      value: "24",
      icon: TrendingUp,
      description: "On duty today",
      trend: { value: 3, label: "available" },
      change: 'neutral' as const
    },
    {
      title: "Dining Covers",
      value: "128",
      icon: 'utensils' as const,
      description: "Today's reservations",
      trend: { value: 15, label: "vs yesterday" },
      change: 'decrease' as const
    },
    {
      title: "Tournaments",
      value: "3",
      icon: 'trophy' as const,
      description: "Upcoming events",
      trend: { value: 1, label: "this week" },
      change: 'increase'
    }
  ];

  const recentBookings = [
    { 
      id: 'BK-2025-1124', 
      member: 'Dr. James Mwangi', 
      date: 'Mar 15, 2025', 
      time: '07:30 AM', 
      course: 'Championship', 
      players: 4,
      caddie: 'John Kipchoge', 
      status: 'Confirmed',
      amount: 12_500,
      payment: 'Paid',
      specialRequests: 'Golf cart requested'
    },
    { 
      id: 'BK-2025-1123', 
      member: 'Sarah Wanjiku', 
      date: 'Mar 15, 2025', 
      time: '08:15 AM', 
      course: 'Executive', 
      players: 2,
      caddie: 'Peter Kimutai', 
      status: 'Confirmed',
      amount: 7_800,
      payment: 'Pending',
      specialRequests: 'Left-handed clubs needed'
    },
    { 
      id: 'BK-2025-1122', 
      member: 'Michael Ochieng', 
      date: 'Mar 15, 2025', 
      time: '09:00 AM', 
      course: 'Championship', 
      players: 1,
      caddie: 'David Korir', 
      status: 'Pending',
      amount: 4_200,
      payment: 'Unpaid',
      specialRequests: 'Early check-in at 8:30 AM'
    },
    { 
      id: 'BK-2025-1121', 
      member: 'Amina Hassan', 
      date: 'Mar 15, 2025', 
      time: '10:30 AM', 
      course: 'Executive', 
      players: 3,
      caddie: 'Grace Wambui', 
      status: 'Confirmed',
      amount: 10_200,
      payment: 'Paid',
      specialRequests: 'Vegetarian lunch for 3'
    },
    { 
      id: 'BK-2025-1120', 
      member: 'Robert Kamau', 
      date: 'Mar 15, 2025', 
      time: '12:00 PM', 
      course: 'Championship', 
      players: 4,
      caddie: 'Brian Kiprop', 
      status: 'Confirmed',
      amount: 15_000,
      payment: 'Paid',
      specialRequests: 'Corporate event - 4 players'
    },
    { 
      id: 'BK-2025-1119', 
      member: 'Elizabeth Wangui', 
      date: 'Mar 15, 2025', 
      time: '02:30 PM', 
      course: 'Executive', 
      players: 2,
      caddie: 'Esther Muthoni', 
      status: 'Cancelled',
      amount: 8_000,
      payment: 'Refunded',
      specialRequests: 'Cancelled due to rain'
    }
  ];

  const columns = [
    {
      accessorKey: 'id',
      header: 'Booking ID',
    },
    {
      accessorKey: 'member',
      header: 'Member',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'time',
      header: 'Time',
    },
    {
      accessorKey: 'course',
      header: 'Course',
      cell: ({ row }: { row: { original: Booking } }) => (
        <Badge variant={row.original.course === 'Championship' ? 'default' : 'secondary'}>
          {row.original.course}
        </Badge>
      ),
    },
    {
      accessorKey: 'players',
      header: 'Players',
    },
    {
      accessorKey: 'caddie',
      header: 'Caddie',
    },
    {
      accessorKey: 'payment',
      header: 'Payment',
      cell: ({ row }: { row: { original: Booking } }) => {
        const payment = row.original.payment;
        const variant = {
          'Paid': 'default',
          'Pending': 'secondary',
          'Unpaid': 'destructive',
          'Refunded': 'outline'
        }[payment] || 'secondary';
        
        return <Badge variant={variant as any}>{payment}</Badge>;
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: { original: Booking } }) => {
        const status = row.original.status;
        const variant = {
          'Confirmed': 'default',
          'Pending': 'secondary',
          'Cancelled': 'destructive',
          'Completed': 'outline'
        }[status] || 'secondary';
        
        return <Badge variant={variant as any}>{status}</Badge>;
      },
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: Eye,
      onClick: (row: Booking) => console.log('View:', row)
    },
    {
      label: 'Edit',
      icon: Pencil,
      onClick: (row: Booking) => console.log('Edit:', row)
    },
    {
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive' as const,
      onClick: (row: Booking) => console.log('Delete:', row)
    }
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your club today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.trend.value > 0 ? '+' : ''}{stat.trend.value}% {stat.trend.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Today's Tee Times</CardTitle>
            <CardDescription>
              {recentBookings.length} bookings scheduled for {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bookings..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="h-10">
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.accessorKey as string}>
                      {column.header}
                    </TableHead>
                  ))}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    {columns.map((column) => (
                      <TableCell key={`${booking.id}-${column.accessorKey as string}`}>
                        {column.cell ? (
                          column.cell({ row: { original: booking } })
                        ) : (
                          booking[column.accessorKey as keyof Booking] as string
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions.map((action) => {
                            const Icon = action.icon;
                            return (
                              <DropdownMenuItem
                                key={action.label}
                                onSelect={() => action.onClick(booking)}
                                className={action.variant === 'destructive' ? 'text-destructive' : ''}
                              >
                                <Icon className="mr-2 h-4 w-4" />
                                {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>New Booking</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Users className="h-6 w-6" />
              <span>Add Member</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Process Payment</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Manage Staff</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, user: 'Admin', action: 'added a new member', time: '2 minutes ago' },
              { id: 2, user: 'System', action: 'sent payment reminder to 5 members', time: '15 minutes ago' },
              { id: 3, user: 'John Doe', action: 'booked a tee time for tomorrow', time: '1 hour ago' },
              { id: 4, user: 'System', action: 'generated monthly revenue report', time: '3 hours ago' },
              { id: 5, user: 'Sarah K.', action: 'updated inventory', time: '5 hours ago' },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item.user[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="font-semibold">{item.user}</span> {item.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
