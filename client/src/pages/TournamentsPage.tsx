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
  {
    id: "1",
    name: "Eldoret Open 2025",
    date: "2025-12-15",
    time: "08:00 AM",
    format: "Stroke Play",
    entryFee: 5000,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 42,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1501001298802-5d0a8b0c0a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      "No caddies allowed"
    ],
    sponsors: ["Titleist", "Callaway", "Nike Golf"]
  },
  {
    id: "2",
    name: "Fall Scramble",
    date: "2025-11-20",
    time: "9:00 AM",
    format: "4-Person Scramble",
    entryFee: 400,
    prizePool: 2000,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 28,
    maxParticipants: 40,
    description: "A fun team event where all players tee off, then the team selects the best shot and all play their next shot from that location. Great for golfers of all skill levels!",
    rules: [
      "Teams of 4 players",
      "Minimum 2 drives per player required",
      "Maximum team handicap: 72",
  },
  {
    id: "2",
    name: "Rift Valley Championship",
    date: "2025-11-28",
    time: "07:30 AM",
    format: "Stableford",
    entryFee: 3000,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 68,
    maxParticipants: 100,
    image: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "3",
    name: "Club Championship 2025",
    date: "2025-10-10",
    time: "09:00 AM",
    format: "Match Play",
    entryFee: 4000,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 64,
    maxParticipants: 64,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "4",
    name: "Charity Tournament",
    date: "2025-09-22",
    time: "10:00 AM",
    format: "Ambrose",
    entryFee: 2500,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 80,
    maxParticipants: 120,
    image: "https://images.unsplash.com/photo-1541252260738-5d7dde670b8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

const TournamentsPage = () => {
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming');
  const pastTournaments = tournaments.filter(t => t.status === 'completed');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Golf Tournaments</h1>
        <p className="text-muted-foreground">Upcoming and past golf tournaments at Eldoret Golf Club</p>
      </div>

      {upcomingTournaments.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Upcoming Tournaments</h2>
            <Button variant="outline" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
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
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {tournament.status}
                    </div>
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
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>KSh {tournament.entryFee.toLocaleString()}</span>
                  </div>
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
                  <Button className="flex-1" size="sm">
                    Register Now
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

      {pastTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Past Tournaments</h2>
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
                    <CardTitle>{tournament.name}</CardTitle>
                    <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Completed
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(tournament.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                    View Results
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
