import PngLightSun from "@/assets/lobby/light-sun.png";
import PngSharePoster from "@/assets/poster/share-poster.png";
import PngBgPoster from "@/assets/poster/bg-poster.png";
import { ForwardedRef, forwardRef } from "react";
import PngLuckyButton from "@/assets/app/lucky-btn.png";

export const FreeScratchDialog = forwardRef(
  (
    {
      confirmText,
      onConfirm,
      onMaskClick,
    }: {
      confirmText?: string;
      onConfirm: () => void;
      onMaskClick?: () => void;
    },
    ref: ForwardedRef<HTMLDialogElement>
  ) => {
    return (
      <dialog
        ref={ref}
        className="fixed inset-0 bg-transparent overflow-hidden z-[999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={onMaskClick}
        />

        <div
          className="relative z-[999] w-[80vw] max-w-[600px] rounded-xl overflow-hidden"
          style={{
            background: `url(${PngBgPoster}) no-repeat center`,
            backgroundSize: "contain",
          }}
        >
          <div className="flex flex-col gap-4 justify-center items-center p-6 py-4 rounded-md ">
            <p className="text-white text-xl font-bold text-center">
              {/* Free scratch card for you! */}
              Scratch by fingers to play
            </p>
            <div className="relative w-full">
              <img
                src={PngLightSun}
                className="absolute w-screen inset-0 max-w-screen animate-spin"
                style={{
                  animationDuration: "8000ms",
                }}
              />

              <img
                src={PngSharePoster}
                className="relative z-10 w-3/5 opacity-95 mx-auto rounded-lg"
              />
            </div>

            <p className=" text-slate-50 text-sm text-center">
              Earn chips instantly for each new friend who joins and scratches!
            </p>

            <button
              onClick={() => onConfirm()}
              className="text-slate-50 text-sm font-bold p-6 py-2 rounded-full outline-none"
              style={{
                background: `url(${PngLuckyButton}) no-repeat center`,
                backgroundSize: "contain",
              }}
            >
              {confirmText || "SCRATCH"}
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
