import { useState, useEffect, useRef, PropsWithChildren } from "react";
import { useCountUp } from "react-countup";
import LobbyBox from "@/assets/lobby/lobby-box.png";
import { useScratcher } from "@/lib/hooks/useScratcher";
import { Scratcher } from "@/components/Scratcher";

import BgLuckyPepe from "@/assets/lobby/bg-lucky-pepe.png";
import BgTL from "@/assets/lobby/bg-tl.png";
import BgTR from "@/assets/lobby/bg-tr.png";

import PngHome from "@/assets/app/tab_home.png";
import LuckyPepe from "@/assets/lobby/lucky-pepe.png";
import LuckyBonk from "@/assets/lobby/lucky-dog.png";
import LuckyDoge from "@/assets/lobby/lucky-doge.png";
import LuckyPogai from "@/assets/lobby/lucky-panda.png";

import { CongratsDialog } from "./components";

import { Lotto as ILotto, LottoTicket, LottoType } from "./types";
import { api } from "./api";
import "./index.css";
import { Link } from "react-router-dom";

const IconMap: Record<LottoType, string> = {
  doge: LuckyDoge,
  pepe: LuckyPepe,
  bonk: LuckyBonk,
  pogai: LuckyPogai,
};

const MainButton = (
  props: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>
) => {
  const { children, ...restProps } = props;
  return (
    <button
      className=" rounded-full text-slate-50 w-full text-lg"
      style={{
        background:
          "linear-gradient(90deg, rgb(84, 7, 5) 0%, rgb(253, 190, 0) 100%)",
        boxShadow: "1px 1px 2px 1px rgba(255, 141, 26, 1)",
      }}
      {...restProps}
    >
      {children}
    </button>
  );
};

const Lotto = () => {
  const [prizeValue, setPrizeValue] = useState<ILotto[]>([]);

  const [hasUnReveal, setHasUnReveal] = useState(false);
  const [gaming, setGaming] = useState(false);

  const congratsDialog = useRef<HTMLDialogElement>(null);
  const scratcherRef = useRef<HTMLCanvasElement>(null);
  const countUpRef = useRef<HTMLSpanElement>(null);

  const { initializeCanvas, revealCanvas, scratchedPercent } = useScratcher({
    canvas: scratcherRef,
    initializeCallback(element, context) {
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

  const reward = prizeValue
    .filter((it) => it.icon === "pepe")
    .map((it) => it.reward)
    .reduce((prev, curr) => prev + curr, 0);

  const { start } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: reward,
    delay: 0,
    duration: 1,
  });

  useEffect(() => {
    // 检查是否有未消耗彩票
    const check = async () => {
      const { data } = await api.checkUnReveal();
      setHasUnReveal(Boolean(data));
    };
    check();
  }, []);

  useEffect(() => {
    if (scratchedPercent === 100 && reward > 0) {
      // 中奖提示
      setTimeout(async () => {
        await api.submitTicket();
        congratsDialog.current?.showModal();
        setGaming(false);
        start();
      });
    }
  }, [scratchedPercent, start, reward]);

  const onStart = async () => {
    const { data } = await api.getTicket();
    setPrizeValue((data as LottoTicket).lottoInfo.lotto);

    initializeCanvas();
    setGaming(true);
  };

  const onReveal = () => {
    revealCanvas();
    setGaming(false);
  };

  const onContinue = async () => {
    const { data } = await api.getTicket();
    setPrizeValue((data as LottoTicket).lottoInfo.lotto);

    setHasUnReveal(false);
    setGaming(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 mb-4">
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
                $100,000
              </span>
            </div>
            <div
              className="w-full h-[2px]"
              style={{
                background: "rgb(249, 73, 26)",
              }}
            />
          </div>

          <div className="relative p-4">
            {!gaming && (
              <div className=" absolute inset-0 m-4 rounded-md bg-black opacity-50 z-10 text-white flex justify-center items-center">
                {"Get a ticket first"}
              </div>
            )}

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
                    <img
                      src={IconMap[it.icon]}
                      className="h-8 w-8 rounded-full"
                    />
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

        <div className=" sticky bottom-0 w-full flex gap-2">
          <Link to="/">
            <button
              className="rounded-xl py-1 px-2 flex flex-col justify-center items-center"
              style={{
                background: "linear-gradient(90deg, #936FF6 0%, #61E9FC 100%)",
                boxShadow: "0px 2px 0px  #FFFFFF",
              }}
            >
              <img src={PngHome} className="h-[18px] w-[18px]" />
              <p className="text-slate-50 text-sm">Lobby</p>
            </button>
          </Link>

          {hasUnReveal && (
            <MainButton onClick={onContinue}>Continue</MainButton>
          )}
          {gaming && scratchedPercent >= 0 && scratchedPercent !== 100 && (
            <MainButton onClick={onReveal}>REVEAL ALL</MainButton>
          )}
          {!hasUnReveal && !gaming && (
            <MainButton onClick={onStart}>Get a Ticket</MainButton>
          )}
        </div>
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
