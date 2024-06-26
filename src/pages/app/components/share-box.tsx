import PngTreasure from "@/assets/app/treasure.png";

import { useInvite } from "@/lib/hooks/useInvite";

export const ShareBox = () => {
  const { invite } = useInvite();

  return (
    <div className="grow w-full flex">
      <div
        className="w-full flex justify-between p-6 rounded-lg text-slate-50"
        style={{
          background:
            "linear-gradient(90deg, rgba(56, 56, 56, 0.8) 0%, rgba(8, 53, 135, 1) 99.91%)",
        }}
      >
        <div className="flex flex-col justify-between" onClick={() => invite()}>
          <p>
            Share with Friends
            <br />
            and Get Coins Bonus!
          </p>

          <button
            className=" rounded-xl text-xs w-24 py-1"
            style={{
              background: "rgba(0, 186, 173, 1)",
              boxShadow: "inset 2px 2px 4px 2px rgba(255, 255, 255, 0.5)",
            }}
          >
            SHARE
          </button>
        </div>

        <div>
          <img src={PngTreasure} className="h-[70px] mx-auto" />
          <p
            className="text-lg font-bold tracking-widest drop-shadow-md"
            style={{
              textShadow: "2px 2px 2px rgb(22, 83, 181)",
            }}
          >
            $100,000
          </p>
        </div>
      </div>
    </div>
  );
};
