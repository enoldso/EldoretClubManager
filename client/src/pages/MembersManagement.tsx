import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone, User, Calendar, BadgeCheck, AlertCircle } from "lucide-react";
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

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: 'Gold' | 'Silver' | 'Platinum' | 'Basic';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastActivity: string;
  totalBookings: number;
  totalSpent: number;
};

export default function MembersManagement() {
  // Dummy data for members
  const members: Member[] = [
    {
      id: 'M001',
      name: 'Dr. James Mwangi',
      email: 'james.mwangi@example.com',
      phone: '+254 712 345 678',
      joinDate: '2022-03-15',
      membershipType: 'Platinum',
      status: 'active',
      lastActivity: '2023-11-06',
      totalBookings: 24,
      totalSpent: 245000,
    },
    {
      id: 'M002',
      name: 'Sarah Wanjiku',
      email: 'sarah.w@example.com',
      phone: '+254 723 456 789',
      joinDate: '2023-01-10',
      membershipType: 'Gold',
      status: 'active',
      lastActivity: '2023-11-05',
      totalBookings: 12,
      totalSpent: 125000,
    },
    {
      id: 'M003',
      name: 'Michael Ochieng',
      email: 'm.ochieng@example.com',
      phone: '+254 734 567 890',
      joinDate: '2023-06-22',
      membershipType: 'Silver',
      status: 'active',
      lastActivity: '2023-11-02',
      totalBookings: 8,
      totalSpent: 78000,
    },
    {
      id: 'M004',
      name: 'Amina Hassan',
      email: 'a.hassan@example.com',
      phone: '+254 745 678 901',
      joinDate: '2023-09-05',
      membershipType: 'Basic',
      status: 'pending',
      lastActivity: '2023-10-28',
      totalBookings: 2,
      totalSpent: 15000,
    },
    {
      id: 'M005',
      name: 'Robert Kamau',
      email: 'r.kamau@example.com',
      phone: '+254 756 789 012',
      joinDate: '2022-11-18',
      membershipType: 'Gold',
      status: 'inactive',
      lastActivity: '2023-09-15',
      totalBookings: 15,
      totalSpent: 165000,
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: Member['status']) => {
    const statusMap = {
      active: { label: 'Active', variant: 'default' as const },
      inactive: { label: 'Inactive', variant: 'secondary' as const },
      suspended: { label: 'Suspended', variant: 'destructive' as const },
      pending: { label: 'Pending', variant: 'outline' as const },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getMembershipBadge = (type: Member['membershipType']) => {
    const typeMap = {
      Platinum: { label: 'Platinum', className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' },
      Gold: { label: 'Gold', className: 'bg-amber-500 text-white' },
      Silver: { label: 'Silver', className: 'bg-gray-300 text-gray-800' },
      Basic: { label: 'Basic', className: 'bg-blue-100 text-blue-800' },
    };
    
    const { label, className } = typeMap[type] || { label: type, className: 'bg-gray-100' };
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members Management</h1>
          <p className="text-muted-foreground">
            Manage all club members and their memberships
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Member
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>All Members</DropdownMenuItem>
                  <DropdownMenuItem>Active</DropdownMenuItem>
                  <DropdownMenuItem>Inactive</DropdownMenuItem>
                  <DropdownMenuItem>Suspended</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export to CSV</DropdownMenuItem>
                  <DropdownMenuItem>Print List</DropdownMenuItem>
                  <DropdownMenuItem>Send Email to All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Member ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Joined {formatDate(member.joinDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {member.phone}
                    </div>
                  </TableCell>
                  <TableCell>{getMembershipBadge(member.membershipType)}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {formatDate(member.lastActivity)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {member.totalBookings} bookings
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(member.totalSpent)}
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
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Suspend Account
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
    </div>
  );
}
