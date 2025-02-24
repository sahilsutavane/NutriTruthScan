import { Link, useLocation } from "wouter";
import { Home, Scan, Settings } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home">
            <a className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              NutriTrust
            </a>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link href="/home">
              <a className={`p-2 flex flex-col items-center ${location === '/home' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary/80 transition-colors'}`}>
                <Home className="h-6 w-6" />
                <span className="text-xs">Home</span>
              </a>
            </Link>
            <Link href="/">
              <a className={`p-2 flex flex-col items-center ${location === '/' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary/80 transition-colors'}`}>
                <Scan className="h-6 w-6" />
                <span className="text-xs">Scan</span>
              </a>
            </Link>
            <Link href="/preferences">
              <a className={`p-2 flex flex-col items-center ${location === '/preferences' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary/80 transition-colors'}`}>
                <Settings className="h-6 w-6" />
                <span className="text-xs">Preferences</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}