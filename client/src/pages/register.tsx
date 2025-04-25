import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const registerMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest.post("/api/users", {
        username: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      setLocation("/login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="NutriTruth" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome To NutriTruth</h1>
          <p className="text-gray-600">Find products that aligns with your dietary and health needs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center">
            <span className="text-gray-600">OR</span>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.4338 7.33444H16.7508H9.08417V10.6276H13.9246C13.4746 11.7276 12.3696 12.8276 9.08417 12.8276C6.43917 12.8276 4.27917 10.6276 4.27917 8.0026C4.27917 5.3776 6.43917 3.1776 9.08417 3.1776C10.5842 3.1776 11.6292 3.7526 12.3342 4.4226L14.8792 1.9526C13.3842 0.577598 11.3842 -0.122402 9.08417 0.0276015C4.13917 0.0276015 0.0841751 4.0026 0.0841751 8.0026C0.0841751 12.0026 4.13917 15.9776 9.08417 15.9776C13.8342 15.9776 17.4342 12.7776 17.4342 8.0026C17.4342 7.5776 17.4342 7.5276 17.4342 7.3346L17.4338 7.33444Z" fill="#4285F4"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setLocation("/login")}
              className="text-green-500 hover:underline"
            >
              Sign In here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}