import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';

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

  // Sample data - replace with API call in production
  const members: Member[] = [
    {
      id: 'M001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      joinDate: '2023-01-15',
      membershipType: 'Gold',
      status: 'Active',
      lastActivity: '2023-11-10',
      totalBookings: 12,
      totalSpent: 120000,
    },
    // Add more sample members as needed
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
    navigate(`/admin/members/edit/${memberId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PP');
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
      Bronze: { label: 'Bronze', className: 'bg-yellow-700 text-white' },
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
        <Button onClick={() => navigate('/admin/members/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4">
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
                <TableHead className="w-[100px]">ID</TableHead>
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
                  <TableCell className="font-medium">{member.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{member.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getMembershipBadge(member.membershipType)}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell>{formatDate(member.lastActivity)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(member.totalSpent)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditMember(member.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteMember(member)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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