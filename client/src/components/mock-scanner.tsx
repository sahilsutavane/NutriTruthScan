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
    <div className="relative w-full aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 flex items-center justify-center">
        {isScanning ? (
          <>
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-6 border-2 border-white/30 rounded-xl">
              <div className="absolute inset-0 border-2 border-primary/50 rounded-xl" />
              <div className="absolute left-0 right-0 h-0.5 bg-primary top-1/2 -translate-y-1/2 animate-[scan_2s_ease-in-out_infinite]" />
            </div>
            <Button 
              onClick={stopScanning} 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Stop Scanning
            </Button>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <Button 
              onClick={startScan} 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              Start Scanning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}