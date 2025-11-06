import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Trophy, MapPin, Award, CalendarDays, DollarSign } from "lucide-react";

type Tournament = {
  id: string;
  name: string;
  date: string;
  time: string;
  format: string;
  entryFee: number;
  prizePool: number;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants: number;
  maxParticipants: number;
  description: string;
  rules: string[];
  sponsors?: string[];
};

const tournaments: Tournament[] = [
  {
    id: "1",
    name: "Club Championship 2025",
    date: "2025-12-05",
    time: "8:00 AM",
    format: "36-Hole Stroke Play",
    entryFee: 250,
    prizePool: 5000,
    location: "Eldoret Golf Club",
    status: "upcoming",
    participants: 42,
    maxParticipants: 72,
    description: "The annual Club Championship is our most prestigious event of the year. Open to all members with an active handicap. Two days of competitive stroke play with divisions for men, women, and seniors.",
    rules: [
      "USGA Rules apply",
      "Maximum handicap: 24 for men, 36 for women",
      "Motorized carts allowed",
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
      "Mulligans available for purchase"
    ]
  },
  {
    id: "3",
    name: "Member-Guest Invitational",
    date: "2025-10-15",
    time: "1:00 PM",
    format: "2-Person Best Ball",
    entryFee: 300,
    prizePool: 3500,
    location: "Eldoret Golf Club",
    status: "completed",
    participants: 64,
    maxParticipants: 64,
    description: "Our annual member-guest tournament brings together members and their guests for a weekend of competitive golf and social events. The perfect opportunity to introduce friends to our club.",
    rules: [
      "One guest per member",
      "Handicap adjustment: 90% of course handicap",
      "Prizes for both members and guests",
      "Dress code strictly enforced"
    ]
  }
];

export default function TournamentsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Upcoming</span>;
      case 'ongoing':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Ongoing</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tournaments</h1>
        <p className="text-muted-foreground">Compete in exciting golf tournaments throughout the year</p>
      </div>

      <div className="grid gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="p-6 md:w-1/3 bg-muted/50 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-xl font-bold">{tournament.name}</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(tournament.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.time} • {tournament.format}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Entry Fee: ${tournament.entryFee}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Prize Pool: ${tournament.prizePool.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{tournament.participants}/{tournament.maxParticipants} participants</span>
                  </div>
                </div>
                <div className="mt-4">
                  {getStatusBadge(tournament.status)}
                </div>
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="font-semibold mb-2">About the Tournament</h3>
                <p className="text-muted-foreground mb-4">{tournament.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium mb-2">Tournament Rules</h4>
                    <ul className="space-y-2 text-sm">
                      {tournament.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {tournament.sponsors && (
                    <div>
                      <h4 className="font-medium mb-2">Sponsored By</h4>
                      <div className="flex flex-wrap gap-4 items-center">
                        {tournament.sponsors.map((sponsor, index) => (
                          <div key={index} className="bg-muted/50 p-3 rounded-lg">
                            <span className="font-medium">{sponsor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button disabled={tournament.status === 'completed'}>
                    {tournament.status === 'completed' ? 'Tournament Ended' : 'Register Now'}
                  </Button>
                  <Button variant="outline">View Details</Button>
                  {tournament.status === 'completed' && (
                    <Button variant="ghost">View Results</Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Tournament Schedule 2025-2026</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tournament</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Format</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Entry Fee</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3">
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
