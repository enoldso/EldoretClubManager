import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Utensils, Clock, Users, Calendar, CheckCircle, XCircle, Clock3, TrendingUp, BarChart2, PieChart, Clock as ClockIcon, DollarSign, Utensils as UtensilsIcon, GlassWater } from "lucide-react";
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

type ReservationStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

type Reservation = {
  id: string;
  member: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: ReservationStatus;
  specialRequests: string;
  contactNumber: string;
};

type MenuItem = {
  id: string;
  name: string;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  price: number;
  isAvailable: boolean;
  description: string;
  salesCount?: number;
  revenue?: number;
};

const DiningManagement = () => {
  // Dummy data for reservations
  const reservations: Reservation[] = [
    {
      id: 'RES-001',
      member: 'John Doe',
      date: '2025-11-15',
      time: '19:00',
      guests: 4,
      table: 'Window 3',
      status: 'confirmed',
      specialRequests: 'Birthday celebration, please prepare a cake',
      contactNumber: '+254712345678'
    },
    {
      id: 'RES-002',
      member: 'Jane Smith',
      date: '2025-11-15',
      time: '20:30',
      guests: 2,
      table: 'Patio 5',
      status: 'pending',
      specialRequests: 'Vegetarian meal required',
      contactNumber: '+254723456789'
    },
    {
      id: 'RES-003',
      member: 'Robert Johnson',
      date: '2025-11-16',
      time: '12:30',
      guests: 6,
      table: 'Private Room 1',
      status: 'confirmed',
      specialRequests: 'Business lunch meeting',
      contactNumber: '+254734567890'
    },
  ];

  // Dummy data for menu items with sales data
  const menuItems: MenuItem[] = [
    {
      id: 'M001',
      name: 'Caesar Salad',
      category: 'appetizer',
      price: 1200,
      isAvailable: true,
      description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
      salesCount: 45,
      revenue: 54000
    },
    {
      id: 'M002',
      name: 'Grilled Salmon',
      category: 'main',
      price: 2800,
      isAvailable: true,
      description: 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables',
      salesCount: 78,
      revenue: 218400
    },
    {
      id: 'M003',
      name: 'Chocolate Lava Cake',
      category: 'dessert',
      price: 900,
      isAvailable: true,
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
      salesCount: 92,
      revenue: 82800
    },
    {
      id: 'M004',
      name: 'Mojito',
      category: 'beverage',
      price: 800,
      isAvailable: true,
      description: 'Classic mojito with fresh mint, lime, and white rum',
      salesCount: 156,
      revenue: 124800
    },
  ];

  // Dummy data for operating hours
  const operatingHours = [
    { day: 'Monday - Friday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 11:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
  ];

  const getStatusBadge = (status: ReservationStatus) => {
    const statusMap = {
      confirmed: { label: 'Confirmed', variant: 'default' as const },
      pending: { label: 'Pending', variant: 'secondary' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const },
      completed: { label: 'Completed', variant: 'outline' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const categoryMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'outline' }> = {
      appetizer: { label: 'Appetizer', variant: 'default' },
      main: { label: 'Main Course', variant: 'secondary' },
      dessert: { label: 'Dessert', variant: 'outline' },
      beverage: { label: 'Beverage', variant: 'default' },
    };
    
    const { label, variant } = categoryMap[category] || { label: category, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  // Calculate statistics
  const topSellingItems = [...menuItems]
    .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
    .slice(0, 5);

  const salesByCategory = menuItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + (item.salesCount || 0);
    return acc;
  }, {} as Record<string, number>);

  const totalRevenue = menuItems.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const averageOrderValue = totalRevenue / menuItems.reduce((sum, item) => sum + (item.salesCount || 0), 1);

  // Popular time slots data
  const popularTimeSlots = [
    { time: '12:00 PM - 2:00 PM', percentage: 45 },
    { time: '7:00 PM - 9:00 PM', percentage: 35 },
    { time: '2:00 PM - 4:00 PM', percentage: 15 },
    { time: 'Other', percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dining Management</h1>
        <p className="text-muted-foreground">
          Manage restaurant reservations, menu, and operating hours
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KES {totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <Utensils className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              KES {Math.round(averageOrderValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <PieChart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {Object.entries(salesByCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Most ordered category
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12PM - 2PM</div>
            <p className="text-xs text-muted-foreground">
              Busiest time of day
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Selling Items
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Most popular menu items by sales volume
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSellingItems.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <div className="w-8 text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </div>
                <div className="ml-4 space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.salesCount} orders • KES {item.revenue?.toLocaleString()}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(salesByCategory).map(([category, count]) => (
                <div key={category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    <span className="font-medium">{count} orders</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ 
                        width: `${(count / Math.max(...Object.values(salesByCategory))) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              Popular Time Slots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularTimeSlots.map((slot) => (
                <div key={slot.time} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>{slot.time}</span>
                    <span className="font-medium">{slot.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${slot.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reservations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reservations">
            <Calendar className="mr-2 h-4 w-4" />
            Reservations
          </TabsTrigger>
          <TabsTrigger value="menu">
            <Utensils className="mr-2 h-4 w-4" />
            Menu Management
          </TabsTrigger>
          <TabsTrigger value="hours">
            <Clock3 className="mr-2 h-4 w-4" />
            Operating Hours
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Reservations</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View and manage restaurant reservations
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search reservations..."
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
                    <TableHead>Reservation ID</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">{reservation.id}</TableCell>
                      <TableCell>{reservation.member}</TableCell>
                      <TableCell>
                        <div className="font-medium">{reservation.date}</div>
                        <div className="text-sm text-muted-foreground">{reservation.time}</div>
                      </TableCell>
                      <TableCell>{reservation.guests}</TableCell>
                      <TableCell>{reservation.table}</TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-sm">{reservation.contactNumber}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Cancel Reservation
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

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Menu Management</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage restaurant menu items and availability
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Menu Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>KSh {item.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {item.isAvailable ? (
                          <Badge variant="default">Available</Badge>
                        ) : (
                          <Badge variant="outline">Unavailable</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.description}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Item</DropdownMenuItem>
                            <DropdownMenuItem>
                              {item.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete Item
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

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
              <p className="text-sm text-muted-foreground">
                Set the restaurant's operating hours
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {operatingHours.map((day, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="font-medium">{day.day}</div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{day.hours}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Special Hours
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiningManagement;
