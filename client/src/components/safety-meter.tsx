import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface SafetyMeterProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SafetyMeter({ score, size = 'md', className }: SafetyMeterProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Convert score (0-100) to rotation (-90 to 90 degrees)
    const newRotation = -90 + (score / 100) * 180;
    setRotation(newRotation);
  }, [score]);

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Speedometer Background */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full transform -rotate-90"
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="meter-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ef4444' }} />
            <stop offset="50%" style={{ stopColor: '#eab308' }} />
            <stop offset="100%" style={{ stopColor: '#22c55e' }} />
          </linearGradient>
        </defs>

        {/* Meter Background */}
        <path
          d="M40 160 A 80 80 0 1 1 160 160"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Colored Meter */}
        <path
          d="M40 160 A 80 80 0 1 1 160 160"
          fill="none"
          stroke="url(#meter-gradient)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke="white"
          strokeWidth="2"
          className="origin-bottom transform transition-transform duration-1000"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Center Point */}
        <circle cx="100" cy="100" r="8" fill="white" />
      </svg>

      {/* Score Display */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-2xl font-bold text-white">{score}</div>
        <div className="text-sm text-white/60">Safety Score</div>
      </div>
    </div>
  );
}
