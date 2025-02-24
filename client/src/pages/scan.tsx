import { useLocation } from "wouter";
import MockScanner from "@/components/mock-scanner";

export default function Scan() {
  const [, setLocation] = useLocation();

  const handleScan = (barcode: string) => {
    setLocation(`/product/${barcode}`);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1A1B1E] to-[#2C2D31] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Scan Barcode
            </h1>
            <p className="text-gray-400 mt-2">
              Position barcode in the center of the frame
            </p>
          </div>

          <MockScanner onScan={handleScan} />
        </div>
      </div>
    </div>
  );
}