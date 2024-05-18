import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { CircleX } from "lucide-react";
import { useCountUp } from "react-countup";
import LobbyBox from "@/assets/lobby/lobby-box.png";
import { useScratcher } from "@/lib/hooks/useScratcher";

const Lobby = () => {
  const [prizeValue, setPrizeValue] = useState<string[]>([]);

  const congratsDialog = useRef<HTMLDialogElement>(null);
  const countUpRef = useRef<HTMLSpanElement>(null);

  const { initializeCanvas, revealCanvas, scratchedPercent } = useScratcher({
    canvas: "#scratch",
    initializeCallback(element, context) {
      setPrizeValue(
        new Array(12).fill(0).map(() => (Math.random() * 10 > 5 ? "🐶" : "🐸"))
      );

      const image = new Image();
      image.src = LobbyBox;
      image.onload = function () {
        const cols = 4; // 列数
        const rows = 3; // 行数
        const imageWidth = 60; // 固定图片宽度
        const imageHeight = 60; // 固定图片高度

        const cellWidth = element.width / cols;
        const cellHeight = element.height / rows;

        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            const centerX = x * cellWidth + (cellWidth - imageWidth) / 2;
            const centerY = y * cellHeight + (cellHeight - imageHeight) / 2;
            context.drawImage(image, centerX, centerY, imageWidth, imageHeight);
          }
        }
      };
    },
    autoRevalPercent: 75,
  });

  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: prizeValue.filter((it) => it === "🐸").length * 1000,
    delay: 0,
    duration: 1,
  });

  useEffect(() => {
    if (scratchedPercent === 100) {
      // 中奖提示
      congratsDialog.current?.showModal();
      start();
    }
  }, [scratchedPercent, start]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="relative rounded-md w-full h-[320px] border-4 border-yellow-300 overflow-hidden">
          <div className="w-full h-full grid grid-cols-4">
            {prizeValue.map((it) => (
              <div className="flex justify-center items-center">{it}</div>
            ))}
          </div>
          <canvas
            id="scratch"
            className="absolute inset-0 w-full h-full text-center select-none"
          ></canvas>
        </div>

        <div className="font-bold">Percent {scratchedPercent.toFixed(2)} %</div>
        <Button onClick={initializeCanvas}>Restart</Button>
        <Button onClick={revealCanvas}>Reveal</Button>
      </div>

      <dialog ref={congratsDialog} className=" bg-transparent">
        <div className="flex flex-col gap-4 justify-center items-center p-6 rounded-md bg-white">
          <p className="text-lg">
            You got <span ref={countUpRef} /> 🐸 Points
          </p>
          <Button autoFocus onClick={() => congratsDialog.current?.close()}>
            <CircleX />
          </Button>
        </div>
      </dialog>
    </>
  );
};

export default Lobby;
