import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export const Scratcher = forwardRef(
  (props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
    const { children } = props;

    return (
      <div
        ref={ref}
        className="relative rounded-md border-4 border-yellow-300 overflow-hidden"
      >
        <div className="w-full h-full">{children}</div>
        <canvas
          id="scratch"
          width="320"
          height="320"
          className="absolute inset-0 w-full h-full text-center select-none"
        ></canvas>
      </div>
    );
  }
);
