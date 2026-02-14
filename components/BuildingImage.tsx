'use client';

interface BuildingImageProps {
  building?: boolean;
}

export default function BuildingImage({ building = true }: BuildingImageProps) {
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Image Label - Above */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="text-[#5F41E5] text-xs font-bold tracking-widest">
          {building ? 'BUILDING IMAGE' : 'CONTAINER IMAGE'}
        </div>
      </div>

      {/* Container Image Icon */}
      <div className="relative w-full h-full rounded-xl border-2 border-[#5F41E5] bg-gradient-to-br from-[#23232D] to-[#3017A1] overflow-hidden">
        {/* Filling animation from bottom to top - only when building */}
        {building && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#5F41E5] via-[#FFDC28]/50 to-transparent animate-fill-up opacity-80"></div>
        )}

        {/* Sparkle particles - only when building */}
        {building && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-[#FFDC28] rounded-full animate-sparkle shadow-sm shadow-[#FFDC28]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${0.8 + Math.random() * 1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Image icon layers */}
        <div className="absolute inset-3 flex flex-col gap-1.5 items-center justify-center opacity-60">
          {/* Stacked layers representing image layers */}
          <div className="w-full h-2 bg-white/20 rounded border border-white/30"></div>
          <div className="w-full h-2 bg-white/20 rounded border border-white/30"></div>
          <div className="w-full h-2 bg-white/20 rounded border border-white/30"></div>
        </div>

        {/* Glow effect - only pulse when building */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#FFDC28]/30 via-transparent to-[#5F41E5]/30 blur-xl opacity-60 ${building ? 'animate-pulse' : ''}`}></div>
      </div>

      {/* Label */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="text-[#FFDC28] text-xs font-mono font-bold">master</div>
      </div>
    </div>
  );
}
