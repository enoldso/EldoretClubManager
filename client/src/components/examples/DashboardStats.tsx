import DashboardStats from '../DashboardStats';
import { Users, Calendar, TrendingUp, Award } from 'lucide-react';

export default function DashboardStatsExample() {
  const stats = [
    {
      title: "Total Members",
      value: "1,247",
      icon: Users,
      description: "Active memberships",
      trend: { value: 12, label: "from last month" }
    },
    {
      title: "Today's Bookings",
      value: "32",
      icon: Calendar,
      description: "Tee times scheduled",
      trend: { value: 8, label: "vs yesterday" }
    },
    {
      title: "Monthly Revenue",
      value: "$48,392",
      icon: TrendingUp,
      description: "Current month",
      trend: { value: 15, label: "from last month" }
    },
    {
      title: "Loyalty Points",
      value: "12,450",
      icon: Award,
      description: "Your total points"
    }
  ];

  return (
    <div className="p-6">
      <DashboardStats stats={stats} />
    </div>
  );
}
