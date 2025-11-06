import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin, DollarSign } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  level: string;
  price: number;
  location: string;
  availableSpots: number;
};

const lessons: Lesson[] = [
  // Beginner Lessons
  {
    id: "b1",
    title: "First Swing - Introduction to Golf",
    instructor: "David Wilson",
    date: "2025-11-15",
    time: "9:00 AM",
    duration: "1.5 hours",
    level: "Beginner",
    price: 65,
    location: "Practice Range",
    availableSpots: 5,
  },
  {
    id: "b2",
    title: "Golf 101: The Complete Basics",
    instructor: "Emma Thompson",
    date: "2025-11-16",
    time: "11:00 AM",
    duration: "2 hours",
    level: "Beginner",
    price: 75,
    location: "Short Game Area",
    availableSpots: 3,
  },
  
  // Intermediate Lessons
  {
    id: "i1",
    title: "Iron Play Masterclass",
    instructor: "James Rodriguez",
    date: "2025-11-17",
    time: "2:00 PM",
    duration: "2 hours",
    level: "Intermediate",
    price: 95,
    location: "Iron Range",
    availableSpots: 4,
  },
  {
    id: "i2",
    title: "Short Game Wizardry",
    instructor: "Sarah Johnson",
    date: "2025-11-18",
    time: "3:30 PM",
    duration: "2 hours",
    level: "Intermediate",
    price: 110,
    location: "Short Game Area",
    availableSpots: 2,
  },
  
  // Advanced Lessons
  {
    id: "a1",
    title: "Advanced Driving Techniques",
    instructor: "Michael Chen",
    date: "2025-11-19",
    time: "10:00 AM",
    duration: "2.5 hours",
    level: "Advanced",
    price: 135,
    location: "Driving Range",
    availableSpots: 3,
  },
  {
    id: "a2",
    title: "Course Management & Strategy",
    instructor: "Robert Taylor",
    date: "2025-11-20",
    time: "1:00 PM",
    duration: "3 hours",
    level: "Advanced",
    price: 150,
    location: "On-Course",
    availableSpots: 4,
  },
  
  // Specialty Clinics
  {
    id: "s1",
    title: "Women's Golf Clinic",
    instructor: "Lisa Williams",
    date: "2025-11-21",
    time: "9:30 AM",
    duration: "2 hours",
    level: "All Levels",
    price: 85,
    location: "Practice Range",
    availableSpots: 6,
  },
  {
    id: "s2",
    title: "Junior Golf Camp (Ages 10-15)",
    instructor: "Tom Wilson",
    date: "2025-11-22",
    time: "10:00 AM",
    duration: "3 hours",
    level: "Junior",
    price: 65,
    location: "Junior Academy",
    availableSpots: 8,
  },
  {
    id: "s3",
    title: "Senior Golfers Workshop",
    instructor: "Richard Brown",
    date: "2025-11-23",
    time: "11:00 AM",
    duration: "2 hours",
    level: "Senior",
    price: 70,
    location: "Short Game Area",
    availableSpots: 5,
  },
  
  // Weekend Specials
  {
    id: "w1",
    title: "Weekend Short Game Intensive",
    instructor: "Sarah Johnson",
    date: "2025-11-29",
    time: "9:00 AM",
    duration: "4 hours",
    level: "All Levels",
    price: 175,
    location: "Short Game Area",
    availableSpots: 4,
  },
  {
    id: "w2",
    title: "Saturday Morning Scramble",
    instructor: "Michael Chen",
    date: "2025-11-30",
    time: "8:00 AM",
    duration: "5 hours",
    level: "Intermediate+",
    price: 195,
    location: "On-Course",
    availableSpots: 3,
  },
  
  // New for 2025
  {
    id: "n1",
    title: "TrackMan Swing Analysis",
    instructor: "James Rodriguez",
    date: "2025-12-01",
    time: "1:00 PM",
    duration: "1.5 hours",
    level: "All Levels",
    price: 125,
    location: "Indoor Simulator",
    availableSpots: 2,
  },
  {
    id: "n2",
    title: "Mental Game Workshop",
    instructor: "Emma Thompson",
    date: "2025-12-02",
    time: "5:00 PM",
    duration: "2 hours",
    level: "All Levels",
    price: 85,
    location: "Clubhouse",
    availableSpots: 10,
  },
];

export default function GolfAcademyPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Golf Academy</h1>
        <p className="text-muted-foreground">Improve your game with our professional golf instructors</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Upcoming Group Lessons</h2>
        <div className="grid gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: {lesson.instructor} • {lesson.level}
                  </p>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  ${lesson.price}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(lesson.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{lesson.time} • {lesson.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{lesson.location}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {lesson.availableSpots} spots remaining
                </span>
                <Button>Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Instructors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              title: "Head Teaching Professional",
              bio: "PGA Class A Professional with 15+ years of teaching experience. Specializes in short game and course management.",
              students: "500+",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
            },
            {
              name: "Michael Chen",
              title: "Director of Instruction",
              bio: "Former collegiate player with expertise in swing mechanics and power generation. Trained under top 100 teachers.",
              students: "300+",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3"
            },
            {
              name: "Emma Thompson",
              title: "LPGA Teaching Professional",
              bio: "Specializes in junior development and women's golf programs. Passionate about growing the game.",
              students: "400+",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
            },
            {
              name: "James Rodriguez",
              title: "Short Game Specialist",
              bio: "Short game wizard with a focus on scoring. Has helped numerous players lower their handicaps significantly.",
              students: "350+",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
            },
            {
              name: "Lisa Williams",
              title: "Junior Program Director",
              bio: "US Kids Certified Instructor. Creates fun and engaging programs for junior golfers of all skill levels.",
              students: "250+",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
            },
            {
              name: "Robert Taylor",
              title: "Senior Instructor",
              bio: "Specializes in senior golfers and players with physical limitations. Focus on efficient, pain-free golf.",
              students: "600+",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
            },
          ].map((instructor, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{instructor.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{instructor.title}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{instructor.bio}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Students Trained:</span>
                  <span className="font-medium">{instructor.students}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">View Profile</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-muted/50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Private Lessons</h2>
        <p className="text-muted-foreground mb-6">
          For personalized instruction tailored to your specific needs, book a one-on-one session with one of our PGA professionals.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">30-Minute Lesson</CardTitle>
              <p className="text-2xl font-bold">$60</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Focused on specific skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Video analysis available</span>
                </li>
              </ul>
              <Button className="w-full mt-4">Book Private Lesson</Button>
            </CardContent>
          </Card>
          <Card className="border-primary border-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">1-Hour Lesson</CardTitle>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <p className="text-2xl font-bold">$100</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Comprehensive swing analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Video analysis included</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Practice plan included</span>
                </li>
              </ul>
              <Button className="w-full mt-4">Book Private Lesson</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">5-Lesson Package</CardTitle>
              <p className="text-2xl font-bold">$450 <span className="text-sm font-normal text-muted-foreground line-through">$500</span></p>
              <p className="text-sm text-green-600">Save $50</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Five 1-hour lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Video analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Custom practice plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  <span>Progress tracking</span>
                </li>
              </ul>
              <Button className="w-full mt-4">Book Package</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
