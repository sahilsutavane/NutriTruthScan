import { Link, useLocation } from "wouter";
import { ScanIcon, HomeIcon, HistoryIcon, SettingsIcon } from "lucide-react";
import { useAuth } from "../App";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  // Don't show navigation on login/register screens
  const isAuthPage = location === "/login" || location === "/register" || location === "/";

  // Helper to determine if a route is active
  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] pb-16">
      {/* Main content */}
      <div className="container mx-auto px-0">
        {children}
      </div>

      {/* Bottom Navigation Bar - only show when authenticated and not on auth pages */}
      {isAuthenticated && !isAuthPage && (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 z-50 shadow-lg px-2 py-1">
          <div className="flex items-center justify-around h-16 max-w-md mx-auto">
            <Link href="/scan">
              <div className={`flex flex-col items-center transition-all cursor-pointer ${isActive("/scan") 
                ? "text-primary scale-110 font-medium" 
                : "text-white/60 hover:text-white/80"}`}>
                <div className={`rounded-full p-2 ${isActive("/scan") 
                  ? "bg-primary/20" 
                  : "bg-transparent"}`}>
                  <ScanIcon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1">Scan</span>
              </div>
            </Link>
            
            <Link href="/home">
              <div className={`flex flex-col items-center transition-all cursor-pointer ${isActive("/home") 
                ? "text-primary scale-110 font-medium" 
                : "text-white/60 hover:text-white/80"}`}>
                <div className={`rounded-full p-2 ${isActive("/home") 
                  ? "bg-primary/20" 
                  : "bg-transparent"}`}>
                  <HomeIcon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1">Home</span>
              </div>
            </Link>
            
            <Link href="/history">
              <div className={`flex flex-col items-center transition-all cursor-pointer ${isActive("/history") 
                ? "text-primary scale-110 font-medium" 
                : "text-white/60 hover:text-white/80"}`}>
                <div className={`rounded-full p-2 ${isActive("/history") 
                  ? "bg-primary/20" 
                  : "bg-transparent"}`}>
                  <HistoryIcon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1">History</span>
              </div>
            </Link>
            
            <Link href="/settings">
              <div className={`flex flex-col items-center transition-all cursor-pointer ${isActive("/settings") 
                ? "text-primary scale-110 font-medium" 
                : "text-white/60 hover:text-white/80"}`}>
                <div className={`rounded-full p-2 ${isActive("/settings") 
                  ? "bg-primary/20" 
                  : "bg-transparent"}`}>
                  <SettingsIcon className="w-5 h-5" />
                </div>
                <span className="text-xs mt-1">Settings</span>
              </div>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}