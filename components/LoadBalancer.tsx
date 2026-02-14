'use client';

interface LoadBalancerProps {
  active?: boolean;
}

export default function LoadBalancer({ active = true }: LoadBalancerProps) {
  return (
    <div className="relative">
      {/* Load Balancer Node - Smaller, less prominent */}
      <div className={`w-20 h-12 rounded-lg bg-gradient-to-br from-[#0F62FE] to-[#3017A1] border border-[#FFDC28]/20 shadow-md ${active ? 'shadow-[#FFDC28]/30' : ''} relative overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFDC28]/10 to-transparent opacity-40 blur-md"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="text-white text-[9px] font-normal tracking-wide opacity-60">Balancer</div>

          {/* Activity indicator */}
          {active && (
            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#FFDC28] rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Network lines decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFDC28]/30 to-transparent"></div>
      </div>
    </div>
  );
}
