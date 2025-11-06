import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Trophy, MapPin, DollarSign, ArrowRight } from "lucide-react";

type Tournament = {
  id: string;
  name: string;
  date: string;
  time: string;
  format: string;
  entryFee: number;
  location: string;
  status: 'upcoming' | 'completed';
  participants: number;
  maxParticipants: number;
  image: string;
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
    status: "upcoming",
    participants: 42,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1501001298802-5d0a8b0c0a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "The most prestigious tournament of the year at Eldoret Golf Club. Open to all members and guests with an official handicap.",
    rules: [
      "Official handicap required (max 24 for men, 36 for women)",
      "Stableford scoring system",
      "No caddies allowed",
      "Prizes for top 3 in each division"
    ],
    sponsors: ["Titleist", "Callaway", "Nike Golf", "Rolex"]
  },
  {
    id: "u2",
    name: "Corporate Challenge",
    date: "2025-11-28",
    time: "08:00 AM",
    format: "4-Person Scramble",
    entryFee: 40000,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 15,
    maxParticipants: 25,
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1600269452002-792e0b4ef0d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
    image: "https://images.unsplash.com/photo-1525450824786-227cbef70703?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
    participants: 64,
    maxParticipants: 64,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    winners: {
      "Champion": "John Kamau",
      "Runner-up": "David Ochieng",
      "Best Gross": "Michael Njoroge",
      "Best Nett": "Peter Mwangi"
    }
  },
  {
    id: "p2",
    name: "Charity Classic",
    date: "2025-09-22",
    time: "09:30 AM",
    format: "Ambrose",
    entryFee: 3000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 80,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1541252260738-5d7dde670b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    charity: "Eldoret Children's Home",
    amountRaised: 450000
  },
  {
    id: "p3",
    name: "President's Cup",
    date: "2025-08-15",
    time: "08:30 AM",
    format: "Stableford",
    entryFee: 4000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 92,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "p4",
    name: "Rift Valley Open",
    date: "2025-07-20",
    time: "07:00 AM",
    format: "Stroke Play",
    entryFee: 6000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 110,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1471289543303-aa0283d49256?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

const getTournamentStatus = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Upcoming</span>;
    case 'completed':
      return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>;
    default:
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
  }
};

const TournamentsPage = () => {
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');
  const pastTournaments = tournaments.filter(t => t.status === 'completed');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Golf Tournaments</h1>
        <p className="text-muted-foreground">Upcoming and past golf tournaments at Eldoret Golf Club</p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Upcoming Tournaments</h2>
            <p className="text-muted-foreground text-sm">Register now to secure your spot in these exciting events</p>
          </div>
          <Button variant="outline" size="sm">
            View Calendar <Calendar className="ml-2 h-4 w-4" />
          </Button>
        </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    {getTournamentStatus(tournament.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {tournament.time}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{tournament.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                    <span>KSh {tournament.entryFee.toLocaleString()}</span>
                    {tournament.sponsors && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        • Sponsored by {tournament.sponsors.join(', ')}
                      </span>
                    )}
                  </div>
                  {tournament.format && (
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                      <span>{tournament.format}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{tournament.participants} registered</span>
                      <span>{tournament.maxParticipants - tournament.participants} spots left</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1" size="sm" disabled={tournament.participants >= tournament.maxParticipants}>
                    {tournament.participants >= tournament.maxParticipants ? 'Fully Booked' : 'Register Now'}
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Past Tournaments</h2>
            <p className="text-muted-foreground text-sm">Relive the excitement of our previous events</p>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View Archive <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastTournaments.map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                <div className="h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={tournament.image}
                    alt={tournament.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                    {getTournamentStatus(tournament.status)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tournament.winners && (
                    <div className="text-sm
                    ">
                      <p className="font-medium mb-1">Winners:</p>
                      <ul className="space-y-1">
                        {Object.entries(tournament.winners).map(([title, name]) => (
                          <li key={title} className="flex justify-between">
                            <span className="text-muted-foreground">{title}:</span>
                            <span className="font-medium">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tournament.charity && (
                    <div className="text-sm mt-2 pt-2 border-t">
                      <p className="text-muted-foreground">Raised for {tournament.charity}:</p>
                      <p className="font-medium">KSh {tournament.amountRaised?.toLocaleString()}</p>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                    View Results & Photos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TournamentsPage;
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {tournaments.map((tournament) => (
                <tr key={tournament.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(tournament.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{tournament.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {tournament.format}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    ${tournament.entryFee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(tournament.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="h-8">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
