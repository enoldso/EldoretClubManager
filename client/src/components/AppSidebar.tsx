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
  Utensils, 
  CalendarDays, 
  Trophy,
  User,
  Users,
  Flag,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Home,
  GraduationCap,
  UserCog,
  ShoppingBag,
  Clock
} from "lucide-react";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clubLogo from "@assets/Club logo_1762184298518.jpg";

interface AppSidebarProps {
  userType: "member" | "admin";
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export default function AppSidebar({ userType, userName = "User", userAvatar, onLogout }: AppSidebarProps) {
  const [location, navigate] = useLocation();

  const memberMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
    { title: "Book Tee Time", icon: Flag, url: "/book-tee-time" },
    { title: "My Bookings", icon: Calendar, url: "/my-bookings" },
    { title: "Golf Shop", icon: ShoppingBag, url: "/shop" },
    { title: "Dining", icon: Utensils, url: "/dining" },
    { title: "Events", icon: CalendarDays, url: "/events" },
    { title: "Golf Academy", icon: GraduationCap, url: "/academy" },
    { title: "Tournaments", icon: Trophy, url: "/tournaments" },
    { title: "My Handicap", icon: BookOpen, url: "/handicap" },
    { title: "My Profile", icon: User, url: "/profile" },
  ];

  const adminMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
    { title: "Members", icon: Users, url: "/admin/members" },
    { title: "Tee Times", icon: Clock, url: "/admin/tee-times" },
    { title: "Tournaments", icon: Trophy, url: "/admin/tournaments" },
    { title: "Golf Shop", icon: ShoppingBag, url: "/admin/shop" },
    { title: "Dining", icon: Utensils, url: "/admin/dining" },
    { title: "Events", icon: CalendarDays, url: "/admin/events" },
    { title: "Course Setup", icon: Flag, url: "/admin/course-setup" },
    { title: "Staff", icon: UserCog, url: "/admin/staff" },
    { title: "Billing", icon: CreditCard, url: "/admin/billing" },
    { title: "Analytics", icon: BarChart3, url: "/admin/analytics" },
    { title: "Settings", icon: Settings, url: "/admin/settings" },
  ];

  // Update active state to handle nested routes
  const isActive = (url: string) => {
    if (url === '/') return location === '/';
    return location === url || location.startsWith(`${url}/`);
  };

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
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="w-full justify-start"
                  >
                    <a 
                      href={item.url} 
                      className="flex items-center gap-3 w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                      data-testid={`link-${item.title.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
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
        <SidebarMenuButton 
          onClick={(e) => {
            e.preventDefault();
            onLogout?.();
          }} 
          data-testid="button-logout"
          className="w-full justify-start"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
