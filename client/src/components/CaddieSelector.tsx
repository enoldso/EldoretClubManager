import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Check } from "lucide-react";
import caddiePhoto from "@assets/generated_images/Caddie_profile_photo_78fc8f50.png";

interface Caddie {
  id: string;
  name: string;
  rating: number;
  experience: string;
  available: boolean;
  handicapRange: string;
  rate: number;
}

interface CaddieSelectorProps {
  caddies?: Caddie[];
  selectedCaddies?: string[];
  onSelectCaddies?: (caddieIds: string[]) => void;
  maxSelections?: number;
}

export default function CaddieSelector({ 
  caddies = [], 
  selectedCaddies = [], 
  onSelectCaddies,
  maxSelections = 4
}: CaddieSelectorProps) {
  const defaultCaddies: Caddie[] = caddies.length > 0 ? caddies : [
    { id: "1", name: "James Kipchoge", rating: 4.8, experience: "8 years", available: true, handicapRange: "0-15", rate: 50 },
    { id: "2", name: "Peter Kimutai", rating: 4.9, experience: "12 years", available: true, handicapRange: "All levels", rate: 60 },
    { id: "3", name: "David Korir", rating: 4.7, experience: "5 years", available: true, handicapRange: "15-30", rate: 45 },
    { id: "4", name: "Michael Ruto", rating: 4.6, experience: "6 years", available: true, handicapRange: "0-20", rate: 55 },
  ];

  const handleSelect = (caddieId: string, available: boolean) => {
    if (!available) return;
    
    const newSelectedCaddies = selectedCaddies.includes(caddieId)
      ? selectedCaddies.filter(id => id !== caddieId)
      : [...selectedCaddies, caddieId].slice(-maxSelections);
      
    onSelectCaddies?.(newSelectedCaddies);
  };

  return (
    <Card data-testid="card-caddie-selector">
      <CardHeader>
        <CardTitle>Select Your Caddie</CardTitle>
        <CardDescription>Choose from our professional caddie team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {defaultCaddies.map((caddie) => (
            <button
              key={caddie.id}
              onClick={() => handleSelect(caddie.id, caddie.available)}
              disabled={!caddie.available}
              className={`relative p-4 rounded-md border text-left transition-colors ${
                selectedCaddies.includes(caddie.id)
                  ? 'bg-primary/5 border-primary ring-1 ring-primary'
                  : caddie.available
                  ? 'hover-elevate active-elevate-2 bg-card hover:border-primary/50'
                  : 'opacity-60 cursor-not-allowed bg-muted'
              }`}
              data-testid={`button-caddie-${caddie.id}`}
            >
              {selectedCaddies.includes(caddie.id) && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={caddiePhoto} alt={caddie.name} />
                  <AvatarFallback>{caddie.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{caddie.name}</h4>
                    <span className="text-sm font-semibold text-primary">${caddie.rate}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-sm font-medium">{caddie.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({caddie.experience})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {caddie.handicapRange}
                    </Badge>
                    {caddie.available ? (
                      <Badge variant="outline" className="text-xs text-primary border-primary">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        Booked
                      </Badge>
                    )}
                  </div>
                  {selectedCaddies.includes(caddie.id) && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Selected for {selectedCaddies.filter(id => id === caddie.id).length} player{selectedCaddies.filter(id => id === caddie.id).length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        {selectedCaddies.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-2">
              {selectedCaddies.length} caddie{selectedCaddies.length > 1 ? 's' : ''} selected
            </div>
            <div className="space-y-2">
              {Array.from(new Set(selectedCaddies)).map(caddieId => {
                const caddie = defaultCaddies.find(c => c.id === caddieId);
                if (!caddie) return null;
                const count = selectedCaddies.filter(id => id === caddieId).length;
                return (
                  <div key={caddieId} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{caddie.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{count} × ${caddie.rate}</span>
                      <span className="font-medium">${(count * caddie.rate).toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center font-medium pt-2 mt-2 border-t">
                <span>Total Caddie Fees:</span>
                <span>
                  ${selectedCaddies.reduce((total, caddieId) => {
                    const caddie = defaultCaddies.find(c => c.id === caddieId);
                    return total + (caddie?.rate || 0);
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
