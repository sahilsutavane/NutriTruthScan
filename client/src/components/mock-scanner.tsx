import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MockScannerProps {
  onScan: (barcode: string) => void;
}

export default function MockScanner({ onScan }: MockScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const timeoutRef = useRef<number>();
  const { toast } = useToast();

  const startScan = () => {
    setIsScanning(true);
    toast({
      title: "Scanning...",
      description: "Hold steady while we scan the barcode",
    });

    // Simulate scanning delay
    timeoutRef.current = window.setTimeout(() => {
      setIsScanning(false);
      // For demo, randomly select one of our sample product barcodes
      const sampleBarcodes = ["123456789", "987654321"];
      const randomBarcode = sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)];
      onScan(randomBarcode);
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
