import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-hot-toast';

interface Player {
  id: string;
  name: string;
  handicap: number;
  scores: Array<{
    holeNumber: number;
    score: number;
    putts?: number;
    fairwayHit?: boolean;
    greensInRegulation?: boolean;
    sandSave?: boolean;
  }>;
  total: number;
  verified: boolean;
}

interface TeeTime {
  id: string;
  date: string;
  time: string;
  course: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  players: Player[];
}

const TeeTimeScoring: React.FC = () => {
  const [teeTime, setTeeTime] = useState<TeeTime | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState('scores');
  const [_, navigate] = useLocation();

  useEffect(() => {
    // In a real app, you would fetch the tee time data here
    const fetchTeeTime = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockTeeTime: TeeTime = {
          id: '1',
          date: '2025-11-15',
          time: '08:30',
          course: 'Championship Course',
          status: 'in_progress',
          players: [
            {
              id: '1',
              name: 'John Doe',
              handicap: 12.4,
              scores: Array(18).fill(0).map((_, i) => ({
                holeNumber: i + 1,
                score: 0,
                putts: 0,
                fairwayHit: false,
                greensInRegulation: false,
                sandSave: false
              })),
              total: 0,
              verified: false
            },
            {
              id: '2',
              name: 'Jane Smith',
              handicap: 8.7,
              scores: Array(18).fill(0).map((_, i) => ({
                holeNumber: i + 1,
                score: 0,
                putts: 0,
                fairwayHit: false,
                greensInRegulation: false,
                sandSave: false
              })),
              total: 0,
              verified: false
            }
          ]
        };
        
        setTeeTime(mockTeeTime);
      } catch (error) {
        console.error('Error fetching tee time:', error);
        toast.error('Failed to load tee time data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeeTime();
  }, []);

  const handleScoreChange = (playerId: string, holeNumber: number, field: string, value: any) => {
    if (!teeTime) return;
    
    const updatedPlayers = teeTime.players.map(player => {
      if (player.id === playerId) {
        const updatedScores = player.scores.map(score => {
          if (score.holeNumber === holeNumber) {
            return { ...score, [field]: value };
          }
          return score;
        });
        
        // Calculate total score
        const total = updatedScores.reduce((sum, score) => sum + (score.score || 0), 0);
        
        return { ...player, scores: updatedScores, total };
      }
      return player;
    });
    
    setTeeTime({ ...teeTime, players: updatedPlayers });
  };

  const handleSaveScores = async () => {
    if (!teeTime) return;
    
    try {
      // In a real app, you would save the scores to your backend here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Scores saved successfully!');
      // Refresh the tee time data
      // await fetchTeeTime();
    } catch (error) {
      console.error('Error saving scores:', error);
      toast.error('Failed to save scores');
    }
  };

  const handleVerifyScores = async () => {
    if (!verificationCode) {
      toast.error('Please enter a verification code');
      return;
    }
    
    setVerifying(true);
    
    try {
      // In a real app, you would verify the code with your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock verification - in a real app, this would come from the API
      if (verificationCode === '123456') {
        toast.success('Scores verified successfully!');
        // Update tee time status to completed
        if (teeTime) {
          setTeeTime({
            ...teeTime,
            status: 'completed',
            players: teeTime.players.map(player => ({
              ...player,
              verified: true
            }))
          });
        }
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying scores:', error);
      toast.error('Failed to verify scores');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!teeTime) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Tee Time Not Found</h2>
          <p className="text-muted-foreground">The requested tee time could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Tee Time Scoring</h1>
          <p className="text-muted-foreground">
            {new Date(teeTime.date).toLocaleDateString()} at {teeTime.time} • {teeTime.course}
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            teeTime.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
            teeTime.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            teeTime.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {teeTime.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scorecard</CardTitle>
              <CardDescription>
                Enter scores for each hole. Tap on a cell to edit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Hole</th>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <th key={i} className="p-2 text-center">{i + 1}</th>
                      ))}
                      <th className="p-2 text-center font-bold">Out</th>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <th key={i + 9} className="p-2 text-center">{i + 10}</th>
                      ))}
                      <th className="p-2 text-center font-bold">In</th>
                      <th className="p-2 text-center font-bold">Total</th>
                    </tr>
                    <tr>
                      <th className="text-left p-2">Par</th>
                      {Array(9).fill(4).map((par, i) => (
                        <th key={i} className="p-2 text-center">{par}</th>
                      ))}
                      <th className="p-2 text-center font-bold">36</th>
                      {Array(9).fill(4).map((par, i) => (
                        <th key={i + 9} className="p-2 text-center">{par}</th>
                      ))}
                      <th className="p-2 text-center font-bold">36</th>
                      <th className="p-2 text-center font-bold">72</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teeTime.players.map((player) => (
                      <tr key={player.id} className="border-t">
                        <td className="p-2 font-medium">{player.name}</td>
                        {player.scores.slice(0, 9).map((score) => (
                          <td key={`${player.id}-${score.holeNumber}`} className="p-2 text-center">
                            <Input
                              type="number"
                              min={1}
                              max={15}
                              className="w-12 text-center"
                              value={score.score || ''}
                              onChange={(e) => 
                                handleScoreChange(player.id, score.holeNumber, 'score', parseInt(e.target.value) || 0)
                              }
                            />
                          </td>
                        ))}
                        <td className="p-2 text-center font-bold">
                          {player.scores.slice(0, 9).reduce((sum, score) => sum + (score.score || 0), 0)}
                        </td>
                        {player.scores.slice(9).map((score) => (
                          <td key={`${player.id}-${score.holeNumber}`} className="p-2 text-center">
                            <Input
                              type="number"
                              min={1}
                              max={15}
                              className="w-12 text-center"
                              value={score.score || ''}
                              onChange={(e) => 
                                handleScoreChange(player.id, score.holeNumber, 'score', parseInt(e.target.value) || 0)
                              }
                            />
                          </td>
                        ))}
                        <td className="p-2 text-center font-bold">
                          {player.scores.slice(9).reduce((sum, score) => sum + (score.score || 0), 0)}
                        </td>
                        <td className="p-2 text-center font-bold">
                          {player.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveScores}>
                  Save Scores
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Score Verification</CardTitle>
              <CardDescription>
                Enter the verification code to confirm the scores are accurate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    disabled={verifying || teeTime.status === 'completed'}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    The verification code was provided by the course marshal or your playing partner.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={handleVerifyScores}
                    disabled={verifying || teeTime.status === 'completed'}
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Scores'
                    )}
                  </Button>
                  
                  {teeTime.status === 'completed' && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5 mr-1" />
                      <span>Scores verified and submitted</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>
                View detailed statistics for this round.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teeTime.players.map((player) => (
                  <Card key={player.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <CardDescription>Handicap: {player.handicap}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Score:</span>
                          <span className="font-medium">{player.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Net Score:</span>
                          <span className="font-medium">
                            {player.total - Math.floor(player.handicap)}
                            <span className="text-xs text-muted-foreground ml-1">
                              (HCP: {player.handicap})
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fairways Hit:</span>
                          <span className="font-medium">
                            {player.scores.filter(s => s.fairwayHit).length} / {player.scores.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Greens in Regulation:</span>
                          <span className="font-medium">
                            {player.scores.filter(s => s.greensInRegulation).length} / {player.scores.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Putts:</span>
                          <span className="font-medium">
                            {player.scores.reduce((sum, score) => sum + (score.putts || 0), 0)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeeTimeScoring;
