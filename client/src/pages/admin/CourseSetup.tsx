import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreHorizontal, MapPin, Flag, Clock, Calendar, Settings2, Trash2, Edit, ArrowUpDown, CheckCircle2, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
import { format } from "date-fns";

type CourseStatus = 'open' | 'closed' | 'maintenance' | 'tournament';
type TeeTimeInterval = 5 | 10 | 15 | 20 | 30 | 60;

type Course = {
  id: string;
  name: string;
  holes: number;
  par: number;
  yardage: number;
  slope: number;
  rating: number;
  status: CourseStatus;
  isActive: boolean;
  lastUpdated: string;
  updatedBy: string;
};

type Hole = {
  id: string;
  number: number;
  par: number;
  handicap: number;
  yards: number;
  description: string;
  courseId: string;
};

type TeeTimeSetting = {
  id: string;
  courseId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  interval: TeeTimeInterval;
  isActive: boolean;
};

type MaintenanceSchedule = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
};

const CourseSetup = () => {
  // Dummy data for courses
  const courses: Course[] = [
    {
      id: 'C-001',
      name: 'Championship Course',
      holes: 18,
      par: 72,
      yardage: 7214,
      slope: 135,
      rating: 74.5,
      status: 'open',
      isActive: true,
      lastUpdated: '2025-11-05T10:30:00',
      updatedBy: 'admin@eldoretgolfclub.com'
    },
    {
      id: 'C-002',
      name: 'Executive Course',
      holes: 9,
      par: 36,
      yardage: 3120,
      slope: 118,
      rating: 68.2,
      status: 'open',
      isActive: true,
      lastUpdated: '2025-11-06T14:15:00',
      updatedBy: 'admin@eldoretgolfclub.com'
    },
    {
      id: 'C-003',
      name: 'Par 3 Course',
      holes: 9,
      par: 27,
      yardage: 1980,
      slope: 95,
      rating: 62.8,
      status: 'maintenance',
      isActive: false,
      lastUpdated: '2025-11-07T09:45:00',
      updatedBy: 'staff@eldoretgolfclub.com'
    }
  ];

  // Dummy data for holes
  const holes: Hole[] = [
    // Championship Course Holes (1-18)
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `H-${i + 1}-C001`,
      number: i + 1,
      par: [4, 5, 4, 3, 4, 5, 3, 4, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4][i],
      handicap: [5, 13, 3, 17, 9, 1, 15, 11, 7, 4, 18, 2, 10, 8, 16, 6, 12, 14][i],
      yards: [410, 545, 420, 185, 395, 550, 170, 400, 415, 400, 195, 530, 410, 380, 160, 525, 400, 420][i],
      description: `Hole ${i + 1} of Championship Course`,
      courseId: 'C-001'
    })),
    
    // Executive Course Holes (1-9)
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `H-${i + 1}-C002`,
      number: i + 1,
      par: [4, 3, 5, 4, 3, 4, 5, 3, 4][i],
      handicap: [3, 7, 1, 5, 9, 2, 6, 8, 4][i],
      yards: [350, 140, 490, 380, 120, 360, 500, 150, 370][i],
      description: `Hole ${i + 1} of Executive Course`,
      courseId: 'C-002'
    })),
    
    // Par 3 Course Holes (1-9)
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `H-${i + 1}-C003`,
      number: i + 1,
      par: 3,
      handicap: i + 1,
      yards: [120, 140, 160, 180, 200, 220, 150, 170, 190][i],
      description: `Hole ${i + 1} of Par 3 Course`,
      courseId: 'C-003'
    }))
  ];

  // Dummy data for tee time settings
  const teeTimeSettings: TeeTimeSetting[] = [
    // Championship Course - Weekdays
    {
      id: 'TTS-001',
      courseId: 'C-001',
      dayOfWeek: 1, // Monday
      startTime: '06:30',
      endTime: '16:00',
      interval: 10,
      isActive: true
    },
    {
      id: 'TTS-002',
      courseId: 'C-001',
      dayOfWeek: 6, // Saturday
      startTime: '06:00',
      endTime: '14:00',
      interval: 8,
      isActive: true
    },
    // Executive Course - Weekdays
    {
      id: 'TTS-003',
      courseId: 'C-002',
      dayOfWeek: 1, // Monday
      startTime: '07:00',
      endTime: '17:00',
      interval: 15,
      isActive: true
    }
  ];

  // Dummy data for maintenance schedules
  const maintenanceSchedules: MaintenanceSchedule[] = [
    {
      id: 'MS-001',
      courseId: 'C-001',
      title: 'Aerification - Front 9',
      description: 'Annual greens aeration for front 9 holes',
      startDate: '2025-11-15T00:00:00',
      endDate: '2025-11-17T23:59:59',
      isRecurring: false,
      status: 'scheduled'
    },
    {
      id: 'MS-002',
      courseId: 'C-001',
      title: 'Bunker Renovation',
      description: 'Complete renovation of all bunkers on holes 4, 7, and 12',
      startDate: '2025-11-20T08:00:00',
      endDate: '2025-11-25T17:00:00',
      isRecurring: false,
      status: 'scheduled'
    },
    {
      id: 'MS-003',
      courseId: 'C-003',
      title: 'Weekly Greens Maintenance',
      description: 'Regular greens mowing and maintenance',
      startDate: '2025-11-10T06:00:00',
      endDate: '2025-11-10T10:00:00',
      isRecurring: true,
      recurrencePattern: 'FREQ=WEEKLY;BYDAY=MO',
      status: 'in_progress'
    }
  ];

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      open: { label: 'Open', variant: 'default' },
      closed: { label: 'Closed', variant: 'destructive' },
      maintenance: { label: 'Maintenance', variant: 'secondary' },
      tournament: { label: 'Tournament', variant: 'outline' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  const getDayOfWeek = (dayNumber: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber] || `Day ${dayNumber}`;
  };

  const getMaintenanceStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string, variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      scheduled: { label: 'Scheduled', variant: 'default' },
      in_progress: { label: 'In Progress', variant: 'secondary' },
      completed: { label: 'Completed', variant: 'outline' },
      cancelled: { label: 'Cancelled', variant: 'destructive' },
    };
    
    const { label, variant } = statusMap[status] || { label: status, variant: 'secondary' };
    return <Badge variant={variant} className="capitalize">{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Setup</h1>
          <p className="text-muted-foreground">
            Manage golf courses, holes, tee times, and maintenance schedules
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">
            <MapPin className="mr-2 h-4 w-4" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="holes">
            <Flag className="mr-2 h-4 w-4" />
            Holes
          </TabsTrigger>
          <TabsTrigger value="tee-times">
            <Clock className="mr-2 h-4 w-4" />
            Tee Times
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Settings2 className="mr-2 h-4 w-4" />
            Maintenance
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Golf Courses</CardTitle>
                <CardDescription>
                  Manage all golf courses in the system
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[250px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Holes</TableHead>
                    <TableHead>Par</TableHead>
                    <TableHead>Yardage</TableHead>
                    <TableHead>Slope/Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.holes}</TableCell>
                      <TableCell>{course.par}</TableCell>
                      <TableCell>{course.yardage.toLocaleString()}</TableCell>
                      <TableCell>{course.slope}/{course.rating}</TableCell>
                      <TableCell>{getStatusBadge(course.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`active-${course.id}`}
                            checked={course.isActive}
                            onCheckedChange={() => {}}
                          />
                          <Label htmlFor={`active-${course.id}`} className="sr-only">
                            Active
                          </Label>
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
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="mr-2 h-4 w-4" />
                              Manage Holes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Tee Time Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Course
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

        {/* Holes Tab */}
        <TabsContent value="holes" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Course Holes</CardTitle>
                <CardDescription>
                  Manage hole details for each course
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Course:</span>
                  <select className="flex h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Hole
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hole</TableHead>
                      <TableHead>Par</TableHead>
                      <TableHead>Handicap</TableHead>
                      <TableHead>Yards</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holes
                      .filter(hole => hole.courseId === 'C-001') // Default to first course
                      .map((hole) => (
                        <TableRow key={hole.id}>
                          <TableCell className="font-medium">{hole.number}</TableCell>
                          <TableCell>{hole.par}</TableCell>
                          <TableCell>{hole.handicap}</TableCell>
                          <TableCell>{hole.yards}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {hole.description}
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
                                  Edit Hole
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Hole
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">18</span> of <span className="font-medium">18</span> holes
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tee Times Tab */}
        <TabsContent value="tee-times" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tee Time Settings</CardTitle>
              <CardDescription>
                Configure tee time intervals and availability for each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Championship Course</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure tee time settings for the Championship Course
                    </p>
                  </div>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Schedule
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Interval</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teeTimeSettings
                        .filter(setting => setting.courseId === 'C-001')
                        .map((setting) => (
                          <TableRow key={setting.id}>
                            <TableCell>{getDayOfWeek(setting.dayOfWeek)}</TableCell>
                            <TableCell>{setting.startTime}</TableCell>
                            <TableCell>{setting.endTime}</TableCell>
                            <TableCell>{setting.interval} min</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={`active-${setting.id}`}
                                  checked={setting.isActive}
                                  onCheckedChange={() => {}}
                                />
                                <Label htmlFor={`active-${setting.id}`} className="sr-only">
                                  Active
                                </Label>
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
                                  <DropdownMenuItem className="text-destructive">
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
                </div>

                <div className="pt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Default Tee Time Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="default-interval">Default Interval (minutes)</Label>
                        <select
                          id="default-interval"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="5">5 minutes</option>
                          <option value="10" selected>10 minutes</option>
                          <option value="15">15 minutes</option>
                          <option value="20">20 minutes</option>
                          <option value="30">30 minutes</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="min-tee-time">Minimum Tee Time Notice</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="min-tee-time"
                            type="number"
                            min="1"
                            max="24"
                            defaultValue="2"
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">hours in advance</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-days">Maximum Days in Advance</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="max-days"
                            type="number"
                            min="1"
                            max="90"
                            defaultValue="30"
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Maintenance Schedules</CardTitle>
                <CardDescription>
                  Schedule and track course maintenance activities
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.title}</TableCell>
                      <TableCell>
                        {courses.find(c => c.id === schedule.courseId)?.name || 'Unknown Course'}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{format(new Date(schedule.startDate), 'MMM d, yyyy')}</span>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(schedule.startDate), 'h:mm a')} - {format(new Date(schedule.endDate), 'h:mm a')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {schedule.isRecurring ? 'Recurring' : 'One-time'}
                      </TableCell>
                      <TableCell>
                        {getMaintenanceStatusBadge(schedule.status)}
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
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel
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
      </Tabs>
    </div>
  );
};

export default CourseSetup;
