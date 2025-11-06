import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Score = {
  id: string;
  date: string;
  course: string;
  score: number;
  rating: number;
  slope: number;
  differential: number;
  isCounting: boolean;
  notes?: string;
};

const scores: Score[] = [
  {
    id: "1",
    date: "2025-11-05",
    course: "Eldoret GC - Championship",
    score: 82,
    rating: 72.5,
    slope: 132,
    differential: 8.1,
    isCounting: true,
    notes: "Great round, 3 birdies"
  },
  {
    id: "2",
    date: "2025-10-28",
    course: "Eldoret GC - Championship",
    score: 85,
    rating: 72.5,
    slope: 132,
    differential: 10.7,
    isCounting: true
  },
  {
    id: "3",
    date: "2025-10-21",
    course: "Eldoret GC - Championship",
    score: 89,
    rating: 72.5,
    slope: 132,
    differential: 14.1,
    isCounting: true,
    notes: "Tough conditions, windy"
  },
  {
    id: "4",
    date: "2025-10-14",
    course: "Eldoret GC - Championship",
    score: 84,
    rating: 72.5,
    slope: 132,
    differential: 9.8,
    isCounting: true
  },
  {
    id: "5",
    date: "2025-10-07",
    course: "Eldoret GC - Championship",
    score: 87,
    rating: 72.5,
    slope: 132,
    differential: 12.4,
    isCounting: false
  },
  {
    id: "6",
    date: "2025-09-30",
    course: "Eldoret GC - Championship",
    score: 83,
    rating: 72.5,
    slope: 132,
    differential: 9.0,
    isCounting: true
  },
  {
    id: "7",
    date: "2025-09-23",
    course: "Eldoret GC - Championship",
    score: 86,
    rating: 72.5,
    slope: 132,
    differential: 11.5,
    isCounting: true
  },
  {
    id: "8",
    date: "2025-09-16",
    course: "Eldoret GC - Championship",
    score: 90,
    rating: 72.5,
    slope: 132,
    differential: 15.0,
    isCounting: true
  },
  {
    id: "9",
    date: "2025-09-09",
    course: "Eldoret GC - Championship",
    score: 85,
    rating: 72.5,
    slope: 132,
    differential: 10.7,
    isCounting: true
  },
  {
    id: "10",
    date: "2025-09-02",
    course: "Eldoret GC - Championship",
    score: 88,
    rating: 72.5,
    slope: 132,
    differential: 13.3,
    isCounting: true
  },
  {
    id: "11",
    date: "2025-08-26",
    course: "Eldoret GC - Championship",
    score: 84,
    rating: 72.5,
    slope: 132,
    differential: 9.8,
    isCounting: true
  },
  {
    id: "12",
    date: "2025-08-19",
    course: "Eldoret GC - Championship",
    score: 87,
    rating: 72.5,
    slope: 132,
    differential: 12.4,
    isCounting: true
  },
  {
    id: "13",
    date: "2025-08-12",
    course: "Eldoret GC - Championship",
    score: 89,
    rating: 72.5,
    slope: 132,
    differential: 14.1,
    isCounting: false
  },
  {
    id: "14",
    date: "2025-08-05",
    course: "Eldoret GC - Championship",
    score: 86,
    rating: 72.5,
    slope: 132,
    differential: 11.5,
    isCounting: true
  },
  {
    id: "15",
    date: "2025-07-29",
    course: "Eldoret GC - Championship",
    score: 83,
    rating: 72.5,
    slope: 132,
    differential: 9.0,
    isCounting: true
  },
  {
    id: "16",
    date: "2025-07-22",
    course: "Eldoret GC - Championship",
    score: 88,
    rating: 72.5,
    slope: 132,
    differential: 13.3,
    isCounting: true
  },
  {
    id: "17",
    date: "2025-07-15",
    course: "Eldoret GC - Championship",
    score: 85,
    rating: 72.5,
    slope: 132,
    differential: 10.7,
    isCounting: true
  },
  {
    id: "18",
    date: "2025-07-08",
    course: "Eldoret GC - Championship",
    score: 90,
    rating: 72.5,
    slope: 132,
    differential: 15.0,
    isCounting: true
  },
  {
    id: "19",
    date: "2025-07-01",
    course: "Eldoret GC - Championship",
    score: 87,
    rating: 72.5,
    slope: 132,
    differential: 12.4,
    isCounting: true
  },
  {
    id: "20",
    date: "2025-06-24",
    course: "Eldoret GC - Championship",
    score: 84,
    rating: 72.5,
    slope: 132,
    differential: 9.8,
    isCounting: true
  }
];

// Sort scores by date (newest first)
const sortedScores = [...scores].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Get the last 6 months of data for the chart
const chartData = sortedScores
  .slice(0, 6)
  .map(score => ({
    date: new Date(score.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: score.score,
    differential: score.differential,
    courseRating: score.rating,
    slope: score.slope
  }))
  .reverse();

// Calculate current handicap index (average of best 8 of last 20 differentials)
const currentHandicap = () => {
  const countingScores = scores.filter(score => score.isCounting);
  const bestDifferentials = countingScores
    .map(score => score.differential)
    .sort((a, b) => a - b)
    .slice(0, 8);
  
  const average = bestDifferentials.reduce((sum, diff) => sum + diff, 0) / bestDifferentials.length;
  return Math.round(average * 10) / 10;
};

// Calculate trend (up, down, or neutral)
const getTrend = () => {
  const recentScores = [...scores].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (recentScores.length < 2) return 'neutral';
  
  const current = recentScores[0].differential;
  const previous = recentScores[1].differential;
  
  if (current < previous) return 'down';
  if (current > previous) return 'up';
  return 'neutral';
};

const trend = getTrend();
const handicapIndex = currentHandicap();

// Calculate course handicap for different tees
const calculateCourseHandicap = (handicapIndex: number, slope: number, rating: number, par: number) => {
  return Math.round(handicapIndex * (slope / 113) + (rating - par));
};

export default function HandicapPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Handicap</h1>
        <p className="text-muted-foreground">Track and manage your golf handicap</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Handicap Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{handicapIndex}</div>
            <div className="flex items-center mt-2">
              {trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500 mr-1" />}
              {trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500 mr-1" />}
              {trend === 'neutral' && <Minus className="h-4 w-4 text-gray-500 mr-1" />}
              <span className={`text-sm ${trend === 'down' ? 'text-green-500' : trend === 'up' ? 'text-red-500' : 'text-gray-500'}`}>
                {trend === 'up' ? 'Up from last round' : trend === 'down' ? 'Down from last round' : 'No change'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rounds Played</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{scores.length}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {scores.filter(s => s.isCounting).length} counting towards handicap
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {Math.round(scores.reduce((sum, score) => sum + score.rating - score.score, 0) / scores.length * 10) / 10} vs. course rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Handicap Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      borderColor: 'hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="differential" 
                    name="Differential"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="courseRating" 
                    name="Course Rating"
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Course Handicap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Eldoret GC - Championship</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Black Tees</span>
                      <span className="font-medium">
                        {calculateCourseHandicap(handicapIndex, 140, 74.2, 72)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Blue Tees</span>
                      <span className="font-medium">
                        {calculateCourseHandicap(handicapIndex, 135, 72.5, 72)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">White Tees</span>
                      <span className="font-medium">
                        {calculateCourseHandicap(handicapIndex, 130, 70.8, 72)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gold Tees</span>
                      <span className="font-medium">
                        {calculateCourseHandicap(handicapIndex, 125, 69.1, 72)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best Score</span>
                      <span className="font-medium">
                        {Math.min(...scores.map(s => s.score))} ({(scores.find(s => s.score === Math.min(...scores.map(s => s.score)))?.date ? new Date(scores.find(s => s.score === Math.min(...scores.map(s => s.score)))?.date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Score</span>
                      <span className="font-medium">
                        {Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fairways Hit</span>
                      <span className="font-medium">48%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">GIR</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Putts/Round</span>
                      <span className="font-medium">32.4</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Score History</CardTitle>
            <Button variant="outline" size="sm">
              Post New Score
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Differential</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedScores.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell className="font-medium">
                      {new Date(score.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell>{score.course}</TableCell>
                    <TableCell className="text-right">
                      <div className="font-medium">{score.score}</div>
                      <div className="text-xs text-muted-foreground">
                        {score.rating} / {score.slope}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={score.isCounting ? 'font-bold' : ''}>
                        {score.differential.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {score.isCounting ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Counting
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Not Used
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
