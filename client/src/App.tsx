import React, { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Scan from "@/pages/scan";
import Product from "@/pages/product";
import Preferences from "@/pages/preferences";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Register from "@/pages/register";
import History from "@/pages/history";
import Settings from "@/pages/settings";
import About from "@/pages/about";
import { LogoAnimation } from './components/logo-animation';
import { ChatBot } from './components/chat-bot';

// Simple auth context to manage authentication state
const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

// Router component separated to fix hook call issues
function RouterComponent({ isAuthenticated }: { isAuthenticated: boolean }) {
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  
  // Check the current location and redirect if needed
  useEffect(() => {
    const path = window.location.pathname;
    if (!isAuthenticated && !publicRoutes.includes(path) && path !== '/') {
      // Don't redirect from the root path to avoid infinite loops during initial load
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Switch>
        {/* Public routes */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        
        {/* Protected routes - require authentication in a real app */}
        <Route path="/" component={Scan} />
        <Route path="/home" component={Home} />
        <Route path="/scan" component={Scan} />
        <Route path="/product/:barcode" component={Product} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/history" component={History} />
        <Route path="/settings" component={Settings} />
        <Route path="/about" component={About} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  // For demo purposes, we'll default to authenticated
  // In a real app, this would check session storage or tokens
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <QueryClientProvider client={queryClient}>
        <LogoAnimation /> {/* Placeholder for logo animation */}
        <RouterComponent isAuthenticated={isAuthenticated} />
        <Toaster />
      </QueryClientProvider>
      <ChatBot />
    </AuthContext.Provider>
  );
}

export default App;