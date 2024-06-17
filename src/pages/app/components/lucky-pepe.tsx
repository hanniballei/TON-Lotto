import { Link } from "react-router-dom";
import PngLuckyPepe from "@/assets/app/lucky-pepe.png";

export const LuckyPepe = () => {
  return (
    <Link to="/lobby" className="w-full">
      <div
        className="h-full flex flex-col gap-1 rounded-xl p-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(44, 87, 96, 1) 0%, rgba(11, 54, 132, 1) 100%)",
          boxShadow: "inset 0px 2px 4px 3px rgba(255, 255, 255, 0.25)",
        }}
      >
        <p
          className="text-center text-lg text-nowrap font-bold text-slate-50"
          style={{
            textShadow: "2px 2px 2px rgb(3, 41, 107)",
          }}
        >
          Scratcher
        </p>
        <img src={PngLuckyPepe} className="rounded-md h-36 object-cover" />
        <p
          className="text-center text-xs text-nowrap text-slate-50"
          style={{
            textShadow: "2px 2px 2px rgb(3, 41, 107)",
          }}
        >
          Go to Scratcher Game!
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
