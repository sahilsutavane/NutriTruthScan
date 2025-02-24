
import { useState, useEffect } from 'react';

export function LogoAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${show ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center">
        <img 
          src="/logo.png" 
          alt="NutriTruth Logo" 
          className={`w-64 h-auto transform transition-transform duration-1000 ${show ? 'scale-110' : 'scale-100'}`}
        />
        <p className={`mt-4 text-white text-xl font-light transition-opacity duration-500 ${show ? 'opacity-0' : 'opacity-100'}`}>
          SCAN. KNOW. NOURISH
        </p>
      </div>
    </div>
  );
}
