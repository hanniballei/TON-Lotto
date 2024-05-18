import { Link } from "react-router-dom";

import PngLobby from "@/assets/app/tab_lobby.png";
import PngChips from "@/assets/app/tab_chips.png";
import PngGift from "@/assets/app/tab_gift.png.png";
import PngTreasure from "@/assets/app/treasure.png";
import PngLuckyPepe from "@/assets/app/lucky-pepe.png";
import PngLuckyDoge from "@/assets/app/lucky-doge.png";
import PngLuckyBtn from "@/assets/app/lucky-btn.png";

const Footer = () => (
  <div className="absolute bottom-4 w-full flex justify-between items-end py-4">
    <button>
      <img src={PngChips} className="h-[38px] mx-auto" />
      <div className="mt-1 w-20 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
        Buy Chips
      </div>
    </button>

    <Link to="/lobby">
      <button>
        <img src={PngLobby} className="h-[58px]" />
        <div className="w-20 mx-auto mt-1 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
          Lobby
        </div>
      </button>
    </Link>

    <button>
      <img src={PngGift} className="h-[46px] mx-auto" />
      <div className="w-20 mt-1 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
        Gift
      </div>
    </button>
  </div>
);

function App() {
  return (
    <div className=" h-full flex flex-col justify-center items-center gap-6">
      <div className="flex gap-2">
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
            Lucky pepe scrachers
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
            Bucks Doge scrachers
          </p>
          <img src={PngLuckyDoge} className=" rounded-md" />
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
          <button
            className="relative w-24 h-[28px] flex justify-center items-center mx-auto"
            style={{
              background: `url(${PngLuckyBtn})`,
              backgroundSize: "contain",
            }}
          >
            <span className="text-xs text-slate-50">Get Ticket</span>
          </button>
        </div>
      </div>

      <div className="grow w-full flex">
        <div
          className="w-full flex justify-between p-6 rounded-lg text-slate-50"
          style={{
            background:
              "linear-gradient(90deg, rgba(56, 56, 56, 0.8) 0%, rgba(8, 53, 135, 1) 99.91%)",
          }}
        >
          <div className="flex flex-col justify-between">
            <p>
              Share with Friends
              <br />
              and Get Bonus!
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
              $1000,000
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
