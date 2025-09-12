import { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode; // list of icons
  className?: string;
  radius?: number; // px
  speed?: number; // seconds per full rotation
  reverse?: boolean;
  iconSize?: number; // px
  showRing?: boolean;
};

// MagicUI-compatible orbiting circles: evenly places children around a circle and rotates smoothly
export function OrbitingCircles({
  children,
  className,
  radius = 140,
  speed = 20,
  reverse = false,
  iconSize = 40,
  showRing = true,
}: Props) {
  const items = (Array.isArray(children) ? children : [children]).filter(
    Boolean
  ) as ReactElement[];

  const count = items.length || 1;
  const step = 360 / count;
  const direction = reverse ? "reverse" : "normal";

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {showRing && (
        <div
          className="absolute left-1/2 top-1/2 rounded-full border-cosmic-cyan/15"
          style={{
            width: radius * 2,
            height: radius * 2,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: radius * 2,
          height: radius * 2,
          transform: "translate(-50%, -50%)",
          animation: `orbit-rotate ${speed}s linear infinite`,
          animationDirection: direction,
        }}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              width: radius * 2.3,
              height: radius * 2.3,
              transform: `translate(-50%, -50%) rotate(${index * step}deg)`,
            }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: 0 }}
            >
              <div
                className="pointer-events-auto rounded-xl border border-white/10 -m-1 shadow-md flex items-center justify-center text-white"
                style={{ width: iconSize, height: iconSize }}
              >
                {child}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes orbit-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
