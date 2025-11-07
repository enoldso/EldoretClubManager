import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Trophy, MapPin, DollarSign, ArrowRight, Info, Award, BookOpen, User, Mail, Phone, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Tournament = {
  id: string;
  name: string;
  date: string;
  time: string;
  format: string;
  entryFee: number;
  location: string;
  status: 'upcoming' | 'completed' | 'registration-open' | 'registration-closed' | 'in-progress';
  participants: number;
  maxParticipants: number;
  image: string;
  description: string;
  rules: string[];
  sponsors: string[];
  winners?: Array<{
    name: string;
    score: string;
    prize: string;
  }>;
  categories?: {
    name: string;
    handicapRange: string;
    prize: string;
  }[];
  contactPerson?: {
    name: string;
    email: string;
    phone: string;
  };
  registrationDeadline?: string;
  prizePool?: number;
};

const tournaments: Tournament[] = [
  // Upcoming Tournaments
  {
    id: "u1",
    name: "Eldoret Masters 2025",
    date: "2025-12-15",
    time: "07:30 AM",
    format: "Stroke Play",
    entryFee: 7500,
    location: "Eldoret Golf Club",
    status: "registration-open",
    participants: 42,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    description: "The most prestigious tournament of the year at Eldoret Golf Club. Open to all members and guests with an official handicap. This 36-hole stroke play championship will test your skills on our championship course. The event includes a gala dinner and prize giving ceremony.",
    rules: [
      "Official handicap required (max 24 for men, 36 for women)",
      "Stableford scoring system",
      "No caddies allowed",
      "Prizes for top 3 in each division",
      "USGA Rules apply",
      "Dress code: Collared shirts and tailored shorts/trousers required"
    ],
    categories: [
      { name: "Men's Division A", handicapRange: "0-12", prize: "KSh 100,000 + Trophy" },
      { name: "Men's Division B", handicapRange: "13-24", prize: "KSh 75,000 + Trophy" },
      { name: "Ladies Division", handicapRange: "0-36", prize: "KSh 80,000 + Trophy" },
      { name: "Senior Division (50+)", handicapRange: "0-24", prize: "KSh 60,000 + Trophy" }
    ],
    sponsors: ["Titleist", "Callaway", "Nike Golf", "Rolex", "Safaricom", "KCB Bank"],
    contactPerson: {
      name: "Tournament Director",
      email: "tournaments@eldoretgolfclub.com",
      phone: "+254 712 345 678"
    },
    registrationDeadline: "2025-12-10",
    prizePool: 1500000
  },
  {
    id: "u2",
    name: "Corporate Challenge",
    date: "2025-11-28",
    time: "08:00 AM",
    format: "4-Person Scramble",
    entryFee: 40000,
    location: "Eldoret Golf Club",
    status: "registration-open",
    participants: 15,
    maxParticipants: 25,
    image: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    description: "Network and compete with other businesses in this exciting team event. Great for team building and corporate networking.",
    rules: [
      "Teams of 4 players (can be mixed gender)",
      "Minimum 2 drives per player required",
      "Maximum team handicap: 80",
      "Lunch and awards ceremony included"
    ]
  },
  {
    id: "u3",
    name: "Junior Championship",
    date: "2025-12-05",
    time: "09:00 AM",
    format: "Stroke Play",
    entryFee: 1500,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 22,
    maxParticipants: 40,
    image: "https://images.unsplash.com/photo-1602957417690-53488d19faa4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29sZiUyMGNoaWxkcmVufGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
    description: "A fun and competitive tournament for junior golfers aged 8-18. Divisions by age group.",
    ageGroups: ["8-11", "12-15", "16-18"]
  },
  {
    id: "u4",
    name: "Ladies Invitational",
    date: "2025-12-12",
    time: "10:00 AM",
    format: "Better Ball",
    entryFee: 3500,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 18,
    maxParticipants: 40,
    image: "https://images.unsplash.com/photo-1677174502902-36d33ff99077?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29sZiUyMGxhZGllc3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500"
  },
  
  // Past Tournaments
  {
    id: "p1",
    name: "Club Championship 2025",
    date: "2025-10-10",
    time: "08:00 AM",
    format: "Match Play",
    entryFee: 5000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 96,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29sZnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    description: "The annual Eldoret Open attracted top amateur golfers from across the region for a thrilling 36-hole stroke play competition. The event was a great success with excellent course conditions and competitive scoring.",
    winners: [
      { name: "David Kimani", score: "-5 (139)", prize: "KSh 100,000 + Trophy" },
      { name: "James Mwangi", score: "-3 (141)", prize: "KSh 75,000" },
      { name: "Peter Omondi", score: "-2 (142)", prize: "KSh 50,000" }
    ]
  },
  {
    id: "c2",
    name: "Charity Golf Day",
    date: "2025-08-20",
    time: "08:30 AM",
    format: "Ambrose",
    entryFee: 10000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 64,
    maxParticipants: 64,
    image: "https://images.unsplash.com/photo-1746209843615-6b007f4ac00d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdvbGYlMjBjaGFyaXR5fGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=500",
    description: "Our annual charity event raised over KSh 2.5 million for local children's education. The Ambrose format created a fun and social atmosphere, with teams enjoying the beautiful course while supporting a great cause.",
    charity: "Eldoret Children's Education Fund",
    amountRaised: 2500000,
    winners: [
      { name: "Team Safaricom", score: "-12 (60)", prize: "Trophies + Weekend Getaway" },
      { name: "Team KCB", score: "-11 (61)", prize: "Golf Equipment" },
      { name: "Team Equity", score: "-10 (62)", prize: "Dinner Vouchers" }
    ]
  },
  {
    id: "c3",
    name: "Presidents Cup",
    date: "2025-07-10",
    time: "07:30 AM",
    format: "Match Play",
    entryFee: 0,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 32,
    maxParticipants: 32,
    image: "https://images.unsplash.com/photo-1706193589333-da530df63ecf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRyb3BoeXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=500",
    description: "An exclusive match play tournament for club members. The event featured intense competition over three days, culminating in an exciting final match that went to the 18th hole.",
    winners: [
      { name: "John Kamau", score: "2&1", prize: "President's Trophy + KSh 50,000" },
      { name: "Michael Njoroge", score: "Runner-up", prize: "KSh 30,000" },
      { name: "Semi-finalists", score: "4 players", prize: "Golf Accessories" }
    ]
  }
];

const getTournamentStatus = (status: string) => {
  switch (status) {
    case 'upcoming':
      return { text: 'Upcoming', variant: 'outline' as const };
    case 'completed':
      return { text: 'Completed', variant: 'secondary' as const };
    case 'registration-open':
      return { text: 'Registration Open', variant: 'default' as const };
    case 'registration-closed':
      return { text: 'Registration Closed', variant: 'destructive' as const };
    case 'in-progress':
      return { text: 'In Progress', variant: 'default' as const };
    default:
      return { text: status, variant: 'default' as const };
  }
};

const TournamentsPage = () => {
  const [expandedTournament, setExpandedTournament] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    handicap: "",
    club: "",
    specialRequirements: ""
  });

  const toggleTournament = (id: string) => {
    setExpandedTournament(expandedTournament === id ? null : id);
  };

  const handleRegisterClick = (tournament: Tournament) => {
    setRegistrationData({
      ...registrationData,
      name: "",
      email: "",
      phone: "",
      handicap: "",
      club: "",
      specialRequirements: ""
    });
    setIsRegistering(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration submitted:', registrationData);
    // In a real app, you would send this data to your backend
    alert('Thank you for your registration! We will contact you shortly to confirm your spot.');
    setIsRegistering(false);
  };

  const filteredTournaments = tournaments.filter(tournament => {
    const isUpcoming = activeTab === 'upcoming' && 
      (tournament.status === 'upcoming' || 
       tournament.status === 'registration-open' || 
       tournament.status === 'registration-closed' ||
       tournament.status === 'in-progress');
    
    const isCompleted = activeTab === 'completed' && tournament.status === 'completed';
    const matchesTab = activeTab === 'all' || isUpcoming || isCompleted;
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = selectedFormat === "all" || tournament.format.toLowerCase() === selectedFormat.toLowerCase();
    
    return matchesTab && matchesSearch && matchesFormat;
  });

  const upcomingTournaments = tournaments.filter(t => 
    t.status === 'upcoming' || 
    t.status === 'registration-open' || 
    t.status === 'registration-closed' ||
    t.status === 'in-progress'
  );
  
  const completedTournaments = tournaments.filter(t => t.status === 'completed');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Golf Tournaments</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Compete in exciting tournaments, test your skills, and connect with fellow golf enthusiasts.
          From amateur to pro, we have events for all levels of play.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="completed">Past Events</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mt-6 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="stroke play">Stroke Play</SelectItem>
              <SelectItem value="match play">Match Play</SelectItem>
              <SelectItem value="scramble">Scramble</SelectItem>
              <SelectItem value="ambrose">Ambrose</SelectItem>
              <SelectItem value="stableford">Stableford</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="upcoming">
          {upcomingTournaments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No upcoming tournaments found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments
                .filter(t => t.status !== 'completed')
                .map((tournament) => (
                <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={tournament.image}
                      alt={tournament.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{tournament.name}</CardTitle>
                      <Badge variant={getTournamentStatus(tournament.status).variant}>
                        {getTournamentStatus(tournament.status).text}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(tournament.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.entryFee > 0 ? `KSh ${tournament.entryFee.toLocaleString()}` : 'Free Entry'}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.participants}/{tournament.maxParticipants} players</span>
                      <div className="ml-2 h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.format}</span>
                    </div>
                    {tournament.registrationDeadline && (
                      <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Register by: {new Date(tournament.registrationDeadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => toggleTournament(tournament.id)}
                      className="w-full"
                    >
                      {expandedTournament === tournament.id ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" /> Less Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" /> More Details
                        </>
                      )}
                    </Button>
                    <Button 
                      className="w-full" 
                      disabled={tournament.status === 'registration-closed' || tournament.status === 'in-progress'}
                      onClick={() => handleRegisterClick(tournament)}
                    >
                      {tournament.status === 'registration-closed' ? 'Registration Closed' : 
                       tournament.status === 'in-progress' ? 'Tournament in Progress' : 'Register Now'}
                      {!['registration-closed', 'in-progress'].includes(tournament.status) && (
                        <ArrowRight className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </CardFooter>
                  {expandedTournament === tournament.id && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2" /> About the Tournament
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          {tournament.description}
                        </p>
                        
                        <h4 className="font-medium mb-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" /> Rules & Format
                        </h4>
                        <ul className="text-sm space-y-1 mb-4">
                          {tournament.rules.map((rule, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {tournament.categories && tournament.categories.length > 0 && (
                          <>
                            <h4 className="font-medium mb-2 flex items-center">
                              <Award className="h-4 w-4 mr-2" /> Categories & Prizes
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                              {tournament.categories.map((category, i) => (
                                <div key={i} className="border rounded-lg p-3 bg-muted/30">
                                  <h5 className="font-medium">{category.name}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    Handicap: {category.handicapRange}
                                  </p>
                                  <p className="text-sm font-medium mt-1 text-amber-600 dark:text-amber-400">
                                    Prize: {category.prize}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        
                        {tournament.contactPerson && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2 flex items-center">
                              <User className="h-4 w-4 mr-2" /> Contact Person
                            </h4>
                            <div className="space-y-1 text-sm">
                              <p className="font-medium">{tournament.contactPerson.name}</p>
                              <div className="flex items-center text-muted-foreground">
                                <Mail className="h-4 w-4 mr-2" />
                                <a href={`mailto:${tournament.contactPerson.email}`} className="hover:underline">
                                  {tournament.contactPerson.email}
                                </a>
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Phone className="h-4 w-4 mr-2" />
                                <a href={`tel:${tournament.contactPerson.phone.replace(/\D/g, '')}`} className="hover:underline">
                                  {tournament.contactPerson.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {tournament.sponsors && tournament.sponsors.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Sponsored By</h4>
                            <div className="flex flex-wrap gap-2">
                              {tournament.sponsors.map((sponsor, i) => (
                                <Badge key={i} variant="outline" className="text-sm">
                                  {sponsor}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedTournaments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No past tournaments found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments
                .filter(t => t.status === 'completed')
                .map((tournament) => (
                <Card key={tournament.id} className="overflow-hidden opacity-90 hover:opacity-100 transition-opacity hover:shadow-lg">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <img
                      src={tournament.image}
                      alt={tournament.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 text-white px-3 py-1 text-xs font-medium">
                      Completed
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(tournament.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.format}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{tournament.participants} participants</span>
                    </div>
                    {tournament.winners && tournament.winners.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <h4 className="font-medium mb-2 text-sm">Winners:</h4>
                        <ul className="space-y-1 text-sm">
                          {tournament.winners.map((winner, i) => (
                            <li key={i} className="flex justify-between">
                              <span className="font-medium">{winner.name}</span>
                              <span className="text-muted-foreground">{winner.score}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Results & Photos
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Registration Modal */}
      {isRegistering && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Tournament Registration</CardTitle>
              <CardDescription>Fill out the form to register for the tournament</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitRegistration}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={registrationData.name}
                    onChange={handleInputChange}
                    required 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={registrationData.email}
                      onChange={handleInputChange}
                      required 
                      placeholder="john@example.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={registrationData.phone}
                      onChange={handleInputChange}
                      required 
                      placeholder="+254 712 345 678" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="handicap">Handicap</Label>
                    <Input 
                      id="handicap" 
                      name="handicap" 
                      type="text"
                      value={registrationData.handicap}
                      onChange={handleInputChange}
                      placeholder="e.g., 12.4" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="club">Golf Club</Label>
                    <Input 
                      id="club" 
                      name="club" 
                      value={registrationData.club}
                      onChange={handleInputChange}
                      placeholder="Your golf club" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    rows={3}
                    value={registrationData.specialRequirements}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistering(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Registration</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TournamentsPage;
