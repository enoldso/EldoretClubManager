import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

type Score = {
  id: string;
  date: string;
  course: string;
  score: number;
  differential: number;
  isCounting: boolean;
};

const scores: Score[] = [
  {
    id: "1",
    date: "2025-11-05",
    course: "Eldoret GC - Championship",
    score: 82,
    differential: 8.1,
    isCounting: true,
  },
  {
    id: "2",
    date: "2025-10-28",
    course: "Eldoret GC - Championship",
    score: 85,
    differential: 10.7,
    isCounting: true
  },
  {
    id: "3",
    date: "2025-10-21",
    course: "Eldoret GC - Championship",
    score: 89,
    differential: 14.1,
    isCounting: true
  },
  {
    id: "4",
    date: "2025-10-14",
    course: "Eldoret GC - Championship",
    score: 84,
    differential: 9.8,
    isCounting: true
  },
  {
    id: "5",
    date: "2025-10-07",
    course: "Eldoret GC - Championship",
    score: 87,
    differential: 12.4,
    isCounting: false
  }
];

// Sort scores by date (newest first)
const sortedScores = [...scores].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Get the last 6 months of data for the chart
const chartData = [
  { date: 'Jun', score: 84, differential: 9.8 },
  { date: 'Jul', score: 87, differential: 12.4 },
  { date: 'Aug', score: 84, differential: 9.8 },
  { date: 'Sep', score: 88, differential: 13.3 },
  { date: 'Oct', score: 84, differential: 9.8 },
  { date: 'Nov', score: 82, differential: 8.1 },
];

const currentHandicap = 8.1;
const trend = 'down';

export default function HandicapPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Handicap</h1>
        <p className="text-muted-foreground">Track your golf handicap and scores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Handicap Index</h3>
            <p className="text-3xl font-bold">{currentHandicap}</p>
            <p className={`text-sm ${trend === 'down' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'down' ? '↓ Improving' : '↑ Needs work'}
            </p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Rounds Played</h3>
            <p className="text-3xl font-bold">{scores.length}</p>
            <p className="text-sm text-muted-foreground">
              {scores.filter(s => s.isCounting).length} counting towards handicap
            </p>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-medium text-muted-foreground">Average Score</h3>
            <p className="text-3xl font-bold">
              {Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)}
            </p>
            <p className="text-sm text-muted-foreground">
              Last 5 rounds
            </p>
          </CardHeader>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Handicap Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Line 
                type="monotone" 
                dataKey="differential" 
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedScores.map((score) => (
              <div key={score.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{score.course}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(score.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{score.score}</p>
                  <p className="text-sm text-muted-foreground">
                    Diff: {score.differential.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
