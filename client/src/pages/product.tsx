import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import IngredientList from "@/components/ingredient-list";
import type { Product } from "@shared/schema";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Product() {
  const { barcode } = useParams();
  const [, setLocation] = useLocation();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/barcode/${barcode}`],
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-white">Loading product information...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex flex-col items-center justify-center">
        <div className="text-white text-center space-y-4">
          <div className="text-red-400 text-2xl">Product not found</div>
          <p className="text-gray-400 max-w-sm mx-auto">
            We couldn't find this product in our database. Please try scanning another product.
          </p>
          <Button 
            className="mt-4 bg-primary hover:bg-primary/90"
            onClick={() => setLocation('/scan')}
          >
            <Camera className="mr-2 h-4 w-4" />
            Scan Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] overflow-auto">
      <div className="container mx-auto px-4 py-6 pb-20 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white"
            onClick={() => setLocation('/scan')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scanner
          </Button>
          
          <h1 className="text-xl font-bold text-white text-center bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent">
            NutriTrust
          </h1>

          <div className="w-10"></div> {/* Empty div for centering */}
        </div>

        <Card className="bg-gradient-to-b from-white/10 to-white/5 border-white/5 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Product Header - Shows risk level with background color */}
            <div className={`p-6 ${getRiskLevelColor(product.analysis.riskLevel)}`}>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{product.name}</h1>
                <p className="text-white/80">{product.brand}</p>
                
                {/* Risk Badge */}
                <div className="inline-flex items-center mt-2 bg-black/20 text-white rounded-full px-3 py-1 text-sm">
                  <span className="mr-1">Risk Level:</span>
                  <span className="font-semibold capitalize">{product.analysis.riskLevel}</span>
                </div>
                
                {/* Size Badge - If available */}
                {product.size && (
                  <div className="inline-flex items-center ml-2 mt-2 bg-black/20 text-white rounded-full px-3 py-1 text-sm">
                    {product.size}
                  </div>
                )}
              </div>
            </div>

            {/* Ingredient Analysis */}
            <div className="px-6 py-4">
              <IngredientList product={product} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to get background color based on risk level
function getRiskLevelColor(riskLevel: "low" | "medium" | "high"): string {
  switch (riskLevel) {
    case "low":
      return "bg-gradient-to-r from-green-600 to-green-700";
    case "medium":
      return "bg-gradient-to-r from-orange-600 to-orange-700";
    case "high":
      return "bg-gradient-to-r from-red-600 to-red-700";
    default:
      return "bg-gradient-to-r from-blue-600 to-blue-700";
  }
}