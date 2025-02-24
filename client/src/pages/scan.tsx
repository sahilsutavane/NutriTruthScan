import { useLocation } from "wouter";
import MockScanner from "@/components/mock-scanner";

export default function Scan() {
  const [, setLocation] = useLocation();

  const handleScan = (barcode: string) => {
    setLocation(`/product/${barcode}`);
  };

  return (
    <div className="min-h-screen -mt-16 flex flex-col">
      <div className="flex-1 flex items-center justify-center bg-black/5">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Scan Product
            </h1>
            <p className="text-muted-foreground">
              Position the barcode within the scanner
            </p>
          </div>

          <MockScanner onScan={handleScan} />
        </div>
      </div>
    </div>
  );
}