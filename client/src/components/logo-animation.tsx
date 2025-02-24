import { useState, useEffect } from 'react';

export function LogoAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center">
        <img 
          src="/logo.png" 
          alt="NutriTrust Logo" 
          className={`w-64 h-auto transform transition-transform duration-1000 ${show ? 'scale-100' : 'scale-110'}`}
        />
        <p className={`mt-4 text-white text-xl font-light transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
          SCAN. KNOW. NOURISH
        </p>
      </div>
    </div>
  );
}