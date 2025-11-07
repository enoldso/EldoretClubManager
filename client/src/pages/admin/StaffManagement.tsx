import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, User, UserPlus, Mail, Phone, Calendar, BadgeDollarSign, Star, Clock, CheckCircle, XCircle, Edit, Trash2, UserCheck, UserX, UserCog, UserPlus2, UserMinus, ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StaffRole = 'manager' | 'pro' | 'starter' | 'marshal' | 'reception' | 'maintenance' | 'other';
type CaddieStatus = 'available' | 'on_round' | 'on_break' | 'off_duty';

interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: StaffRole;
  hireDate: string;
  isActive: boolean;
  department: string;
  position: string;
  photo?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

interface Caddie extends StaffMember {
  status: CaddieStatus;
  rating: number;
  hireDate: string;
  roundsCompleted: number;
  hourlyRate: number;
  isCertified: boolean;
  certifications?: string[];
  languages: string[];
  notes?: string;
}

const StaffManagement = () => {
  // Dummy data for staff members
  const staffMembers: StaffMember[] = [
    {
      id: 'STF-001',
      firstName: 'John',
      lastName: 'Mwangi',
      email: 'john.mwangi@eldoretgolfclub.com',
      phone: '+254712345678',
      role: 'manager',
      hireDate: '2020-05-15',
      isActive: true,
      department: 'Management',
      position: 'Golf Operations Manager',
      photo: '/avatars/john-mwangi.jpg',
      emergencyContact: {
        name: 'Mary Mwangi',
        relationship: 'Spouse',
        phone: '+254723456789'
      }
    },
    {
      id: 'STF-002',
      firstName: 'Sarah',
      lastName: 'Ochieng',
      email: 'sarah.ochieng@eldoretgolfclub.com',
      phone: '+254712345679',
      role: 'pro',
      hireDate: '2021-03-22',
      isActive: true,
      department: 'Golf Operations',
      position: 'Head Golf Professional',
      photo: '/avatars/sarah-ochieng.jpg'
    },
    {
      id: 'STF-003',
      firstName: 'David',
      lastName: 'Kamau',
      email: 'david.kamau@eldoretgolfclub.com',
      phone: '+254712345680',
      role: 'starter',
      hireDate: '2022-01-10',
      isActive: true,
      department: 'Golf Operations',
      position: 'Starter/Marshal',
      photo: '/avatars/david-kamau.jpg'
    },
    {
      id: 'STF-004',
      firstName: 'Grace',
      lastName: 'Wambui',
      email: 'grace.wambui@eldoretgolfclub.com',
      phone: '+254712345681',
      role: 'reception',
      hireDate: '2021-07-15',
      isActive: true,
      department: 'Administration',
      position: 'Front Desk Receptionist',
      photo: '/avatars/grace-wambui.jpg'
    },
    {
      id: 'STF-005',
      firstName: 'Peter',
      lastName: 'Kipchoge',
      email: 'peter.kipchoge@eldoretgolfclub.com',
      phone: '+254712345682',
      role: 'maintenance',
      hireDate: '2020-11-05',
      isActive: true,
      department: 'Maintenance',
      position: 'Grounds Superintendent',
      photo: '/avatars/peter-kipchoge.jpg'
    }
  ];

  // Dummy data for caddies
  const caddies: Caddie[] = [
    {
      id: 'CAD-001',
      firstName: 'Joseph',
      lastName: 'Omondi',
      email: 'joseph.omondi@eldoretgolfclub.com',
      phone: '+254712345690',
      role: 'other',
      hireDate: '2019-08-12',
      isActive: true,
      department: 'Caddie Services',
      position: 'Senior Caddie',
      photo: '/avatars/joseph-omondi.jpg',
      status: 'available',
      rating: 4.8,
      roundsCompleted: 245,
      hourlyRate: 800,
      isCertified: true,
      certifications: ['PGA Caddie Certification', 'First Aid Certified'],
      languages: ['English', 'Swahili', 'Kalenjin'],
      notes: 'Excellent with beginners and experienced players alike.'
    },
    {
      id: 'CAD-002',
      firstName: 'Esther',
      lastName: 'Achieng',
      email: 'esther.achieng@eldoretgolfclub.com',
      phone: '+254712345691',
      role: 'other',
      hireDate: '2020-02-20',
      isActive: true,
      department: 'Caddie Services',
      position: 'Caddie',
      photo: '/avatars/esther-achieng.jpg',
      status: 'on_round',
      rating: 4.6,
      roundsCompleted: 187,
      hourlyRate: 700,
      isCertified: true,
      certifications: ['First Aid Certified'],
      languages: ['English', 'Swahili', 'Luo'],
      notes: 'Great with junior golfers.'
    },
    {
      id: 'CAD-003',
      firstName: 'Samuel',
      lastName: 'Gitau',
      email: 'samuel.gitau@eldoretgolfclub.com',
      phone: '+254712345692',
      role: 'other',
      hireDate: '2021-05-15',
      isActive: true,
      department: 'Caddie Services',
      position: 'Caddie',
      photo: '/avatars/samuel-gitau.jpg',
      status: 'available',
      rating: 4.4,
      roundsCompleted: 92,
      hourlyRate: 650,
      isCertified: false,
      languages: ['English', 'Swahili', 'Kikuyu'],
      notes: 'Fast learner, improving quickly.'
    },
    {
      id: 'CAD-004',
      firstName: 'Mercy',
      lastName: 'Wanjiru',
      email: 'mercy.wanjiru@eldoretgolfclub.com',
      phone: '+254712345693',
      role: 'other',
      hireDate: '2022-01-10',
      isActive: true,
      department: 'Caddie Services',
      position: 'Caddie in Training',
      photo: '/avatars/mercy-wanjiru.jpg',
      status: 'on_break',
      rating: 4.2,
      roundsCompleted: 45,
      hourlyRate: 500,
      isCertified: false,
      languages: ['English', 'Swahili', 'Kikuyu'],
      notes: 'New but very enthusiastic.'
    },
    {
      id: 'CAD-005',
      firstName: 'Paul',
      lastName: 'Onyango',
      email: 'paul.onyango@eldoretgolfclub.com',
      phone: '+254712345694',
      role: 'other',
      hireDate: '2018-11-30',
      isActive: false,
      department: 'Caddie Services',
      position: 'Senior Caddie',
      photo: '/avatars/paul-onyango.jpg',
      status: 'off_duty',
      rating: 4.9,
      roundsCompleted: 320,
      hourlyRate: 900,
      isCertified: true,
      certifications: ['PGA Caddie Certification', 'First Aid Certified', 'Rules Official'],
      languages: ['English', 'Swahili', 'Luo', 'Kisii'],
      notes: 'On leave until March 2025.'
    }
  ];

  // Helper functions
  const getRoleBadge = (role: string) => {
    const roleMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      manager: { label: 'Manager', variant: 'default' },
      pro: { label: 'Golf Pro', variant: 'secondary' },
      starter: { label: 'Starter/Marshal', variant: 'outline' },
      marshal: { label: 'Marshal', variant: 'outline' },
      reception: { label: 'Reception', variant: 'secondary' },
      maintenance: { label: 'Maintenance', variant: 'secondary' },
      other: { label: 'Other', variant: 'outline' },
    };
    
    const { label, variant } = roleMap[role] || { label: role, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      available: { label: 'Available', variant: 'default' },
      on_round: { label: 'On Round', variant: 'secondary' },
      on_break: { label: 'On Break', variant: 'outline' },
      off_duty: { label: 'Off Duty', variant: 'destructive' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative h-4 w-4">
            <Star className="absolute h-4 w-4 text-gray-200" />
            <div className="absolute left-0 top-0 h-4 w-2 overflow-hidden">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-200" />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff members and caddies
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <UserPlus2 className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Caddie
          </Button>
        </div>
      </div>

      <Tabs defaultValue="staff-members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff-members">
            <UserCog className="mr-2 h-4 w-4" />
            Staff Members
          </TabsTrigger>
          <TabsTrigger value="caddies">
            <User className="mr-2 h-4 w-4" />
            Caddies
          </TabsTrigger>
          <TabsTrigger value="schedules">
            <Calendar className="mr-2 h-4 w-4" />
            Schedules
          </TabsTrigger>
        </TabsList>

        {/* Staff Members Tab */}
        <TabsContent value="staff-members" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Staff Members</CardTitle>
                <CardDescription>
                  Manage all staff members and their details
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search staff..."
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
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffMembers.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={staff.photo} alt={`${staff.firstName} ${staff.lastName}`} />
                            <AvatarFallback>{staff.firstName[0]}{staff.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{staff.firstName} {staff.lastName}</div>
                            <div className="text-xs text-muted-foreground">ID: {staff.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{staff.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{staff.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{getRoleBadge(staff.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {staff.isActive ? (
                            <>
                              <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <div className="mr-2 h-2 w-2 rounded-full bg-gray-400" />
                              <span>Inactive</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {staff.isActive ? (
                              <DropdownMenuItem className="text-amber-600">
                                <UserMinus className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
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

        {/* Caddies Tab */}
        <TabsContent value="caddies" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Caddies</CardTitle>
                <CardDescription>
                  Manage caddies and their availability
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search caddies..."
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
                    <TableHead>Caddie</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rounds</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Certified</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caddies.map((caddie) => (
                    <TableRow key={caddie.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={caddie.photo} alt={`${caddie.firstName} ${caddie.lastName}`} />
                            <AvatarFallback>{caddie.firstName[0]}{caddie.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{caddie.firstName} {caddie.lastName}</div>
                            <div className="text-xs text-muted-foreground">{caddie.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRatingStars(caddie.rating)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(caddie.status)}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{caddie.roundsCompleted}</div>
                        <div className="text-xs text-muted-foreground">
                          since {new Date(caddie.hireDate).getFullYear()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <BadgeDollarSign className="mr-1 h-4 w-4 text-green-600" />
                          <span>KSh {caddie.hourlyRate}/hr</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {caddie.isCertified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              Rate & Review
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {caddie.isActive ? (
                              <DropdownMenuItem className="text-amber-600">
                                <UserMinus className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
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

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Schedules</CardTitle>
              <CardDescription>
                View and manage staff and caddie schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Weekly Schedule</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Prev Week
                    </Button>
                    <div className="text-sm font-medium">
                      November 7 - 13, 2025
                    </div>
                    <Button variant="outline" size="sm">
                      Next Week
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Monday</CardTitle>
                      <CardDescription>November 7, 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-2">
                          <div className="font-medium">Morning Shift</div>
                          <div className="text-sm text-muted-foreground">6:00 AM - 2:00 PM</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">John Mwangi</span>
                            <Badge variant="outline">Manager</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Sarah Ochieng</span>
                            <Badge variant="outline">Golf Pro</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tuesday</CardTitle>
                      <CardDescription>November 8, 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-2">
                          <div className="font-medium">Morning Shift</div>
                          <div className="text-sm text-muted-foreground">6:00 AM - 2:00 PM</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Grace Wambui</span>
                            <Badge variant="outline">Reception</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">David Kamau</span>
                            <Badge variant="outline">Starter</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Wednesday</CardTitle>
                          <CardDescription>November 9, 2025</CardDescription>
                        </div>
                        <Badge variant="secondary">Tournament Day</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-muted p-2">
                          <div className="font-medium">All Day</div>
                          <div className="text-sm text-muted-foreground">6:00 AM - 6:00 PM</div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">All Staff</span>
                            <Badge variant="outline">Required</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">All Caddies</span>
                            <Badge variant="outline">Required</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Shift
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

export default StaffManagement;
