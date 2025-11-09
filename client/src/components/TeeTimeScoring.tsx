import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle, AlertCircle, User, Lock } from 'lucide-react';
import { format } from 'date-fns';

type TeeTime = {
  id: string;
  date: string;
  course: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  players: {
    id: string;
    name: string;
    handicap: number;
    isScorer: boolean;
  }[];
};

type HoleScore = {
  holeNumber: number;
  score: number | null;
  putts: number | null;
  fairwayHit: boolean | null;
  greensInRegulation: boolean | null;
  sandSave: boolean | null;
};

type PlayerScores = {
  [playerId: string]: {
    name: string;
    handicap: number;
    scores: HoleScore[];
    total: number;
    verified: boolean;
  };
};

export function TeeTimeScoring() {
  const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
  const [selectedTeeTime, setSelectedTeeTime] = useState<TeeTime | null>(null);
  const [scores, setScores] = useState<PlayerScores>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [verificationCode, setVerificationCode] = useState('');
  const { toast } = useToast();

  // Fetch tee times
  useEffect(() => {
    const fetchTeeTimes = async () => {
      try {
        const response = await fetch('/api/tee-times');
        if (!response.ok) throw new Error('Failed to fetch tee times');
        const data = await response.json();
        setTeeTimes(data);
        
        // Auto-select the first in-progress tee time, or the next upcoming one
        const inProgress = data.find((tt: TeeTime) => tt.status === 'in_progress');
        if (inProgress) {
          setSelectedTeeTime(inProgress);
          fetchScores(inProgress.id);
        } else if (data.length > 0) {
          setSelectedTeeTime(data[0]);
          fetchScores(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching tee times:', error);
        toast({
          title: 'Error',
          description: 'Failed to load tee times',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeeTimes();
  }, []);

  const fetchScores = async (teeTimeId: string) => {
    try {
      const response = await fetch(`/api/tee-times/${teeTimeId}/scores`);
      if (!response.ok) throw new Error('Failed to fetch scores');
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error('Error fetching scores:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scores',
        variant: 'destructive',
      });
    }
  };

  const handleScoreChange = (
    playerId: string, 
    holeNumber: number, 
    field: keyof HoleScore, 
    value: number | boolean | null
  ) => {
    setScores(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        scores: prev[playerId].scores.map(score => 
          score.holeNumber === holeNumber 
            ? { ...score, [field]: value } 
            : score
        ),
        total: field === 'score' && typeof value === 'number' 
          ? prev[playerId].scores.reduce(
              (sum, s) => sum + (s.holeNumber === holeNumber ? value : s.score || 0), 
              0
            )
          : prev[playerId].total
      }
    }));
  };

  const handleSaveScores = async () => {
    if (!selectedTeeTime) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/tee-times/${selectedTeeTime.id}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores }),
      });

      if (!response.ok) throw new Error('Failed to save scores');
      
      toast({
        title: 'Success',
        description: 'Scores saved successfully',
      });
    } catch (error) {
      console.error('Error saving scores:', error);
      toast({
        title: 'Error',
        description: 'Failed to save scores',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerifyScores = async (playerId: string) => {
    if (!verificationCode) {
      toast({
        title: 'Verification Required',
        description: 'Please enter a verification code',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/tee-times/${selectedTeeTime?.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerId, 
          verificationCode,
          verified: true 
        }),
      });

      if (!response.ok) throw new Error('Verification failed');
      
      setScores(prev => ({
        ...prev,
        [playerId]: {
          ...prev[playerId],
          verified: true
        }
      }));
      
      setVerificationCode('');
      
      toast({
        title: 'Success',
        description: 'Scores verified successfully',
      });
    } catch (error) {
      console.error('Error verifying scores:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify scores. Please check the verification code.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!selectedTeeTime) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No Tee Times Found</h2>
        <p className="text-muted-foreground">You don't have any upcoming tee times.</p>
      </div>
    );
  }

  const holes = Array.from({ length: 18 }, (_, i) => i + 1);
  const players = selectedTeeTime.players || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tee Time Scoring</h2>
          <p className="text-muted-foreground">
            {format(new Date(selectedTeeTime.date), 'EEEE, MMMM d, yyyy')} • {selectedTeeTime.course}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveScores} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : 'Save Scores'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
          <TabsTrigger value="verification">Score Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scorecard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hole</TableHead>
                      {holes.map(hole => (
                        <TableHead key={hole} className="text-center w-12">
                          {hole}
                        </TableHead>
                      ))}
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map(player => {
                      const playerScores = scores[player.id]?.scores || [];
                      const total = playerScores.reduce(
                        (sum, score) => sum + (score.score || 0), 
                        0
                      );
                      
                      return (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {player.name}
                              {player.isScorer && (
                                <span className="text-xs text-muted-foreground">(Scorer)</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              HCP: {player.handicap}
                            </div>
                          </TableCell>
                          
                          {holes.map(holeNumber => {
                            const holeScore = playerScores.find(s => s.holeNumber === holeNumber) || 
                              { holeNumber, score: null, putts: null, fairwayHit: null, greensInRegulation: null, sandSave: null };
                            
                            return (
                              <TableCell key={`${player.id}-${holeNumber}`} className="p-1">
                                <Input
                                  type="number"
                                  min="1"
                                  className="w-12 h-8 text-center"
                                  value={holeScore.score || ''}
                                  onChange={(e) => 
                                    handleScoreChange(
                                      player.id, 
                                      holeNumber, 
                                      'score', 
                                      e.target.value ? parseInt(e.target.value, 10) : null
                                    )
                                  }
                                />
                              </TableCell>
                            );
                          })}
                          
                          <TableCell className="text-right font-medium">
                            {total || 0}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Score Verification</CardTitle>
              <p className="text-sm text-muted-foreground">
                Verify scores with other players using their verification code
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="outline" disabled={!verificationCode}>
                    Verify All
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ask the player for their verification code to confirm their scores
                </p>
              </div>

              <div className="space-y-4">
                {players.map(player => {
                  const isVerified = scores[player.id]?.verified;
                  
                  return (
                    <div 
                      key={`verify-${player.id}`}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {isVerified ? 'Verified' : 'Pending verification'}
                          </p>
                        </div>
                      </div>
                      
                      {isVerified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerifyScores(player.id)}
                          disabled={!verificationCode}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
