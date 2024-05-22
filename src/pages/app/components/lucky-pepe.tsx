import { Link } from "react-router-dom";
import PngLuckyPepe from "@/assets/app/lucky-pepe.png";
import PngLuckyBtn from "@/assets/app/lucky-btn.png";

export const LuckyPepe = () => {
  return (
    <div
      className=" flex flex-col gap-1 rounded-lg p-4"
      style={{
        background:
          "linear-gradient(90deg, rgba(44, 87, 96, 1) 0%, rgba(11, 54, 132, 1) 100%)",
        boxShadow: "inset 1px 2px 4px 8px rgba(255, 255, 255, 0.25)",
      }}
    >
      <p
        className="text-center text-xs text-nowrap text-slate-50"
        style={{
          textShadow: "2px 2px 2px rgb(3, 41, 107)",
        }}
      >
        Lucky pepe scratcher
      </p>
      <img src={PngLuckyPepe} className=" rounded-md" />
      <p
        className="text-center text-xs text-nowrap text-slate-50"
        style={{
          textShadow: "2px 2px 2px rgb(3, 41, 107)",
        }}
      >
        Price: 1000
      </p>
      <p
        className="text-center text-xs text-nowrap text-slate-50"
        style={{
          textShadow: "2px 2px 2px rgb(3, 41, 107)",
        }}
      >
        Top Price: $5,000,000
      </p>
      <Link to="/lobby">
        <button
          className="relative w-24 h-[28px] flex justify-center items-center mx-auto"
          style={{
            background: `url(${PngLuckyBtn})`,
            backgroundSize: "contain",
          }}
        >
          <span className="text-xs text-slate-50">Get Ticket</span>
        </button>
      </Link>
    </div>
  );
};
