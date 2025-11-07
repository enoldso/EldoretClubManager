import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Utensils, Clock, Users, Calendar, CheckCircle, XCircle, Clock3 } from "lucide-react";
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

  // Dummy data for menu items
  const menuItems: MenuItem[] = [
    {
      id: 'M001',
      name: 'Caesar Salad',
      category: 'appetizer',
      price: 1200,
      isAvailable: true,
      description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan'
    },
    {
      id: 'M002',
      name: 'Grilled Salmon',
      category: 'main',
      price: 2800,
      isAvailable: true,
      description: 'Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables'
    },
    {
      id: 'M003',
      name: 'Chocolate Lava Cake',
      category: 'dessert',
      price: 900,
      isAvailable: true,
      description: 'Warm chocolate cake with a molten center, served with vanilla ice cream'
    },
    {
      id: 'M004',
      name: 'Mojito',
      category: 'beverage',
      price: 800,
      isAvailable: true,
      description: 'Classic mojito with fresh mint, lime, and white rum'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dining Management</h1>
          <p className="text-muted-foreground">
            Manage restaurant reservations, menu, and operating hours
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Reservation
        </Button>
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
