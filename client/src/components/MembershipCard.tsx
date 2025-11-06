import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, User } from "lucide-react";

export interface MemberData {
  name: string;
  memberId: string;
  memberSince: string;
  membershipType: "Individual" | "Family" | "Corporate";
  status: "Active" | "Expiring Soon" | "Expired";
  expiryDate: string;
  handicap?: number;
}

interface MembershipCardProps {
  member: MemberData;
  onRenew?: () => void;
}

export default function MembershipCard({ member, onRenew }: MembershipCardProps) {
  const statusColors: Record<string, string> = {
    Active: "bg-primary text-primary-foreground",
    "Expiring Soon": "bg-chart-2 text-white",
    Expired: "bg-destructive text-destructive-foreground"
  };

  return (
    <Card className="overflow-hidden" data-testid="card-membership">
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-serif mb-1" data-testid="text-member-name">{member.name}</h3>
            <p className="text-sm opacity-90">Member #{member.memberId}</p>
          </div>
          <Badge className={statusColors[member.status]}>{member.status}</Badge>
        </div>
        {member.handicap !== undefined && (
          <div className="inline-block bg-primary-foreground/20 px-4 py-2 rounded-md">
            <p className="text-xs opacity-90">Handicap</p>
            <p className="text-2xl font-bold" data-testid="text-member-handicap">{member.handicap}</p>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="font-medium">{member.membershipType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="font-medium">{member.memberSince}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-md">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Expires</p>
              <p className="font-medium text-sm" data-testid="text-member-expiry">{member.expiryDate}</p>
            </div>
          </div>
          {member.status !== "Active" && (
            <Button size="sm" onClick={onRenew} data-testid="button-renew">
              Renew Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
