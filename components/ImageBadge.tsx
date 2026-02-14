'use client';

interface ImageBadgeProps {
  version: string;
  show: boolean;
}

export default function ImageBadge({ version, show }: ImageBadgeProps) {
  if (!show) return null;

  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap animate-fade-in">
      <div className="px-3 py-1 bg-[#3017A1]/80 border border-[#FFDC28]/40 rounded-full backdrop-blur-sm">
        <div className="text-[#FFDC28] text-xs font-mono font-bold">
          v{version}
        </div>
      </div>
    </div>
  );
}
