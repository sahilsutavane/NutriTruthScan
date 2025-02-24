import { useLocation } from "wouter";
import MockScanner from "@/components/mock-scanner";

export default function Scan() {
  const [, setLocation] = useLocation();

  const handleScan = (barcode: string) => {
    setLocation(`/product/${barcode}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Scan Product</h1>
        <p className="text-muted-foreground">
          Position the barcode within the scanner
        </p>
      </div>

      <MockScanner onScan={handleScan} />
    </div>
  );
}
