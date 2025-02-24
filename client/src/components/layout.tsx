import { Link, useLocation } from "wouter";
import { Home, Scan, Settings } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">PureCheck</a>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            <Link href="/">
              <a className={`p-2 flex flex-col items-center ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Home className="h-6 w-6" />
                <span className="text-xs">Home</span>
              </a>
            </Link>
            <Link href="/scan">
              <a className={`p-2 flex flex-col items-center ${location === '/scan' ? 'text-primary' : 'text-muted-foreground'}`}>
                <Scan className="h-6 w-6" />
                <span className="text-xs">Scan</span>
              </a>
            </Link>
            <Link href="/preferences">
              <a className={`p-2 flex flex-col items-center ${location === '/preferences' ? 'text-primary' : 'text-muted-foreground'}`}>
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
