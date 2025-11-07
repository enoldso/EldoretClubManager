import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Info, ChevronUp, ChevronDown } from 'lucide-react';

type Score = {
  id: string;
  date: string;
  course: string;
  tees: string;
  rating: number;
  slope: number;
  score: number;
  adjustedScore: number;
  differential: number;
  isCounting: boolean;
  stats?: {
    fairwaysHit: string;
    greensInRegulation: string;
    putts: number;
    penalties: number;
  };
};

type HandicapHistory = {
  date: string;
  handicapIndex: number;
  change: number;
};

const scores: Score[] = [
  {
    id: "1",
    date: "2025-11-05",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 82,
    adjustedScore: 80,
    differential: 8.1,
    isCounting: true,
    stats: {
      fairwaysHit: "9/14",
      greensInRegulation: "10/18",
      putts: 30,
      penalties: 2
    }
  },
  {
    id: "2",
    date: "2025-10-28",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 85,
    adjustedScore: 83,
    differential: 10.7,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 32,
      penalties: 3
    }
  },
  {
    id: "3",
    date: "2025-10-21",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 89,
    adjustedScore: 87,
    differential: 14.1,
    isCounting: true,
    stats: {
      fairwaysHit: "6/14",
      greensInRegulation: "7/18",
      putts: 34,
      penalties: 4
    }
  },
  {
    id: "4",
    date: "2025-10-14",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 84,
    adjustedScore: 82,
    differential: 9.8,
    isCounting: true,
    stats: {
      fairwaysHit: "8/14",
      greensInRegulation: "9/18",
      putts: 31,
      penalties: 2
    }
  },
  {
    id: "5",
    date: "2025-10-07",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 81,
    adjustedScore: 79,
    differential: 7.5,
    isCounting: true,
    stats: {
      fairwaysHit: "10/14",
      greensInRegulation: "11/18",
      putts: 29,
      penalties: 1
    }
  },
  {
    id: "6",
    date: "2025-09-30",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 86,
    adjustedScore: 84,
    differential: 11.2,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 33,
      penalties: 3
    }
  },
  {
    id: "7",
    date: "2025-09-23",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 88,
    adjustedScore: 86,
    differential: 13.2,
    isCounting: true,
    stats: {
      fairwaysHit: "6/14",
      greensInRegulation: "7/18",
      putts: 35,
      penalties: 4
    }
  },
  {
    id: "8",
    date: "2025-09-16",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 83,
    adjustedScore: 81,
    differential: 8.9,
    isCounting: true,
    stats: {
      fairwaysHit: "9/14",
      greensInRegulation: "10/18",
      putts: 30,
      penalties: 2
    }
  },
  {
    id: "9",
    date: "2025-09-09",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 87,
    adjustedScore: 85,
    differential: 12.1,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 34,
      penalties: 3
    }
  },
  {
    id: "10",
    date: "2025-09-02",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 85,
    adjustedScore: 83,
    differential: 10.7,
    isCounting: true,
    stats: {
      fairwaysHit: "8/14",
      greensInRegulation: "9/18",
      putts: 32,
      penalties: 2
    }
  },
  {
    id: "11",
    date: "2025-08-26",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 90,
    adjustedScore: 88,
    differential: 14.8,
    isCounting: true,
    stats: {
      fairwaysHit: "5/14",
      greensInRegulation: "6/18",
      putts: 36,
      penalties: 5
    }
  },
  {
    id: "12",
    date: "2025-08-19",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 84,
    adjustedScore: 82,
    differential: 9.8,
    isCounting: true,
    stats: {
      fairwaysHit: "8/14",
      greensInRegulation: "9/18",
      putts: 31,
      penalties: 2
    }
  },
  {
    id: "13",
    date: "2025-08-12",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 86,
    adjustedScore: 84,
    differential: 11.2,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 33,
      penalties: 3
    }
  },
  {
    id: "14",
    date: "2025-08-05",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 89,
    adjustedScore: 87,
    differential: 14.1,
    isCounting: true,
    stats: {
      fairwaysHit: "6/14",
      greensInRegulation: "7/18",
      putts: 35,
      penalties: 4
    }
  },
  {
    id: "15",
    date: "2025-07-29",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 85,
    adjustedScore: 83,
    differential: 10.7,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 32,
      penalties: 3
    }
  },
  {
    id: "16",
    date: "2025-07-22",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 83,
    adjustedScore: 81,
    differential: 8.9,
    isCounting: true,
    stats: {
      fairwaysHit: "9/14",
      greensInRegulation: "10/18",
      putts: 30,
      penalties: 2
    }
  },
  {
    id: "17",
    date: "2025-07-15",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 87,
    adjustedScore: 85,
    differential: 12.1,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 34,
      penalties: 3
    }
  },
  {
    id: "18",
    date: "2025-07-08",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 84,
    adjustedScore: 82,
    differential: 9.8,
    isCounting: true,
    stats: {
      fairwaysHit: "8/14",
      greensInRegulation: "9/18",
      putts: 31,
      penalties: 2
    }
  },
  {
    id: "19",
    date: "2025-07-01",
    course: "Eldoret GC - Championship",
    tees: "Blue",
    rating: 72.1,
    slope: 128,
    score: 86,
    adjustedScore: 84,
    differential: 11.2,
    isCounting: true,
    stats: {
      fairwaysHit: "7/14",
      greensInRegulation: "8/18",
      putts: 33,
      penalties: 3
    }
  },
  {
    id: "20",
    date: "2025-06-24",
    course: "Eldoret GC - Championship",
    tees: "White",
    rating: 70.5,
    slope: 125,
    score: 88,
    adjustedScore: 86,
    differential: 13.2,
    isCounting: true,
    stats: {
      fairwaysHit: "6/14",
      greensInRegulation: "7/18",
      putts: 35,
      penalties: 4
    }
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

// Handicap history data
const handicapHistory = [
  { date: '2025-11-01', handicapIndex: 8.1, change: -0.3 },
  { date: '2025-10-25', handicapIndex: 8.4, change: 0.2 },
  { date: '2025-10-18', handicapIndex: 8.2, change: 0.1 },
  { date: '2025-10-11', handicapIndex: 8.1, change: -0.2 },
  { date: '2025-10-04', handicapIndex: 8.3, change: 0.0 },
  { date: '2025-09-27', handicapIndex: 8.3, change: 0.2 },
  { date: '2025-09-20', handicapIndex: 8.1, change: -0.1 },
];

const HandicapPage = () => {
  const [expandedScore, setExpandedScore] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('scores');
  
  const currentHandicap = 8.1;
  const courseHandicap = 10; // Example course handicap
  const trend = 'down';
  
  const toggleScoreExpansion = (id: string) => {
    setExpandedScore(expandedScore === id ? null : id);
  };

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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Course Handicap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courseHandicap}</div>
            <p className="text-sm text-muted-foreground">Eldoret GC - Blue Tees (128 Slope)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scoring Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">84.3</div>
            <p className="text-sm text-muted-foreground">Last 10 rounds</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="scores" onClick={() => setActiveTab('scores')}>Scores</TabsTrigger>
          <TabsTrigger value="history" onClick={() => setActiveTab('history')}>History</TabsTrigger>
          <TabsTrigger value="stats" onClick={() => setActiveTab('stats')}>Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="scores">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Score History</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Showing last 20 rounds</span>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Differential</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scores.map((score) => (
                    <TableRow key={score.id} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleScoreExpansion(score.id)}>
                      <TableCell className="font-medium">{new Date(score.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div>{score.course}</div>
                        <div className="text-xs text-muted-foreground">{score.tees} Tees</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div>{score.score}</div>
                        <div className="text-xs text-muted-foreground">({score.adjustedScore})</div>
                      </TableCell>
                      <TableCell className="text-right">{score.differential.toFixed(1)}</TableCell>
                      <TableCell className="text-center">
                        {score.isCounting ? (
                          <Badge variant="default">Counting</Badge>
                        ) : (
                          <Badge variant="outline">Not Counting</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {expandedScore === score.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Handicap History</CardTitle>
              <CardDescription>Your handicap index changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={handicapHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis domain={[7, 10]} />
                    <Tooltip 
                      labelFormatter={(date) => `Revision: ${new Date(date).toLocaleDateString()}`}
                      formatter={(value: number, name: string) => {
                        if (name === 'handicapIndex') return [value.toFixed(1), 'Handicap Index'];
                        return [value];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="handicapIndex" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Handicap Index"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-4">Recent Revisions</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Revision Date</TableHead>
                        <TableHead>Handicap Index</TableHead>
                        <TableHead>Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {handicapHistory.map((revision) => (
                        <TableRow key={revision.date}>
                          <TableCell>{new Date(revision.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{revision.handicapIndex.toFixed(1)}</TableCell>
                          <TableCell>
                            {revision.change > 0 ? (
                              <span className="text-red-500 flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +{revision.change.toFixed(1)}
                              </span>
                            ) : revision.change < 0 ? (
                              <span className="text-green-500 flex items-center">
                                <TrendingDown className="h-4 w-4 mr-1" />
                                {revision.change.toFixed(1)}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">No change</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Performance Statistics</CardTitle>
              <CardDescription>Your key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Scoring Average</div>
                  <div className="text-2xl font-bold">84.3</div>
                  <div className="text-xs text-muted-foreground">Last 10 rounds</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Fairways Hit</div>
                  <div className="text-2xl font-bold">57%</div>
                  <div className="text-xs text-muted-foreground">8/14 average</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Greens in Regulation</div>
                  <div className="text-2xl font-bold">44%</div>
                  <div className="text-xs text-muted-foreground">8/18 average</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Putts per Round</div>
                  <div className="text-2xl font-bold">32.1</div>
                  <div className="text-xs text-muted-foreground">1.8 per hole</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Scoring Distribution</h3>
                  <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Scoring distribution chart</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Recent Trends</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fairways Hit</span>
                        <span className="font-medium">+5%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Greens in Regulation</span>
                        <span className="font-medium">+3%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '44%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Putts per Round</span>
                        <span className="font-medium">-1.2</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HandicapPage;
