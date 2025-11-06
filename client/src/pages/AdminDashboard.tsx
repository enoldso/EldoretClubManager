import DashboardStats from "@/components/DashboardStats";
import DataTable from "@/components/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, TrendingUp, Utensils, Trophy, Eye, Pencil, Trash2 } from "lucide-react";
import type { ColumnDef } from "@/components/DataTable";

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

  const tableColumns = [
    { 
      key: 'id', 
      label: 'Booking ID',
      render: (value: string, row: Booking) => (
        <span className="font-medium">{value}</span>
      )
    },
    { 
      key: 'member', 
      label: 'Member',
      render: (value: string) => <span className="font-medium">{value}</span>
    },
    { 
      key: 'date', 
      label: 'Date/Time',
      render: (value: string, row: Booking) => (
        <div className="flex flex-col">
          <span>{value}</span>
          <span className="text-sm text-muted-foreground">{row.time}</span>
        </div>
      )
    },
    { 
      key: 'course', 
      label: 'Course',
      render: (value: string) => (
        <Badge variant={value === 'Championship' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { 
      key: 'players', 
      label: 'Players',
      render: (value: number) => <span className="text-center">{value}</span>
    },
    { 
      key: 'caddie', 
      label: 'Caddie',
      render: (value: string) => <span className="hidden md:inline">{value}</span>
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (value: string) => {
        const variants = {
          'Paid': 'default',
          'Pending': 'secondary',
          'Unpaid': 'destructive',
          'Refunded': 'outline'
        } as const;
        const payment = value as keyof typeof variants;
        return (
          <Badge variant={variants[payment] || 'secondary'}>
            {payment}
          </Badge>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const variants = {
          'Confirmed': 'default',
          'Pending': 'secondary',
          'Cancelled': 'destructive',
          'Completed': 'outline'
        } as const;
        const status = value as keyof typeof variants;
        return (
          <Badge variant={variants[status] || 'secondary'}>
            {status}
          </Badge>
        );
      }
    }
  ];

  const tableActions = [
    { 
      icon: 'view' as const, 
      label: 'View Details', 
      onClick: (row: Booking) => console.log('View:', row),
      variant: 'ghost' as const
    },
    { 
      icon: 'edit' as const, 
      label: 'Modify Booking', 
      onClick: (row: Booking) => console.log('Edit:', row),
      variant: 'outline' as const
    },
    { 
      icon: 'delete' as const, 
      label: 'Cancel Booking', 
      onClick: (row: Booking) => console.log('Delete:', row),
      variant: 'destructive' as const
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your club today.
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Tee Times</CardTitle>
            <CardDescription>
              {recentBookings.length} bookings scheduled for {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              title="Today's Tee Times"
              description={`Showing ${Math.min(5, recentBookings.length)} of ${recentBookings.length} bookings`}
              columns={tableColumns}
              data={recentBookings}
              actions={tableActions}
            />
          </CardContent>
        </Card>
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
            <CardHeader className="pb-2">
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
    </>
  );
}
