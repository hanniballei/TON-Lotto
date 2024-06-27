import PngLightSun from "@/assets/lobby/light-sun.png";
import PngBigWin from "@/assets/lobby/big-win.png";
import PngCollectBtn from "@/assets/lobby/collect-btn.png";
import { ForwardedRef, LegacyRef, forwardRef } from "react";

export const CongratsDialog = forwardRef(
  (
    {
      onCollect,
      countUpRef,
    }: {
      onCollect: () => void;
      countUpRef: LegacyRef<HTMLSpanElement>;
    },
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <dialog ref={ref} className="bg-transparent overflow-hidden">
        <div className="flex flex-col gap-4 justify-center items-center p-6 rounded-md ">
          <div className="relative h-[400px] w-full">
            <img
              src={PngLightSun}
              className="absolute w-[800px] inset-0 mx-auto animate-spin"
              style={{
                animationDuration: "8000ms",
              }}
            />

            <img
              src={PngBigWin}
              className="relative z-10 h-[200px] mt-[100px] mx-auto"
            />
          </div>
          <p
            className=" text-6xl font-bold -mt-[100px]"
            style={{
              color: "rgb(252, 188, 0)",
            }}
          >
            <span ref={countUpRef} />
          </p>
          <button
            onClick={() => onCollect()}
            className="text-slate-50 text-sm p-6 m-0 outline-none"
            style={{
              background: `url(${PngCollectBtn}) no-repeat center`,
              backgroundSize: "contain",
            }}
          >
            COLLECT
          </button>
        </div>
      </dialog>
    );
  }
);
