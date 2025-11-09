import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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

// Using the same Member type as in AdminDashboard
type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: 'Gold' | 'Silver' | 'Bronze';
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  lastActivity: string;
  totalBookings: number;
  totalSpent: number;
};

export default function MembersManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const members: Member[] = [
    {
      id: 'M001',
      name: 'Dr. James Mwangi',
      email: 'james.mwangi@example.com',
      phone: '+254 712 345 678',
      joinDate: '2022-03-15',
      membershipType: 'Gold',
      status: 'Active',
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
      membershipType: 'Silver',
      status: 'Active',
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
      membershipType: 'Bronze',
      status: 'Active',
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
      membershipType: 'Bronze',
      status: 'Pending',
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
      status: 'Inactive',
      lastActivity: '2023-09-15',
      totalBookings: 15,
      totalSpent: 165000,
    },
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleDeleteMember = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteMember = () => {
    if (!selectedMember) return;

    // In a real app, you would make an API call to delete the member
    toast.success(`Member ${selectedMember.name} has been deleted.`);
    setIsDeleteDialogOpen(false);
    setSelectedMember(null);
  };

  const handleEditMember = (memberId: string) => {
    navigate(`/members/edit/${memberId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: Member['status']) => {
    const statusMap = {
      Active: { label: 'Active', variant: 'default' as const },
      Inactive: { label: 'Inactive', variant: 'secondary' as const },
      Suspended: { label: 'Suspended', variant: 'destructive' as const },
      Pending: { label: 'Pending', variant: 'outline' as const },
    };

    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' as const };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getMembershipBadge = (type: Member['membershipType']) => {
    const typeMap = {
      Gold: { label: 'Gold', className: 'bg-amber-500 text-white' },
      Silver: { label: 'Silver', className: 'bg-gray-300 text-gray-800' },
      Bronze: { label: 'Bronze', className: 'bg-blue-100 text-blue-800' },
    };

    const { label, className } = typeMap[type] || { label: type, className: 'bg-gray-100' };
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Members Management</h1>
          <p className="text-muted-foreground">Manage your club members and their details</p>
        </div>
        <Button onClick={() => navigate('/members/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Members</CardTitle>
              <CardDescription>Showing {filteredMembers.length} members</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="pl-8 w-[200px] lg:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
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
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100" />
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">{member.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-sm">{member.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getMembershipBadge(member.membershipType)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(member.status)}
                  </TableCell>
                  <TableCell>{formatDate(member.lastActivity)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(member.totalSpent)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditMember(member.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteMember(member)}>
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Delete
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedMember?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMember}>
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
