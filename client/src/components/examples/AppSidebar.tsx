import AppSidebar from '../AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar
          userType="member"
          userName="John Doe"
          onLogout={() => console.log('Logout')}
        />
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-serif">Main Content Area</h2>
          <p className="text-muted-foreground mt-2">The sidebar navigation is shown on the left</p>
        </div>
      </div>
    </SidebarProvider>
  );
}
