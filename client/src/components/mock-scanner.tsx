import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { searchProductByBarcode } from '@/lib/openfoodfacts';
import { apiRequest } from '@/lib/queryClient';

interface MockScannerProps {
  onScan: (barcode: string) => void;
}

export default function MockScanner({ onScan }: MockScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const timeoutRef = useRef<number>();
  const { toast } = useToast();

  const startScan = async () => {
    setIsScanning(true);
    toast({
      title: "Scanning...",
      description: "Hold steady while we scan the barcode",
    });

    // Simulate scanning delay
    timeoutRef.current = window.setTimeout(async () => {
      // For demo, randomly select one of our sample product barcodes
      const sampleBarcodes = ["737628064502", "3017620422003", "123456789", "987654321"];
      const randomBarcode = sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)];

      try {
        // Try to fetch from Open Food Facts
        const openFoodFactsProduct = await searchProductByBarcode(randomBarcode);

        if (openFoodFactsProduct) {
          // Save to our backend
          await apiRequest('POST', '/api/products', openFoodFactsProduct);
        }

        setIsScanning(false);
        onScan(randomBarcode);
      } catch (error) {
        console.error('Error processing product:', error);
        setIsScanning(false);
        // Fall back to sample products
        onScan(randomBarcode);
      }
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {isScanning ? (
          <div className="w-full h-1 bg-primary animate-[scan_2s_ease-in-out_infinite]" />
        ) : (
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <Button onClick={startScan} className="bg-primary text-primary-foreground">
              Start Scanning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}