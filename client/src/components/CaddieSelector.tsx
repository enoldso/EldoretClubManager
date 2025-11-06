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
}

interface CaddieSelectorProps {
  caddies?: Caddie[];
  onSelectCaddie?: (caddieId: string) => void;
}

export default function CaddieSelector({ caddies = [], onSelectCaddie }: CaddieSelectorProps) {
  const [selectedCaddie, setSelectedCaddie] = useState<string | null>(null);

  const defaultCaddies: Caddie[] = caddies.length > 0 ? caddies : [
    { id: "1", name: "James Kipchoge", rating: 4.8, experience: "8 years", available: true, handicapRange: "0-15" },
    { id: "2", name: "Peter Kimutai", rating: 4.9, experience: "12 years", available: true, handicapRange: "All levels" },
    { id: "3", name: "David Korir", rating: 4.7, experience: "5 years", available: false, handicapRange: "15-30" },
    { id: "4", name: "Michael Ruto", rating: 4.6, experience: "6 years", available: true, handicapRange: "0-20" },
  ];

  const handleSelect = (caddieId: string, available: boolean) => {
    if (!available) return;
    setSelectedCaddie(caddieId);
    onSelectCaddie?.(caddieId);
    console.log('Selected caddie:', caddieId);
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
                selectedCaddie === caddie.id
                  ? 'bg-primary/5 border-primary'
                  : caddie.available
                  ? 'hover-elevate active-elevate-2 bg-card'
                  : 'opacity-60 cursor-not-allowed bg-muted'
              }`}
              data-testid={`button-caddie-${caddie.id}`}
            >
              {selectedCaddie === caddie.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={caddiePhoto} alt={caddie.name} />
                  <AvatarFallback>{caddie.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{caddie.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
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
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
