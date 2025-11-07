import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, MapPin, Users, ArrowRight, Star, Check, Award, GraduationCap, Video, BookOpen, User, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dummy data for golf programs
const programs = [
  {
    id: 1,
    title: "Junior Golf Program",
    description: "Perfect for young golfers aged 6-17 to learn the fundamentals in a fun, engaging environment.",
    ageGroup: "Ages 6-17",
    duration: "3 months",
    schedule: "Saturdays, 9:00 AM - 11:00 AM",
    price: 15000,
    level: "Beginner",
    instructor: "Sarah Johnson",
    maxStudents: 8,
    image: "https://images.unsplash.com/photo-1649001712085-ecff1245c095?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8anVuaW9yJTIwZ29sZnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 2,
    title: "Adult Beginner Clinic",
    description: "Start your golf journey with professional guidance covering all the basics of the game.",
    ageGroup: "18+",
    duration: "4 weeks",
    schedule: "Tuesdays & Thursdays, 5:30 PM - 7:00 PM",
    price: 12000,
    level: "Beginner",
    instructor: "Michael Ochieng",
    maxStudents: 6,
    image: "https://images.unsplash.com/photo-1698692393564-08f2bcd78d8f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8anVuaW9yJTIwZ29sZnxlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 3,
    title: "Advanced Player Development",
    description: "For experienced players looking to refine their skills and lower their handicap.",
    ageGroup: "16+",
    duration: "8 weeks",
    schedule: "Mondays & Wednesdays, 4:00 PM - 6:00 PM",
    price: 25000,
    level: "Advanced",
    instructor: "James Mwangi",
    maxStudents: 4,
    image: "https://images.unsplash.com/photo-1600609292693-5154474f13fb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGp1bmlvciUyMGdvbGZ8ZW58MHwwfDB8fHwy&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 4,
    title: "Short Game Mastery",
    description: "Focus on chipping, pitching, and putting to improve your scoring game.",
    ageGroup: "16+",
    duration: "4 weeks",
    schedule: "Fridays, 2:00 PM - 4:00 PM",
    price: 10000,
    level: "Intermediate",
    instructor: "Grace Wanjiku",
    maxStudents: 5,
    image: "https://images.unsplash.com/photo-1567019001814-57350903e2af?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGp1bmlvciUyMGdvbGZ8ZW58MHwwfDB8fHwy&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 5,
    title: "Weekend Golf Bootcamp",
    description: "Intensive weekend training covering all aspects of the game.",
    ageGroup: "16+",
    duration: "2 days",
    schedule: "Saturday & Sunday, 8:00 AM - 4:00 PM",
    price: 8000,
    level: "All Levels",
    instructor: "David Kamau",
    maxStudents: 10,
    image: "https://images.unsplash.com/photo-1605173257854-303c2a5fb050?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGp1bmlvciUyMGdvbGZ8ZW58MHwwfDB8fHwy&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 6,
    title: "Private Lessons",
    description: "One-on-one coaching tailored to your specific needs and goals.",
    ageGroup: "All Ages",
    duration: "1 hour",
    schedule: "Flexible",
    price: 3000,
    level: "All Levels",
    instructor: "Various",
    maxStudents: 1,
    image: "https://images.unsplash.com/photo-1622819218586-ac7be4329653?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGp1bmlvciUyMGdvbGZ8ZW58MHwwfDB8fHwy&auto=format&fit=crop&q=60&w=500"
  }
];

// Dummy data for coaches
const coaches = [
  {
    id: 1,
    name: "Peter Johnson",
    title: "Head Golf Professional",
    bio: "PGA Class A Professional with 15+ years of teaching experience. Specializes in junior development and swing mechanics.",
    image: "https://images.unsplash.com/photo-1596476097938-ea0f5aa417a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29hY2glMjBnb2xmfGVufDB8MHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    specialties: ["Junior Golf", "Swing Mechanics", "Mental Game"],
    experience: "15 years",
    rating: 4.9,
    students: 500
  },
  {
    id: 2,
    name: "Michael Ochieng",
    title: "Lead Instructor",
    bio: "Former professional golfer with extensive teaching experience across Africa. Focuses on course management and short game.",
    image: "https://images.unsplash.com/photo-1600609293076-fe896757596d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNvYWNoJTIwZ29sZnxlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&q=60&w=500",
    specialties: ["Short Game", "Course Management", "Tournament Prep"],
    experience: "12 years",
    rating: 4.8,
    students: 400
  },
  {
    id: 3,
    name: "James Mwangi",
    title: "Senior Instructor",
    bio: "Specialist in advanced player development with a track record of training national team players.",
    image: "https://images.unsplash.com/photo-1649001711297-64313ea5155a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGNvYWNoJTIwZ29sZnxlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&q=60&w=500",
    specialties: ["Advanced Techniques", "Swing Analysis", "Fitness for Golf"],
    experience: "10 years",
    rating: 4.9,
    students: 300
  },
  {
    id: 4,
    name: "Grace Wanjiku",
    title: "LPGA Teaching Professional",
    bio: "LPGA Class A Professional with a passion for growing women's golf in Africa.",
    image: "https://images.unsplash.com/photo-1651719902665-f3b35fde005b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29hY2glMjBnb2xmfGVufDB8MHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    specialties: ["Women's Golf", "Junior Golf", "Short Game"],
    experience: "8 years",
    rating: 4.7,
    students: 350
  }
];

// Dummy data for testimonials
const testimonials = [
  {
    id: 1,
    name: "John Mwangi",
    role: "Amateur Golfer",
    content: "The Junior Golf Program transformed my son's game. He's now playing in regional tournaments and loving every minute of it!",
    rating: 5,
    date: "2025-10-15"
  },
  {
    id: 2,
    name: "Susan Atieno",
    role: "Beginner Golfer",
    content: "As a complete beginner, I was nervous to start, but the instructors made me feel so comfortable. I'm now playing 18 holes confidently!",
    rating: 5,
    date: "2025-09-28"
  },
  {
    id: 3,
    name: "David Omondi",
    role: "Competitive Amateur",
    content: "The advanced program helped me shave 5 strokes off my handicap in just 3 months. The personalized attention was incredible.",
    rating: 5,
    date: "2025-10-05"
  },
  {
    id: 4,
    name: "Elizabeth Wambui",
    role: "Junior Golfer",
    content: "Coach Grace is amazing! She makes learning fun and has helped me improve my short game so much.",
    rating: 5,
    date: "2025-10-20"
  }
];

// Dummy data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Junior Golf Open Day",
    date: "2025-11-15",
    time: "10:00 AM - 2:00 PM",
    description: "A fun day of golf activities, games, and skill challenges for junior golfers of all levels.",
    location: "Eldoret Golf Club Academy",
    ageGroup: "6-17 years",
    price: 500,
    image: "/images/junior-open-day.jpg"
  },
  {
    id: 2,
    title: "Women's Golf Clinic",
    date: "2025-11-20",
    time: "8:30 AM - 12:30 PM",
    description: "A special clinic for women golfers focusing on all aspects of the game in a supportive environment.",
    location: "Eldoret Golf Club Academy",
    ageGroup: "16+",
    price: 1500,
    image: "/images/womens-clinic.jpg"
  },
  {
    id: 3,
    title: "Parent-Child Tournament",
    date: "2025-12-05",
    time: "8:00 AM - 1:00 PM",
    description: "A fun tournament pairing parents with their children for a memorable day on the course.",
    location: "Eldoret Golf Club",
    ageGroup: "All Ages",
    price: 2500,
    image: "/images/parent-child-golf.jpg"
  }
];

const GolfAcademy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("programs");
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<number | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
    preferredDate: "",
    preferredTime: ""
  });
  const [activeFilter, setActiveFilter] = useState("all");

  const handleEnrollClick = (programId: number) => {
    setSelectedProgram(programId);
    setEnrollmentData(prev => ({
      ...prev,
      program: programs.find(p => p.id === programId)?.title || ""
    }));
    setIsEnrolling(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEnrollmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enrollment submitted:', enrollmentData);
    // In a real app, you would send this data to your backend
    alert('Thank you for your enrollment! We will contact you shortly to confirm your spot.');
    setIsEnrolling(false);
    setEnrollmentData({
      name: "",
      email: "",
      phone: "",
      program: "",
      message: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  const filteredPrograms = activeFilter === "all" 
    ? programs 
    : programs.filter(program => program.level.toLowerCase() === activeFilter.toLowerCase());

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Eldoret Golf Academy</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Elevate your game with professional coaching from our PGA and LPGA certified instructors. 
          From beginners to advanced players, we have programs tailored for every skill level.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="coaches">Our Coaches</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        {/* Programs Tab */}
        <TabsContent value="programs" className="mt-8">
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
            >
              All Programs
            </Button>
            <Button 
              variant={activeFilter === "beginner" ? "default" : "outline"}
              onClick={() => setActiveFilter("beginner")}
            >
              Beginner
            </Button>
            <Button 
              variant={activeFilter === "intermediate" ? "default" : "outline"}
              onClick={() => setActiveFilter("intermediate")}
            >
              Intermediate
            </Button>
            <Button 
              variant={activeFilter === "advanced" ? "default" : "outline"}
              onClick={() => setActiveFilter("advanced")}
            >
              Advanced
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map(program => (
              <Card key={program.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{program.title}</CardTitle>
                      <div className="flex items-center mt-1">
                        <Badge variant="secondary" className="mr-2">{program.level}</Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{program.ageGroup}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">KSh {program.price.toLocaleString()}</p>
                      {program.duration && (
                        <p className="text-sm text-gray-500">{program.duration}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      <span>Instructor: {program.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>Max {program.maxStudents} students</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => handleEnrollClick(program.id)}
                  >
                    Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Coaches Tab */}
        <TabsContent value="coaches" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coaches.map(coach => (
              <Card 
                key={coach.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCoach(selectedCoach === coach.id ? null : coach.id)}
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={coach.image} 
                    alt={coach.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{coach.name}</CardTitle>
                      <p className="text-sm text-gray-500">{coach.title}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {renderStars(coach.rating)}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({coach.rating})</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {coach.specialties.slice(0, 2).map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                {selectedCoach === coach.id && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{coach.bio}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        <span>{coach.experience} Experience</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                        <span>{coach.students} Students</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Book Lesson
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <p className="text-sm text-gray-500">{event.ageGroup}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {event.price > 0 ? `KSh ${event.price.toLocaleString()}` : 'FREE'}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-primary" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="relative overflow-hidden">
                <div className="absolute top-4 right-4 text-yellow-400">
                  {renderStars(testimonial.rating)}
                </div>
                <CardContent className="pt-6">
                  <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={`/images/avatar-${testimonial.id}.jpg`} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Enrollment Modal */}
      {isEnrolling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Enroll in {enrollmentData.program}</CardTitle>
              <CardDescription>Fill out the form below to secure your spot</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitEnrollment}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={enrollmentData.name}
                    onChange={handleInputChange}
                    required 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={enrollmentData.email}
                      onChange={handleInputChange}
                      required 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={enrollmentData.phone}
                      onChange={handleInputChange}
                      required 
                      placeholder="+254 712 345 678" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="preferredDate" className="text-sm font-medium">Preferred Start Date</label>
                    <Input 
                      id="preferredDate" 
                      name="preferredDate" 
                      type="date" 
                      value={enrollmentData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="preferredTime" className="text-sm font-medium">Preferred Time</label>
                    <Input 
                      id="preferredTime" 
                      name="preferredTime" 
                      type="time" 
                      value={enrollmentData.preferredTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={enrollmentData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    placeholder="Any special requests or questions?"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEnrolling(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Enrollment</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GolfAcademy;
