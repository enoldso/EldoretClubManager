import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingCalendar from "@/components/BookingCalendar";
import CaddieSelector from "@/components/CaddieSelector";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, UserPlus, X, CheckCircle, Users, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock member data
const mockMembers = [
  {
    id: 'M001',
    name: 'Dr. James Mwangi',
    email: 'james.mwangi@example.com',
    phone: '+254 712 345 678',
    avatar: '/avatars/avatar-1.jpg'
  },
  {
    id: 'M002',
    name: 'Sarah Wanjiku',
    email: 'sarah.w@example.com',
    phone: '+254 723 456 789',
    avatar: '/avatars/avatar-2.jpg'
  },
  {
    id: 'M003',
    name: 'Michael Ochieng',
    email: 'm.ochieng@example.com',
    phone: '+254 734 567 890',
    avatar: '/avatars/avatar-3.jpg'
  },
  {
    id: 'M004',
    name: 'Amina Hassan',
    email: 'a.hassan@example.com',
    phone: '+254 745 678 901',
    avatar: '/avatars/avatar-4.jpg'
  },
];

type InvitedMember = {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [selectedCaddies, setSelectedCaddies] = useState<string[]>([]);
  const [partySize, setPartySize] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [invitedMembers, setInvitedMembers] = useState<InvitedMember[]>([]);
  const [availableMembers, setAvailableMembers] = useState(mockMembers);

  const filteredMembers = availableMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const invitedIds = new Set(invitedMembers.map(m => m.id));
    setAvailableMembers(mockMembers.filter(member => !invitedIds.has(member.id)));
  }, [invitedMembers]);

  const handleInviteMember = (member: typeof mockMembers[0]) => {
    setInvitedMembers(prev => [
      ...prev, 
      {
        id: member.id,
        name: member.name,
        email: member.email,
        status: 'pending'
      }
    ]);
    setSearchTerm('');
  };

  const removeInvitedMember = (memberId: string) => {
    setInvitedMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const calculateCaddieFees = () => {
    const caddieRates = {
      "1": 50, // James Kipchoge
      "2": 60, // Peter Kimutai
      "3": 45, // David Korir
      "4": 55  // Michael Ruto
    };
    
    return selectedCaddies.reduce((total, caddieId) => {
      return total + (caddieRates[caddieId as keyof typeof caddieRates] || 0);
    }, 0);
  };

  const handleBooking = () => {
    if (selectedSlot && selectedCaddies.length > 0) {
      setShowConfirmation(true);
      console.log('Booking confirmed:', { 
        selectedSlot, 
        selectedCaddies,
        caddieFees: calculateCaddieFees(),
        partySize, 
        invitedMembers 
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (showConfirmation) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-serif">Booking Confirmed!</CardTitle>
            <CardDescription>Your tee time has been successfully reserved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-md text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Date & Time</p>
                  <p className="font-medium">
                    {selectedSlot?.date.toLocaleDateString()} at {selectedSlot?.time}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Party Size</p>
                  <p className="font-medium">{partySize} {partySize === 1 ? 'player' : 'players'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Caddie</p>
                  <p className="font-medium">Assigned</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Booking ID</p>
                  <p className="font-medium">BK-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                </div>
              </div>
              
              {invitedMembers.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-muted-foreground mb-2">Invited Members</p>
                  <div className="space-y-2">
                    {invitedMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/avatar-${member.id.slice(-1)}.jpg`} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            member.status === 'accepted' 
                              ? 'default' 
                              : member.status === 'declined' 
                                ? 'destructive' 
                                : 'outline'
                          }
                        >
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your registered email address.
              {invitedMembers.length > 0 && ' Invitations have been sent to the selected members.'}
            </p>
          </CardContent>
          <CardFooter className="flex gap-3 justify-center">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirmation(false)}
              data-testid="button-book-another"
            >
              Book Another
            </Button>
            <Button 
              onClick={handleBackToDashboard}
              data-testid="button-view-bookings"
            >
              View My Bookings
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-page-title">
          Book Tee Time
        </h1>
        <p className="text-muted-foreground">Reserve your preferred slot and caddie</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <BookingCalendar onSelectSlot={(date, time) => setSelectedSlot({ date, time })} />
          <CaddieSelector 
            selectedCaddies={selectedCaddies}
            onSelectCaddies={setSelectedCaddies}
            maxSelections={partySize + invitedMembers.length}
          />
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your selection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="party-size">Party Size</Label>
                  <span className="text-xs text-muted-foreground">
                    {partySize + invitedMembers.length} of 4 players
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="party-size"
                    type="number"
                    min="1"
                    max={4 - invitedMembers.length}
                    value={partySize}
                    onChange={(e) => setPartySize(Math.min(4 - invitedMembers.length, parseInt(e.target.value) || 1))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">players</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date & Time</span>
                  {selectedSlot ? (
                    <Badge variant="outline">
                      {selectedSlot.date.toLocaleDateString()} at {selectedSlot.time}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">Not selected</span>
                  )}
                </div>
                {selectedCaddies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Caddies</span>
                      <Badge variant="outline">{selectedCaddies.length} selected</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      {Array.from(new Set(selectedCaddies)).map(caddieId => {
                        const caddie = [
                          { id: "1", name: "James Kipchoge", rate: 50 },
                          { id: "2", name: "Peter Kimutai", rate: 60 },
                          { id: "3", name: "David Korir", rate: 45 },
                          { id: "4", name: "Michael Ruto", rate: 55 },
                        ].find(c => c.id === caddieId);
                        if (!caddie) return null;
                        const count = selectedCaddies.filter(id => id === caddieId).length;
                        return (
                          <div key={caddieId} className="flex justify-between pl-2">
                            <span className="text-muted-foreground">{caddie.name} ×{count}</span>
                            <span>${(caddie.rate * count).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${(45 * (partySize + invitedMembers.length)).toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">${45} per player</p>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Invite Members</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                    onClick={() => setShowMemberSearch(true)}
                    disabled={invitedMembers.length >= 3 || partySize + invitedMembers.length >= 4}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Invite {invitedMembers.length > 0 ? 'More' : ''}</span>
                  </Button>
                </div>

                {invitedMembers.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {invitedMembers.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/avatars/avatar-${member.id.slice(-1)}.jpg`} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeInvitedMember(member.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button 
                className="w-full mt-4" 
                size="lg"
                onClick={handleBooking}
                disabled={!selectedSlot || selectedCaddies.length === 0}
              >
                {invitedMembers.length > 0 ? 'Confirm Booking & Send Invites' : 'Confirm Booking'}
              </Button>

              {partySize + invitedMembers.length >= 4 && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Maximum of 4 players per booking
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Member Search Dialog */}
      {showMemberSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Invite Club Members</CardTitle>
              <CardDescription>Search and select members to invite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              
              <ScrollArea className="h-64 rounded-md border">
                {filteredMembers.length > 0 ? (
                  <div className="divide-y">
                    {filteredMembers.map((member) => (
                      <div 
                        key={member.id}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleInviteMember(member)}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Invite</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <p>No members found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowMemberSearch(false);
                  setSearchTerm('');
                }}
              >
                Done
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}