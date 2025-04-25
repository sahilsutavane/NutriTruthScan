import { Link, useLocation } from "wouter";
import { ScanIcon, HomeIcon, HistoryIcon, SettingsIcon } from "lucide-react";
import { useAuth } from "../App";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  // Don't show navigation on login/register screens
  const isAuthPage = location === "/login" || location === "/register";

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
        <nav className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-lg border-t border-white/10 z-50">
          <div className="flex items-center justify-around h-16">
            <Link href="/scan">
              <a className={`flex flex-col items-center ${isActive("/scan") ? "text-primary" : "text-white/60"} transition-colors`}>
                <ScanIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Scan</span>
              </a>
            </Link>
            
            <Link href="/home">
              <a className={`flex flex-col items-center ${isActive("/home") ? "text-primary" : "text-white/60"} transition-colors`}>
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </a>
            </Link>
            
            <Link href="/history">
              <a className={`flex flex-col items-center ${isActive("/history") ? "text-primary" : "text-white/60"} transition-colors`}>
                <HistoryIcon className="w-6 h-6" />
                <span className="text-xs mt-1">History</span>
              </a>
            </Link>
            
            <Link href="/settings">
              <a className={`flex flex-col items-center ${isActive("/settings") ? "text-primary" : "text-white/60"} transition-colors`}>
                <SettingsIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Settings</span>
              </a>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}