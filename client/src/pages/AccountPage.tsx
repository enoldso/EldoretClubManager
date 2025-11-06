import MembershipCard from "@/components/MembershipCard";
import NotificationPanel from "@/components/NotificationPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const memberData = {
    name: "John Doe",
    memberId: "EC2024-1247",
    memberSince: "Jan 2020",
    membershipType: "Individual" as const,
    status: "Active" as const,
    expiryDate: "Dec 31, 2025",
    handicap: 12
  };

  const notifications = [
    {
      id: "1",
      type: "booking" as const,
      title: "Tee Time Confirmed",
      message: "Your booking for March 15, 2025 at 9:00 AM has been confirmed.",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: "2",
      type: "event" as const,
      title: "New Event: Spring Championship",
      message: "Registration now open for the Spring Championship 2025.",
      timestamp: "1 day ago",
      read: false
    },
    {
      id: "3",
      type: "payment" as const,
      title: "Payment Received",
      message: "Your payment of $150.00 has been processed successfully.",
      timestamp: "2 days ago",
      read: true
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-page-title">
          My Account
        </h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MembershipCard member={memberData} onRenew={() => console.log('Renew membership')} />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" data-testid="tab-profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications" data-testid="tab-notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security" data-testid="tab-security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" data-testid="input-first-name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" data-testid="input-last-name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+254 712 345 678" data-testid="input-phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="handicap">Handicap Index</Label>
                    <Input id="handicap" type="number" defaultValue="12" data-testid="input-handicap" />
                  </div>
                  <Button data-testid="button-save-profile">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={(id) => console.log('Mark as read:', id)}
              />
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" data-testid="input-current-password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" data-testid="input-new-password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" data-testid="input-confirm-password" />
                  </div>
                  <Button data-testid="button-change-password">Change Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
