import { useState, useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import LobbyBox from "@/assets/lobby/lobby-box.png";
import { useScratcher } from "@/lib/hooks/useScratcher";
import { Scratcher } from "@/components/Scratcher";

import BgLuckyPepe from "@/assets/lobby/bg-lucky-pepe.png";
import BgTL from "@/assets/lobby/bg-tl.png";
import BgTR from "@/assets/lobby/bg-tr.png";

import LuckyPepe from "@/assets/lobby/lucky-pepe.png";
import LuckyDog from "@/assets/lobby/lucky-dog.png";
import LuckyDoge from "@/assets/lobby/lucky-doge.png";
import LuckyPanda from "@/assets/lobby/lucky-panda.png";

import { CongratsDialog } from "./components";

import "./index.css";
import { http } from "@/lib/http";

interface ScratcherPrize {
  type: "pepe" | "doge" | "dog" | "panda";
  img: string;
  reward: number;
  ratio: number;
}

const ScratcherPrizes: ScratcherPrize[] = [
  { type: "pepe", img: LuckyPepe, reward: 5000000, ratio: 10 },
  { type: "doge", img: LuckyDoge, reward: 1000000, ratio: 10 },
  { type: "dog", img: LuckyDog, reward: 300000, ratio: 30 },
  { type: "panda", img: LuckyPanda, reward: 20000, ratio: 50 },
];

// 根据中奖概率获取奖励之一
const getRandomPrize = (prizes: ScratcherPrize[]): ScratcherPrize => {
  if (prizes.length === 0) {
    throw new Error("Prizes array cannot be empty");
  }

  return prizes.reduce<{ prize: ScratcherPrize; value: number }>(
    (maxPrize, currentPrize) => {
      const currentValue = Math.random() * 10 * currentPrize.ratio;
      return currentValue > maxPrize.value
        ? { prize: currentPrize, value: currentValue }
        : maxPrize;
    },
    { prize: prizes[0], value: Math.random() * 10 * prizes[0].ratio }
  ).prize;
};

const Lotto = () => {
  const [prizeValue, setPrizeValue] = useState<ScratcherPrize[]>([]);

  const [hasUnReval, setHasUnReval] = useState(false);

  const congratsDialog = useRef<HTMLDialogElement>(null);
  const scratcherRef = useRef<HTMLCanvasElement>(null);
  const countUpRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await http.get("/lotto/check");
      setHasUnReval(Boolean(data));
    };
    check();
  }, []);

  const { initializeCanvas, revealCanvas, scratchedPercent } = useScratcher({
    canvas: scratcherRef,
    initializeCallback(element, context) {
      ScratcherPrizes.map((it) => Math.random() * 10 * it.ratio);

      setPrizeValue(
        new Array(12).fill(0).map(() => {
          return getRandomPrize(ScratcherPrizes);
        })
      );

      const image = new Image();
      image.src = LobbyBox;
      image.onload = function () {
        const cols = 4;
        const rows = 3;
        const imageWidth = 60;
        const imageHeight = 60;

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
    end: prizeValue
      .map((it) => it.reward)
      .reduce((prev, curr) => prev + curr, 0),
    delay: 0,
    duration: 1,
  });

  useEffect(() => {
    if (scratchedPercent === 100) {
      // 中奖提示
      setTimeout(() => {
        congratsDialog.current?.showModal();
        start();
      }, 500);
    }
  }, [scratchedPercent, start]);

  const getButtonShowText = () => {
    if (hasUnReval) return "Continue";
    if (scratchedPercent > 0 && scratchedPercent !== 100) return "REVEAL ALL";
    return "Get a Ticket";
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6">
        <div
          className="relative w-full rounded-md overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgb(9, 8, 83) 0%, rgb(0, 55, 170) 100%)",
          }}
        >
          <img src={BgTL} className="absolute top-0 left-0 h-[108px] -mt-1" />
          <img src={BgLuckyPepe} className="relative w-[250px] mx-auto z-10 " />
          <img src={BgTR} className="absolute top-0 right-0 h-[108px] -mt-1" />

          <div className="my-2">
            <div
              className="w-full h-[2px]"
              style={{
                background: "rgb(249, 73, 26)",
              }}
            />
            <div
              className="w-full flex justify-center items-center my-[2px] text-center"
              style={{
                color: "rgb(248, 231, 159)",
                background: "rgb(249, 73, 26)",
              }}
            >
              WIN UP TO{" "}
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  textShadow: "inset 1px 2px 2px  rgba(0, 0, 0, 0.25)",
                }}
              >
                $5,000,000
              </span>
            </div>
            <div
              className="w-full h-[2px]"
              style={{
                background: "rgb(249, 73, 26)",
              }}
            />
          </div>

          <div className="p-4">
            <Scratcher
              className={
                "rounded-md w-full h-[220px] bg-slate-100 overflow-hidden"
              }
              style={{
                border: "5px solid rgb(212, 48, 48)",
              }}
              ref={scratcherRef}
            >
              <div className="w-full h-full grid grid-cols-4">
                {prizeValue.map((it, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-center items-center text-xs"
                  >
                    <img src={it.img} className="h-8 w-8 rounded-full" />
                    {`$${it.reward}`}
                  </div>
                ))}
              </div>
            </Scratcher>
          </div>

          <p
            className="text-center mb-4"
            style={{
              color: "rgb(248, 231, 159)",
            }}
          >
            Reveal a{" "}
            <img
              src={LuckyPepe}
              className=" inline-block w-8 h-8 rounded-full"
              style={{ border: "1px solid rgb(248, 231, 159)" }}
            />{" "}
            symbol, win prize shown.
          </p>
        </div>

        <button
          className=" rounded-xl text-slate-50 w-full text-lg my-2"
          style={{
            background:
              "linear-gradient(90deg, rgb(84, 7, 5) 0%, rgb(253, 190, 0) 100%)",
            boxShadow: "1px 1px 2px 1px rgba(255, 141, 26, 1)",
          }}
          onClick={() => {
            scratchedPercent > 0 && scratchedPercent !== 100
              ? revealCanvas()
              : initializeCanvas();
          }}
        >
          {getButtonShowText()}
        </button>
      </div>

      <CongratsDialog
        ref={congratsDialog}
        countUpRef={countUpRef}
        onCollect={() => congratsDialog.current?.close()}
      />
    </>
  );
};

export default Lotto;
