import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Calendar, 
  UtensilsCrossed, 
  CalendarDays, 
  Award, 
  User,
  Users,
  ChefHat,
  CreditCard,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clubLogo from "@assets/Club logo_1762184298518.jpg";

interface AppSidebarProps {
  userType: "member" | "admin";
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export default function AppSidebar({ userType, userName = "User", userAvatar, onLogout }: AppSidebarProps) {
  const memberMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "#dashboard" },
    { title: "Book Tee Time", icon: Calendar, url: "#booking" },
    { title: "Dining", icon: UtensilsCrossed, url: "#dining" },
    { title: "Events", icon: CalendarDays, url: "#events" },
    { title: "Loyalty Rewards", icon: Award, url: "#loyalty" },
    { title: "My Account", icon: User, url: "#account" },
  ];

  const adminMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "#dashboard" },
    { title: "Members", icon: Users, url: "#members" },
    { title: "Bookings", icon: Calendar, url: "#bookings" },
    { title: "Caddies", icon: User, url: "#caddies" },
    { title: "Dining", icon: ChefHat, url: "#dining" },
    { title: "Events", icon: CalendarDays, url: "#events" },
    { title: "Billing", icon: CreditCard, url: "#billing" },
    { title: "Analytics", icon: BarChart3, url: "#analytics" },
    { title: "Settings", icon: Settings, url: "#settings" },
  ];

  const menuItems = userType === "member" ? memberMenuItems : adminMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <img src={clubLogo} alt="Eldoret Club" className="h-10 w-10 rounded-full" />
          <div>
            <h2 className="font-serif font-semibold text-lg">Eldoret Club</h2>
            <p className="text-xs text-muted-foreground">Est. 1924</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {userType === "member" ? "Member Portal" : "Admin Panel"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s/g, '-')}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground">{userType === "member" ? "Member" : "Administrator"}</p>
          </div>
        </div>
        <SidebarMenuButton onClick={onLogout} data-testid="button-logout">
          <LogOut />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
