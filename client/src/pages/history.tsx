import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryIcon, ArrowLeft, Search, Filter, AlertTriangle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Product } from "@shared/schema";

export default function History() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock scan history data - in a real implementation, this would come from the API
  const { data: scanHistory, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/scan-history"],
    queryFn: () => {
      // Mock implementation - this would actually fetch from the backend
      return Promise.resolve([]);
    },
    staleTime: 60000,
  });

  // Filter products based on search term
  const filteredHistory = searchTerm && scanHistory 
    ? scanHistory.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    : scanHistory;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] overflow-auto">
      <div className="container mx-auto px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            className="text-white"
            onClick={() => setLocation('/scan')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-xl font-bold text-white text-center bg-gradient-to-br from-primary to-blue-400 bg-clip-text text-transparent">
            Scan History
          </h1>

          <div className="w-10"></div> {/* Empty div for centering */}
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border-white/10 text-white pr-10 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-white/60"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Scan History */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-white">Loading scan history...</div>
            </div>
          ) : filteredHistory && filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <HistoryItem key={item.id} product={item} onClick={() => setLocation(`/product/${item.barcode}`)} />
            ))
          ) : (
            <EmptyHistory searchTerm={searchTerm} />
          )}
        </div>
      </div>
    </div>
  );
}

// Component for each history item
function HistoryItem({ product, onClick }: { product: Product; onClick: () => void }) {
  return (
    <Card 
      className="bg-white/5 hover:bg-white/10 border-white/5 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-3 flex items-center">
        <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden flex-shrink-0 mr-3">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <HistoryIcon className="w-6 h-6 text-white/30" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">{product.name}</h3>
          <p className="text-white/60 text-xs">{product.brand}</p>
        </div>
        
        <div className="ml-3 flex-shrink-0">
          {product.analysis.riskLevel === "low" ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : product.analysis.riskLevel === "medium" ? (
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Component shown when history is empty
function EmptyHistory({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
        <HistoryIcon className="w-8 h-8 text-white/30" />
      </div>
      
      {searchTerm ? (
        <>
          <h3 className="text-white font-medium">No results found</h3>
          <p className="text-white/60 text-sm mt-1 max-w-xs">
            We couldn't find any products matching "{searchTerm}" in your scan history.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-white font-medium">No scan history yet</h3>
          <p className="text-white/60 text-sm mt-1 max-w-xs">
            Start scanning products to build your history. Your recently scanned items will appear here.
          </p>
        </>
      )}
    </div>
  );
}