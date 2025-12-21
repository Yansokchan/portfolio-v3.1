import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import CSSBox, { CSSBoxRef } from "@/components/fancy/blocks/css-box";

const BoxText = ({
  children,
  className,
  i,
}: {
  children: React.ReactNode;
  className?: string;
  i: number;
}) => (
  <div
    className={cn(
      "w-full h-full uppercase text-white flex items-center justify-center p-0 text-sm md:text-base font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-500 ",
      className
    )}
  >
    {children}
  </div>
);

export default function CSSBoxHoverDemo() {
  const boxRefs = useRef<(CSSBoxRef | null)[]>([]);
  const isRotating = useRef<boolean[]>([]);
  const currentRotations = useRef<number[]>([]);

  const boxes = [
    {
      text: "Focus on concepts and logic",
    },
    {
      text: "Languages and frameworks come and go",
    },
  ];

  useEffect(() => {
    currentRotations.current = new Array(boxes.length).fill(0);
  }, []);

  const handleHover = async (index: number) => {
    if (isRotating.current[index]) return;

    isRotating.current[index] = true;
    const box = boxRefs.current[index];
    if (!box) return;

    const nextRotation = currentRotations.current[index] + 90;
    currentRotations.current[index] = nextRotation;

    box.rotateTo(0, nextRotation);

    isRotating.current[index] = false;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-transparent py-10 gap-1 px-7">
      {boxes.map(({ text }, index) => (
        <CSSBox
          key={index}
          ref={(el) => {
            if (el) {
              boxRefs.current[index] = el;
              isRotating.current[index] = false;
              currentRotations.current[index] = 0;
            }
          }}
          width={400}
          height={35}
          depth={400}
          draggable={false}
          className="hover:z-10"
          onMouseEnter={() => handleHover(index)}
          faces={{
            front: <BoxText i={index}>{text}</BoxText>,
            back: <BoxText i={index}>{text}</BoxText>,
            left: <BoxText i={index}>{text}</BoxText>,
            right: <BoxText i={index}>{text}</BoxText>,
            // bottom: <BoxText i={index}>{text}</BoxText>,
          }}
        />
      ))}
    </div>
  );
}
