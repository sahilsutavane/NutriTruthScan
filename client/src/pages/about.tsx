import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MicroscopeIcon, BrainIcon, BookIcon } from "lucide-react";

export default function About() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] overflow-auto">
      <div className="container mx-auto px-4 py-6 pb-24 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white"
            onClick={() => setLocation('/settings')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-xl font-bold text-white text-center">
            About
          </h1>

          <div className="w-10"></div> {/* Empty div for centering */}
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary/80 to-blue-400/80 mb-4 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">NT</h1>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">NutriTrust</h2>
            <p className="text-white/60 text-sm text-center">
              Your trusted companion for making informed health choices
            </p>
          </div>
          
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <p className="text-white leading-relaxed">
                NutriTrust was created to make everyone's life healthier by providing 
                immediate access to transparent ingredient information for food and 
                cosmetic products. We believe that everyone deserves to know what's 
                in the products they consume and use. 
              </p>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold text-white mt-8 mb-4">What We Do</h3>
          
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/5">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <MicroscopeIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Ingredient Analysis</h4>
                  <p className="text-white/70 text-sm">
                    Scan any product barcode for instant analysis of ingredients, potential allergens, and nutritional content.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/5">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <BrainIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Health Scoring</h4>
                  <p className="text-white/70 text-sm">
                    Every product receives comprehensive health scores based on nutritional value, processing levels, and ingredient quality.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/5">
              <CardContent className="p-4 flex items-start space-x-4">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <BookIcon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Educational Content</h4>
                  <p className="text-white/70 text-sm">
                    Learn about common ingredients, additives, and their potential impacts on health with our extensive educational resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-xl font-bold text-white mt-8 mb-4">Our Team</h3>
          <Card className="bg-white/5 border-white/5">
            <CardContent className="p-6">
              <p className="text-white/80 leading-relaxed">
                We are a dedicated team of nutritionists, data scientists, and developers who are passionate about creating technologies that empower people to make healthier choices. Together, we're building intuitive tools to bring ingredient transparency to everyone.
              </p>
            </CardContent>
          </Card>
          
          <div className="pt-6 text-center text-white/40 text-xs">
            © {new Date().getFullYear()} NutriTrust. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}