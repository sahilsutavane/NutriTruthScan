import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IngredientList from "@/components/ingredient-list";
import type { Product } from "@shared/schema";

export default function Product() {
  const { barcode } = useParams();
  
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/barcode/${barcode}`],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <p className="text-muted-foreground">{product.brand}</p>
        </CardHeader>
        <CardContent>
          <IngredientList product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
