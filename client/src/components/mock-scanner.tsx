import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { BrowserMultiFormatReader } from '@zxing/library';
import { searchProductByBarcode } from '@/lib/openfoodfacts';
import { apiRequest } from '@/lib/queryClient';

interface MockScannerProps {
  onScan: (barcode: string) => void;
}

export default function MockScanner({ onScan }: MockScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();
  const { toast } = useToast();

  // Check for camera availability on mount
  useEffect(() => {
    checkCameraAvailability();
  }, []);

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasCamera(videoDevices.length > 0);
    } catch (error) {
      console.error('Error checking camera:', error);
      setHasCamera(false);
    }
  };

  const startScan = async () => {
    try {
      setIsScanning(true);

      if (!hasCamera) {
        throw new Error('No camera available');
      }

      codeReader.current = new BrowserMultiFormatReader();
      const videoInputDevices = await codeReader.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error('No camera devices found');
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;

      await codeReader.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current!,
        async (result) => {
          if (result) {
            const barcode = result.getText();
            try {
              const openFoodFactsProduct = await searchProductByBarcode(barcode);
              if (openFoodFactsProduct) {
                await apiRequest('POST', '/api/products', openFoodFactsProduct);
              }
              setIsScanning(false);
              stopScanning();
              onScan(barcode);
            } catch (error) {
              console.error('Error processing product:', error);
              toast({
                title: "Error",
                description: "Could not process the product. Please try again.",
                variant: "destructive",
              });
              setIsScanning(false);
              stopScanning();
            }
          }
        }
      );
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: hasCamera 
          ? "Could not access camera. Please check permissions."
          : "No camera detected. Please use a device with a camera.",
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  // Fallback UI when no camera is available
  if (hasCamera === false) {
    return (
      <div className="relative aspect-[3/4] bg-black/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-400 mb-4">
            No camera detected
          </div>
          <p className="text-gray-400 text-sm">
            Please use a device with a camera to scan products
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] bg-black/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <div className="absolute inset-0">
        {isScanning ? (
          <>
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover opacity-90" />
            <div className="absolute inset-8 flex items-center justify-center">
              <div className="w-full h-full max-w-md border-2 border-primary/30 rounded-3xl relative">
                <div className="absolute inset-0 border-2 border-primary rounded-3xl opacity-50" />
                <div className="absolute inset-x-0 h-1 bg-primary/80 top-1/2 -translate-y-1/2 animate-[scan_2s_ease-in-out_infinite]" />
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-3xl" />
              </div>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <Button 
                onClick={stopScanning} 
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur"
              >
                Cancel Scan
              </Button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              onClick={startScan}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg"
            >
              Start Scanning
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}