import { Link } from "wouter";
import { Button } from "./ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31]">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-4">
            <Link href="/">
              <span className="text-white font-medium hover:text-white/80 cursor-pointer">Home</span>
            </Link>
            <Link href="/scan">
              <span className="text-white/60 hover:text-white/80 cursor-pointer">Scanner</span>
            </Link>
            <Link href="/preferences">
              <span className="text-white/60 hover:text-white/80 cursor-pointer">Preferences</span>
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}