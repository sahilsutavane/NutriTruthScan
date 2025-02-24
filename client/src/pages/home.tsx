import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          NutriTrust
        </h1>
        <p className="text-muted-foreground">
          Scan food & cosmetic products to check their ingredients
        </p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle>Start Scanning</CardTitle>
          <CardDescription>
            Scan a product barcode to analyze its ingredients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/scan">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Scan className="mr-2 h-4 w-4" />
              Open Scanner
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Scans</h2>
        {products?.slice(0, 5).map((product) => (
          <Link key={product.id} href={`/product/${product.barcode}`}>
            <Card className="cursor-pointer hover:bg-primary/5 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.brand}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}