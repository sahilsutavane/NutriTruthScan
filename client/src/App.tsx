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
import React, { useState, useEffect } from 'react';
import { LogoAnimation } from './components/logo-animation'; // Added import

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Scan} />
        <Route path="/home" component={Home} />
        <Route path="/scan" component={Scan} />
        <Route path="/product/:barcode" component={Product} />
        <Route path="/preferences" component={Preferences} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LogoAnimation /> {/* Placeholder for logo animation */}
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;