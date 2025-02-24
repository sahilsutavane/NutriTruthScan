import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import IngredientList from "@/components/ingredient-list";
import type { Product } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
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
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex items-center justify-center">
        <div className="text-white">Product not found</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] overflow-auto">
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          className="text-white mb-6"
          onClick={() => setLocation('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Scanner
        </Button>

        <Card className="bg-white/10 border-white/5">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{product.name}</h1>
                <p className="text-gray-400">{product.brand}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
                <IngredientList product={product} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}