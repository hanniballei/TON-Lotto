import { cn } from "@/lib/utils";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";
import { type ClassValue } from "clsx";

export const Scratcher = forwardRef(
  (
    props: PropsWithChildren<{
      className?: ClassValue;
      style?: React.CSSProperties;
    }>,
    ref: ForwardedRef<HTMLCanvasElement>
  ) => {
    const { children, className, style } = props;

    return (
      <div className={cn("relative", className)} style={style}>
        <div className="w-full h-full">{children}</div>
        <canvas
          ref={ref}
          className="absolute inset-0 w-full h-full text-center select-none"
        ></canvas>
      </div>
    );
  }
);
