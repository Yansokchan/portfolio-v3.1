import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type OrbitingCirclesProps = {
  children: ReactNode;
  className?: string;
  showRings?: boolean;
  ringRadii?: number[]; // px values for visible rings
};

type OrbitingCircleProps = {
  children: ReactNode;
  radius: number; // px
  size?: number; // px
  duration?: number; // seconds per rotation
  reverse?: boolean;
  startAngleDeg?: number;
  className?: string;
};

export function OrbitingCircles({
  children,
  className,
  showRings = true,
  ringRadii,
}: OrbitingCirclesProps) {
  return (
    <div className={cn("pointer-events-none relative", className)}>
      {showRings && (
        <div className="absolute inset-0">
          {(ringRadii ?? []).map((r, i) => (
            <div
              key={`ring-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
              style={{
                width: r * 2,
                height: r * 2,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export function OrbitingCircle({
  children,
  radius,
  size = 44,
  duration = 20,
  reverse,
  startAngleDeg = 0,
  className,
}: OrbitingCircleProps) {
  const direction = reverse ? -1 : 1;
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: radius * 2,
        height: radius * 2,
        transform: "translate(-50%, -50%)",
        animation: `orbit-rotate ${duration}s linear infinite`,
        animationDirection: direction === 1 ? "normal" : "reverse",
        // start angle offset
        rotate: `${startAngleDeg}deg`,
      }}
    >
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 0 }}>
        <div
          className={cn(
            "pointer-events-auto rounded-xl bg-black/60 backdrop-blur border border-white/10 shadow-md flex items-center justify-center",
            className
          )}
          style={{ width: size, height: size }}
        >
          {children}
        </div>
      </div>
      <style>{`
        @keyframes orbit-rotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
    </div>
  );
}

