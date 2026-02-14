'use client';

interface ContainerProps {
  state: 'building' | 'ready' | 'active' | 'dimming' | 'retired';
  delay?: number;
  label?: string;
}

export default function Container({ state, delay = 0, label }: ContainerProps) {
  const stateStyles = {
    building: 'animate-spawn animate-fade-in-container',
    ready: 'opacity-80',
    active: 'opacity-100 shadow-[0_0_30px_rgba(255,220,40,0.6)]',
    dimming: 'opacity-40 animate-fade-out',
    retired: 'opacity-0',
  };

  const glowStyles = {
    building: 'from-[#5F41E5] to-[#3017A1]',
    ready: 'from-[#5F41E5] to-[#3017A1]',
    active: 'from-[#FFDC28] to-[#DE0093]',
    dimming: 'from-gray-500 to-gray-700',
    retired: 'from-gray-800 to-gray-900',
  };

  return (
    <div
      className={`relative w-20 h-24 ${stateStyles[state]} transition-all duration-800`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Container block */}
      <div className={`w-full h-full rounded-lg bg-gradient-to-br ${glowStyles[state]} border-2 border-white/20 backdrop-blur-sm relative overflow-hidden`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glowStyles[state]} opacity-50 blur-md ${state === 'active' ? 'animate-pulse-glow' : ''}`}></div>

        {/* Container icon/detail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-white/40 rounded flex items-center justify-center">
            <div className="w-8 h-8 border border-white/30 rounded-sm"></div>
          </div>
        </div>

        {/* Building state indicator */}
        {state === 'building' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFDC28] animate-pulse"></div>
        )}

        {/* Active pulse indicator */}
        {state === 'active' && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFDC28] rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Label */}
      {label && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-400 font-mono">
          {label}
        </div>
      )}
    </div>
  );
}
