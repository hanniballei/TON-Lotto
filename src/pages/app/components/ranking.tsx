import PngChampion from "@/assets/app/champion.png";
import PngCoin from "@/assets/app/coin.png";
import { Link } from "react-router-dom";

export const Ranking = () => {
  return (
    <Link to="/ranking">
      <div
        className="h-full flex flex-col justify-between gap-1 rounded-xl p-4"
        style={{
          background: "rgb(3, 3, 96)",
          boxShadow: "inset 0px 2px 4px 3px rgba(255, 255, 255, 0.25)",
        }}
      >
        <p
          className="text-center text-lg font-bold text-nowrap"
          style={{
            color: "rgb(255, 139, 0)",
            textShadow: "inset 0px 2px 4px  rgb(255, 255, 255)",
          }}
        >
          Pints Challenge
        </p>

        <img src={PngChampion} className="max-w-[82px] rounded-md mx-auto" />
        <p className="text-white text-sm flex justify-center items-center gap-1">
          <img src={PngCoin} className="w-[12px]" />
          My Token
        </p>
        <p
          className="text-center font-bold"
          style={{
            color: "rgb(255, 228, 124)",
          }}
        >
          1,000,000,000
        </p>

        <button
          className="relative w-4/5 h-[28px] flex rounded-full justify-center items-center mx-auto"
          style={{
            background: "rgba(255, 139, 0, 1)",
            boxShadow: "inset 2px 2px 5px  rgba(255, 255, 255, 1)",
          }}
        >
          <span
            className="font-bold"
            style={{
              color: "rgba(56, 56, 56, 1)",
            }}
          >
            Go
          </span>
        </button>
      </div>
    </Link>
  );
};
