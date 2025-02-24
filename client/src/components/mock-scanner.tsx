
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { searchProductByBarcode } from '@/lib/openfoodfacts';
import { apiRequest } from '@/lib/queryClient';
import { BrowserMultiFormatReader } from '@zxing/library';

interface MockScannerProps {
  onScan: (barcode: string) => void;
}

export default function MockScanner({ onScan }: MockScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();
  const { toast } = useToast();

  const startScan = async () => {
    try {
      setIsScanning(true);
      codeReader.current = new BrowserMultiFormatReader();
      const videoInputDevices = await codeReader.current.listVideoInputDevices();
      
      if (videoInputDevices.length === 0) {
        throw new Error('No camera devices found');
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;
      
      toast({
        title: "Scanning...",
        description: "Hold steady while we scan the barcode",
      });

      await codeReader.current.decodeFromVideoDevice(
        selectedDeviceId, 
        videoRef.current!, 
        async (result) => {
          if (result) {
            const barcode = result.getText();
            try {
              // Try to fetch from Open Food Facts
              const openFoodFactsProduct = await searchProductByBarcode(barcode);

              if (openFoodFactsProduct) {
                // Save to our backend
                await apiRequest('POST', '/api/products', openFoodFactsProduct);
              }
              
              setIsScanning(false);
              stopScanning();
              onScan(barcode);
            } catch (error) {
              console.error('Error processing product:', error);
              setIsScanning(false);
              stopScanning();
              onScan(barcode);
            }
          }
        }
      );
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setIsScanning(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] bg-muted rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {isScanning ? (
          <>
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute w-full h-1 bg-primary animate-[scan_2s_ease-in-out_infinite]" />
            <Button onClick={stopScanning} className="absolute bottom-4 bg-destructive text-destructive-foreground">
              Stop Scanning
            </Button>
          </>
        ) : (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Button onClick={startScan} className="bg-primary text-primary-foreground">
              Start Scanning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
