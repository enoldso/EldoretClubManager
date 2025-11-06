import DashboardStats from "@/components/DashboardStats";
import DataTable from "@/components/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "1,247",
      icon: Users,
      description: "Active memberships",
      trend: { value: 12, label: "from last month" }
    },
    {
      title: "Today's Bookings",
      value: "32",
      icon: Calendar,
      description: "Tee times scheduled",
      trend: { value: 8, label: "vs yesterday" }
    },
    {
      title: "Monthly Revenue",
      value: "$48,392",
      icon: DollarSign,
      description: "Current month",
      trend: { value: 15, label: "from last month" }
    },
    {
      title: "Active Caddies",
      value: "18",
      icon: TrendingUp,
      description: "On duty today"
    }
  ];

  const recentBookings = [
    { id: 'BK-101', member: 'John Doe', date: 'Mar 15, 2025', time: '09:00 AM', caddie: 'James Kipchoge', status: 'Confirmed' },
    { id: 'BK-102', member: 'Jane Smith', date: 'Mar 15, 2025', time: '10:00 AM', caddie: 'Peter Kimutai', status: 'Pending' },
    { id: 'BK-103', member: 'Bob Wilson', date: 'Mar 15, 2025', time: '11:00 AM', caddie: 'Michael Ruto', status: 'Confirmed' },
    { id: 'BK-104', member: 'Alice Brown', date: 'Mar 15, 2025', time: '02:00 PM', caddie: 'David Korir', status: 'Confirmed' }
  ];

  const columns = [
    { key: 'id', label: 'Booking ID' },
    { key: 'member', label: 'Member' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'caddie', label: 'Caddie' },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => {
        const variants: Record<string, any> = {
          Confirmed: 'default',
          Pending: 'secondary',
          Cancelled: 'destructive'
        };
        return <Badge variant={variants[value]}>{value}</Badge>;
      }
    }
  ];

  const actions = [
    { icon: 'view' as const, label: 'View', onClick: (row: any) => console.log('View:', row) },
    { icon: 'edit' as const, label: 'Edit', onClick: (row: any) => console.log('Edit:', row) }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-admin-title">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Manage Eldoret Club operations</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart visualization would appear here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
            <CardDescription>New member registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart visualization would appear here
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        title="Today's Bookings"
        description="Tee time reservations for today"
        columns={columns}
        data={recentBookings}
        actions={actions}
      />
    </div>
  );
}
