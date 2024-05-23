import PngChampion from "@/assets/app/champion.png";
import PngCoin from "@/assets/app/coin.png";
import PngRanking from "@/assets/app/rank.png";
import { Link } from "react-router-dom";

export const Ranking = () => {
  return (
    <div
      className="flex flex-col justify-between gap-1 rounded-lg p-4"
      style={{
        background: "rgb(3, 3, 96)",
        boxShadow: "inset 0px 2px 4px 8px rgba(255, 255, 255, 0.25)",
      }}
    >
      <p
        className="text-center text-basic font-bold text-nowrap text-slate-50"
        style={{
          color: "rgb(255, 139, 0)",
          textShadow: "inset 0px 2px 4px  rgb(255, 255, 255)",
        }}
      >
        Pints Challenge
      </p>
      <p
        className="text-center text-xs"
        style={{
          color: "rgb(255, 158, 42)",
        }}
      >
        Earn points, climb the ranks, and win token airdrops!
      </p>
      <img src={PngChampion} className="max-w-[82px] rounded-md mx-auto" />
      <p className="text-white text-sm flex justify-center items-center gap-1">
        <img src={PngCoin} className="w-[12px]" />
        My Points
      </p>
      <p
        className="text-center font-bold"
        style={{
          color: "rgb(255, 228, 124)",
        }}
      >
        1,000,000,000
      </p>
      <p className="text-white text-sm flex justify-center items-center gap-1">
        <img src={PngRanking} className="w-[12px]" />
        Ranking
      </p>
      <p
        className="text-center font-bold"
        style={{
          color: "rgb(255, 228, 124)",
        }}
      >
        233
      </p>
      <Link to="/ranking">
        <button
          className="relative w-24 h-[28px] flex justify-center items-center mx-auto rounded-xl font-bold"
          style={{
            background: `rgb(255, 139, 0)`,
            backgroundSize: "contain",
            boxShadow: "inset 2px 2px 5px rgb(255, 255, 255)",
            color: "rgb(56, 56, 56)",
          }}
        >
          <span className="text-xs text-slate-50">Learn More</span>
        </button>
      </Link>
    </div>
  );
};
