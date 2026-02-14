'use client';

interface LoadBalancerProps {
  active?: boolean;
}

export default function LoadBalancer({ active = true }: LoadBalancerProps) {
  return (
    <div className="relative">
      {/* Load Balancer Node */}
      <div className={`w-32 h-20 rounded-xl bg-gradient-to-br from-[#0F62FE] to-[#3017A1] border-2 border-[#FFDC28]/30 shadow-lg ${active ? 'shadow-[#FFDC28]/40' : ''} relative overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFDC28]/20 to-transparent opacity-50 blur-lg"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="text-white text-xs font-bold tracking-wider mb-1">LOAD</div>
          <div className="text-white text-xs font-bold tracking-wider">BALANCER</div>

          {/* Activity indicator */}
          {active && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFDC28] rounded-full animate-pulse"></div>
          )}
        </div>

        {/* Network lines decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFDC28]/50 to-transparent"></div>
      </div>
    </div>
  );
}
