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

        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="white"
          className="drop-shadow-lg"
        />

        {/* Tick Marks */}
        {Array.from({ length: 21 }).map((_, i) => {
          const angle = -90 + (i * 180) / 20;
          const isLarge = i % 5 === 0;
          const tickLength = isLarge ? 15 : 10;
          const x1 = 100 + (70 * Math.cos((angle * Math.PI) / 180));
          const y1 = 100 + (70 * Math.sin((angle * Math.PI) / 180));
          const x2 = 100 + ((70 - tickLength) * Math.cos((angle * Math.PI) / 180));
          const y2 = 100 + ((70 - tickLength) * Math.sin((angle * Math.PI) / 180));

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#meter-gradient)`}
              strokeWidth={isLarge ? 2 : 1}
              opacity={0.6}
            />
          );
        })}

        {/* Main Meter Arc */}
        <path
          d="M40 160 A 80 80 0 1 1 160 160"
          fill="none"
          stroke="url(#meter-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Needle */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px' }}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke="#1a1b1e"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="8"
            fill="#1a1b1e"
          />
        </g>
      </svg>

      {/* Score Display */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-2xl font-bold text-[#1a1b1e]">{score}</div>
        <div className="text-sm text-gray-600">Safety Score</div>
      </div>
    </div>
  );
}