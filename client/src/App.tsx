import { Switch, Route, useLocation } from "wouter";
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
import React, { useState, useEffect } from 'react';
import { LogoAnimation } from './components/logo-animation';

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

function Router() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location);

  // If user is not authenticated and tries to access a protected route, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute && location !== '/') {
      // Don't redirect from the root path to avoid infinite loops during initial load
      window.location.href = '/login';
    }
  }, [isAuthenticated, isPublicRoute, location]);

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

import { ChatBot } from './components/chat-bot';

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
        <Router />
        <Toaster />
      </QueryClientProvider>
      <ChatBot />
    </AuthContext.Provider>
  );
}

export default App;