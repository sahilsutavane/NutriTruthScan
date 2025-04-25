import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Moon, Sun, LogOut, Bell, UserIcon, ShieldAlert, Lock, ExternalLink } from "lucide-react";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] overflow-auto">
      <div className="container mx-auto px-4 py-6 pb-24 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white"
            onClick={() => setLocation('/scan')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-xl font-bold text-white text-center">
            Settings
          </h1>

          <div className="w-10"></div> {/* Empty div for centering */}
        </div>

        <div className="space-y-4">
          {/* Theme Settings */}
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Display</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="text-white/60 w-5 h-5" /> : <Sun className="text-white/60 w-5 h-5" />}
                  <Label htmlFor="dark-mode" className="text-white">Dark Mode</Label>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="text-white/60 w-5 h-5" />
                  <Label htmlFor="notifications" className="text-white">Push Notifications</Label>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldAlert className="text-white/60 w-5 h-5" />
                  <Label htmlFor="data-collection" className="text-white">Allow Data Collection</Label>
                </div>
                <Switch 
                  id="data-collection" 
                  checked={dataCollection}
                  onCheckedChange={setDataCollection}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="bg-white/5 border-white/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <UserIcon className="text-white/60 w-5 h-5" />
                  <span className="text-white">Profile Information</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white/60">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <Lock className="text-white/60 w-5 h-5" />
                  <span className="text-white">Change Password</span>
                </div>
                <Button variant="ghost" size="icon" className="text-white/60">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="destructive"
                className="w-full mt-2 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  // Sign out logic would go here
                  setLocation('/login');
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="bg-white/5 border-white/5">
            <CardContent className="pt-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/5"
                onClick={() => setLocation('/about')}
              >
                About NutriTrust
              </Button>
            </CardContent>
          </Card>

          <div className="text-center text-white/40 text-xs pt-4">
            NutriTrust v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}