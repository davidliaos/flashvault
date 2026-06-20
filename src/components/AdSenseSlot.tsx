interface AdSenseSlotProps {
  slotId: string;
  width: number;
  height: number;
  className?: string;
}

export default function AdSenseSlot({
  slotId,
  width,
  height,
  className = "",
}: AdSenseSlotProps) {
  return (
    <div
      data-ad-slot={slotId}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={`border-2 border-dashed border-gray-700 bg-gray-900/50 flex items-center justify-center text-gray-600 text-xs font-medium ${className}`}
      aria-hidden="true"
    >
      {/* Replace with real AdSense code when approved */}
      Ad ({width}x{height})
    </div>
  );
}
