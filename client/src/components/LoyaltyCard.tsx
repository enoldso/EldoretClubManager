import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Gift } from "lucide-react";

export interface LoyaltyData {
  currentPoints: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  nextTier?: string;
  pointsToNextTier?: number;
  lifetimePoints: number;
}

interface LoyaltyCardProps {
  data: LoyaltyData;
}

export default function LoyaltyCard({ data }: LoyaltyCardProps) {
  const tierColors: Record<string, string> = {
    Bronze: "bg-amber-700 text-white",
    Silver: "bg-gray-400 text-gray-900",
    Gold: "bg-yellow-500 text-gray-900",
    Platinum: "bg-slate-800 text-white"
  };

  const progress = data.pointsToNextTier
    ? ((data.currentPoints % (data.pointsToNextTier + data.currentPoints)) / data.pointsToNextTier) * 100
    : 100;

  return (
    <Card className="overflow-hidden" data-testid="card-loyalty">
      <div className={`h-2 ${tierColors[data.tier]}`} />
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Loyalty Rewards
          </CardTitle>
          <Badge className={tierColors[data.tier]}>{data.tier} Member</Badge>
        </div>
        <CardDescription>Track and redeem your rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Current Points</p>
          <p className="text-4xl font-bold text-primary" data-testid="text-loyalty-points">
            {data.currentPoints.toLocaleString()}
          </p>
        </div>

        {data.nextTier && data.pointsToNextTier && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to {data.nextTier}</span>
              <span className="font-medium">{data.pointsToNextTier} points needed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Lifetime Points</p>
              <p className="font-medium">{data.lifetimePoints.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Gift className="h-4 w-4 text-primary mt-1" />
            <div>
              <p className="text-xs text-muted-foreground">Tier Benefits</p>
              <p className="font-medium">{data.tier === 'Platinum' ? '15%' : data.tier === 'Gold' ? '10%' : data.tier === 'Silver' ? '5%' : '0%'} discount</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
