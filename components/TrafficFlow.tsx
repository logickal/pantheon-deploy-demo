'use client';

interface TrafficFlowProps {
  active: boolean;
  delay?: number;
}

export default function TrafficFlow({ active, delay = 0 }: TrafficFlowProps) {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Pulsing connection line */}
      <svg className="w-full h-full" style={{ animationDelay: `${delay}ms` }}>
        <defs>
          <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDC28" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DE0093" stopOpacity="0.8" />
          </linearGradient>

          {/* Animated gradient for pulse effect */}
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDC28" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FFDC28" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#DE0093" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        {/* Base line */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#trafficGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="opacity-40"
        />

        {/* Pulsing overlay */}
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#pulseGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          className="animate-pulse-glow"
        />
      </svg>

      {/* Flowing particles */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 bg-[#FFDC28] rounded-full shadow-lg shadow-[#FFDC28]/60 animate-traffic"></div>
    </div>
  );
}
