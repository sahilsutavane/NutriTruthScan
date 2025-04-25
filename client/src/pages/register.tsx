import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, UserPlusIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Custom Google icon to match design
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4338 7.33444H16.7508H9.08417V10.6276H13.9246C13.4746 11.7276 12.3696 12.8276 9.08417 12.8276C6.43917 12.8276 4.27917 10.6276 4.27917 8.0026C4.27917 5.3776 6.43917 3.1776 9.08417 3.1776C10.5842 3.1776 11.6292 3.7526 12.3342 4.4226L14.8792 1.9526C13.3842 0.577598 11.3842 -0.122402 9.08417 0.0276015C4.13917 0.0276015 0.0841751 4.0026 0.0841751 8.0026C0.0841751 12.0026 4.13917 15.9776 9.08417 15.9776C13.8342 15.9776 17.4342 12.7776 17.4342 8.0026C17.4342 7.5776 17.4342 7.5276 17.4342 7.3346L17.4338 7.33444Z" fill="#4285F4"/>
      <path d="M1.02637 4.32753L3.89136 6.45253C4.46636 4.55253 6.59136 3.17751 9.08385 3.17751C10.5839 3.17751 11.6289 3.75253 12.3339 4.42253L14.8789 1.95251C13.3839 0.577515 11.3839 -0.122502 9.08385 0.0275145C5.60135 0.0275145 2.61635 1.75253 1.02637 4.32753Z" fill="#EA4335"/>
      <path d="M9.08414 15.9778C11.3341 15.9778 13.3041 15.3278 14.8241 14.0278L12.0291 11.7778C11.3541 12.2528 10.4091 12.8278 9.08414 12.8278C5.81414 12.8278 3.05414 10.7778 2.54414 8.03784L-0.365845 10.2128C1.20415 13.6028 4.89414 15.9778 9.08414 15.9778Z" fill="#34A853"/>
      <path d="M17.4338 7.33444H16.7508H9.08417V10.6276H13.9246C13.7046 11.1526 13.3246 11.6776 12.8046 12.0776C12.8046 12.0776 12.8046 12.0776 12.8046 12.0776L15.5996 14.3276C15.4296 14.4826 17.6996 12.7776 17.6996 8.00259C17.6996 7.57759 17.4338 7.33444 17.4338 7.33444Z" fill="#4285F4"/>
      <path d="M2.54422 8.03788C2.41922 7.61288 2.35422 7.16288 2.35422 6.68788C2.35422 6.26287 2.41922 5.81288 2.52922 5.3879L2.52422 5.33788L-0.366754 3.13287L-0.390755 3.16288C-0.865755 4.61288 -1.11577 6.16288 -0.890757 7.78788C-0.665757 9.41288 -0.265755 10.1279 -0.265755 10.1279L2.54422 8.03788Z" fill="#FBBC05"/>
    </svg>
  );
}

export default function Register() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = useMutation({
    mutationFn: (userData: { username: string; password: string }) => 
      apiRequest({
        url: '/api/users',
        method: 'POST',
        data: userData
      }),
    onSuccess: () => {
      setLocation('/login');
    },
    onError: (error: any) => {
      setError(error.message || "Registration failed. Please try again.");
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }

    registerMutation.mutate({ 
      username: email, // Using email as username 
      password 
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent">
            NutriTrust
          </h1>
          <p className="text-white/60 text-sm mt-2">Let's get started by filling out the form below.</p>
        </div>

        <Card className="bg-white/10 border-white/5 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription className="text-white/60">
              Let's get started by filling out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UserPlusIcon size={18} className="mr-2" />
                    Create Account
                  </span>
                )}
              </Button>
            </form>
            
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="px-4 text-white/60 text-sm">OR</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-white/10 text-white hover:bg-white/5"
              onClick={() => alert("Google signup would be implemented here")}
            >
              <GoogleIcon />
              <span className="ml-2">Sign up with Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-white/60 text-sm">
              Already have an account? 
              <button 
                onClick={() => setLocation('/login')} 
                className="text-primary hover:underline ml-1"
              >
                Sign in
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}