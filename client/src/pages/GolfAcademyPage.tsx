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
  {
    id: "1",
    title: "Beginner Golf Fundamentals",
    instructor: "John Smith",
    date: "2025-11-15",
    time: "10:00 AM",
    duration: "1.5 hours",
    level: "Beginner",
    price: 75,
    location: "Driving Range",
    availableSpots: 4,
  },
  {
    id: "2",
    title: "Short Game Mastery",
    instructor: "Sarah Johnson",
    date: "2025-11-16",
    time: "2:00 PM",
    duration: "2 hours",
    level: "Intermediate",
    price: 95,
    location: "Chipping Green",
    availableSpots: 2,
  },
  {
    id: "3",
    title: "Advanced Driving Techniques",
    instructor: "Mike Davis",
    date: "2025-11-17",
    time: "3:30 PM",
    duration: "2 hours",
    level: "Advanced",
    price: 120,
    location: "Driving Range",
    availableSpots: 6,
  },
];

export default function GolfAcademyPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Golf Academy</h1>
        <p className="text-muted-foreground">Improve your game with our professional golf instructors</p>
      </div>

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
