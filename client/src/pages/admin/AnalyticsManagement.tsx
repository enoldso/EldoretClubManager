import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, Users, DollarSign, Clock, Calendar, ArrowUpDown, Download, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Types
type TimeRange = '7d' | '30d' | '90d' | '12m' | 'custom';
type MetricType = 'revenue' | 'users' | 'bookings' | 'conversion';

// Dummy data generation functions
const generateTimeSeriesData = (days: number, min: number, max: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1) + i);
    return {
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    };
  });
};

const generateRevenueData = (days: number) => {
  return generateTimeSeriesData(days, 50000, 250000);
};

const generateUserData = (days: number) => {
  return generateTimeSeriesData(days, 5, 50);
};

const generateBookingData = (days: number) => {
  return generateTimeSeriesData(days, 10, 100);
};

// Dummy data
const revenueData = generateRevenueData(30);
const userData = generateUserData(30);
const bookingData = generateBookingData(30);

// Calculate metrics
const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
const totalUsers = userData.reduce((sum, item) => sum + item.value, 0);
const totalBookings = bookingData.reduce((sum, item) => sum + item.value, 0);
const conversionRate = ((totalBookings / totalUsers) * 100).toFixed(1);

// Top members by spending
const topMembers = [
  { id: 1, name: 'John Mwangi', email: 'john.mwangi@example.com', amount: 125000, change: 12.5 },
  { id: 2, name: 'Sarah Ochieng', email: 'sarah.ochieng@example.com', amount: 98750, change: 8.2 },
  { id: 3, name: 'David Kamau', email: 'david.kamau@example.com', amount: 87650, change: -3.4 },
  { id: 4, name: 'Grace Wambui', email: 'grace.wambui@example.com', amount: 76500, change: 5.7 },
  { id: 5, name: 'Peter Kipchoge', email: 'peter.kipchoge@example.com', amount: 69800, change: 15.2 },
];

// Revenue by category
const revenueByCategory = [
  { category: 'Memberships', value: 650000, percentage: 45 },
  { category: 'Green Fees', value: 350000, percentage: 24 },
  { category: 'Pro Shop', value: 250000, percentage: 17 },
  { category: 'Food & Beverage', value: 150000, percentage: 10 },
  { category: 'Other', value: 50000, percentage: 4 },
];

// Recent transactions
const recentTransactions = [
  { id: 'TXN-001', customer: 'John Mwangi', type: 'Membership Renewal', amount: 25000, status: 'completed', date: '2023-11-15' },
  { id: 'TXN-002', customer: 'Sarah Ochieng', type: 'Green Fee', amount: 3500, status: 'completed', date: '2023-11-15' },
  { id: 'TXN-003', customer: 'David Kamau', type: 'Pro Shop', amount: 12500, status: 'pending', date: '2023-11-14' },
  { id: 'TXN-004', customer: 'Grace Wambui', type: 'Food & Beverage', amount: 4500, status: 'completed', date: '2023-11-14' },
  { id: 'TXN-005', customer: 'Peter Kipchoge', type: 'Golf Cart Rental', amount: 3000, status: 'failed', date: '2023-11-13' },
];

// Helper functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }> = {
    completed: { label: 'Completed', variant: 'success' },
    pending: { label: 'Pending', variant: 'secondary' },
    failed: { label: 'Failed', variant: 'destructive' },
  };
  
  const { label, variant } = statusMap[status] || { label: status, variant: 'outline' };
  return <Badge variant={variant as any} className="capitalize">{label}</Badge>;
};

// Main component
const AnalyticsManagement = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [activeMetric, setActiveMetric] = useState<MetricType>('revenue');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze your club's performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <Calendar className="mr-2 h-4 w-4" />
                {timeRange === '7d' ? 'Last 7 days' : 
                 timeRange === '30d' ? 'Last 30 days' : 
                 timeRange === '90d' ? 'Last 90 days' : 
                 timeRange === '12m' ? 'Last 12 months' : 'Custom range'}
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange('7d')}>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('30d')}>Last 30 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('90d')}>Last 90 days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('12m')}>Last 12 months</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('custom')}>Custom range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalUsers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>8.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalBookings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>5.7% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>2.3% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Revenue trends over time</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={activeMetric === 'revenue' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMetric('revenue')}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Revenue
                </Button>
                <Button
                  variant={activeMetric === 'users' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMetric('users')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Button>
                <Button
                  variant={activeMetric === 'bookings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveMetric('bookings')}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Bookings
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-center p-6">
                <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Revenue Trend</h3>
                <p className="text-sm text-muted-foreground">
                  {activeMetric === 'revenue' && 'Total revenue over time'}
                  {activeMetric === 'users' && 'New users over time'}
                  {activeMetric === 'bookings' && 'Booking volume over time'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Category */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Breakdown of revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.percentage}% of total revenue
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Top Members */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Members</CardTitle>
                <CardDescription>Highest spending members</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Amount Spent</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(member.amount)}</TableCell>
                    <TableCell className="text-right">
                      <div className={`flex items-center justify-end ${member.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {member.change >= 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {Math.abs(member.change)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentTransactions.map((txn) => (
                <div key={txn.id} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mr-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{txn.type}</p>
                      <p className="text-sm font-medium">{formatCurrency(txn.amount)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{txn.customer}</p>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-2">{formatDate(txn.date)}</span>
                        {getStatusBadge(txn.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsManagement;
