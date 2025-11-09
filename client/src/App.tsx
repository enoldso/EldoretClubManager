import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import EditMemberPage from "@/pages/EditMemberPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import LoginForm from "@/components/LoginForm";
import MemberDashboard from "@/pages/MemberDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AddMemberPage from "@/pages/AddMemberPage";
import BookingPage from "@/pages/BookingPage";
import BookTeeTime from "@/pages/BookTeeTime";
import DiningPage from "@/pages/DiningPage";
import EventsPage from "@/pages/EventsPage";
import LoyaltyPage from "@/pages/LoyaltyPage";
import AccountPage from "@/pages/AccountPage";
import TournamentsPage from "@/pages/TournamentsPage";
import GolfAcademy from "@/pages/GolfAcademy";
import HandicapPage from "@/pages/HandicapPage";
import MembersManagement from "@/pages/MembersManagement";
import TeeTimesManagement from "@/pages/TeeTimesManagement";
import TournamentsManagement from "@/pages/TournamentsManagement";
import DiningManagement from "@/pages/admin/DiningManagement";
import EventsManagement from "@/pages/admin/EventsManagement";
import CourseSetup from "@/pages/admin/CourseSetup";
import StaffManagement from "@/pages/admin/StaffManagement";
import BillingManagement from "@/pages/admin/BillingManagement";
import AnalyticsManagement from "@/pages/admin/AnalyticsManagement";
import SettingsManagement from "@/pages/admin/SettingsManagement";
import TeeTimeScoring from "@/pages/TeeTimeScoring";
import NotFound from "@/pages/not-found";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function TestCredentials() {
  return (
    <Card className="mt-4 bg-muted/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Test Credentials</CardTitle>
        <CardDescription className="text-xs">Use these credentials to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div>
          <p className="font-medium">Member Login:</p>
          <p className="text-muted-foreground">Email: member@eldoretclub.com</p>
          <p className="text-muted-foreground">Password: member123</p>
        </div>
        <div className="pt-2 border-t">
          <p className="font-medium">Admin Login:</p>
          <p className="text-muted-foreground">Email: admin@eldoretclub.com</p>
          <p className="text-muted-foreground">Password: admin123</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Router({ userType }: { userType: "member" | "admin" }) {
  return (
    <Switch>
      <Route path="/" component={userType === "member" ? MemberDashboard : AdminDashboard} />
      
      {/* Member Routes */}
      {userType === "member" && (
        <>
          <Route path="/dashboard" component={MemberDashboard} />
          <Route path="/book-tee-time" component={BookTeeTime} />
          <Route path="/my-bookings" component={BookingPage} />
          <Route path="/dining" component={DiningPage} />
          <Route path="/events" component={EventsPage} />
          <Route path="/academy" component={GolfAcademy} />
          <Route path="/tournaments" component={TournamentsPage} />
          <Route path="/handicap" component={HandicapPage} />
          <Route path="/profile" component={AccountPage} />
          <Route path="/tee-time-scoring" component={TeeTimeScoring} />
        </>
      )}

      {/* Admin Routes */}
      {userType === "admin" && (
        <>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/members/new" component={AddMemberPage} />
          <Route path="/admin/members/edit/:id" component={EditMemberPage} />
          <Route path="/admin/members" component={MembersManagement} />
          <Route path="/admin/tee-times" component={TeeTimesManagement} />
          <Route path="/admin/tournaments" component={TournamentsManagement} />
          <Route path="/admin/dining" component={DiningManagement} />
          <Route path="/admin/events" component={EventsManagement} />
          <Route path="/admin/course-setup" component={CourseSetup} />
          <Route path="/admin/staff" component={StaffManagement} />
          <Route path="/admin/billing" component={BillingManagement} />
          <Route path="/admin/analytics" component={AnalyticsManagement} />
          <Route path="/admin/settings" component={SettingsManagement} />
          <Route path="/admin/members" component={MembersManagement} />
          <Route path="/admin/members/new" component={AddMemberPage} />
          <Route path="/admin/members/edit/:id" component={EditMemberPage} />
          {/* Redirect old routes to new admin routes */}
          <Route path="/members" component={() => {
            // Redirect to the new admin members route
            window.location.href = '/admin/members';
            return null;
          }} />
          <Route path="/bookings" component={() => <div className="p-6">Bookings Management - Coming Soon</div>} />
          <Route path="/caddies" component={() => <div className="p-6">Caddies Management - Coming Soon</div>} />
        </>
      )}
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginType, setLoginType] = useState<"member" | "admin">("member");
  const [currentUserType, setCurrentUserType] = useState<"member" | "admin">("member");

  const handleLogin = (username: string, password: string) => {
    console.log('Login attempt:', username, password, loginType);
    setIsLoggedIn(true);
    setCurrentUserType(loginType);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('Logged out');
  };

  const handleSwitchType = () => {
    setLoginType(loginType === "member" ? "admin" : "member");
  };

  if (!isLoggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen">
            <LoginForm
              type={loginType}
              onLogin={handleLogin}
              onSwitchType={handleSwitchType}
            />
            <div className="fixed bottom-4 right-4 max-w-sm">
              <TestCredentials />
            </div>
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar
              userType={currentUserType}
              userName={currentUserType === "member" ? "John Doe" : "Admin User"}
              onLogout={handleLogout}
            />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b bg-background">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                  <Router userType={currentUserType} />
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
