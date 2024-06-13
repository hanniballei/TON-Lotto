import PngLobby from "@/assets/app/tab_lobby.png";
import PngChips from "@/assets/app/tab_chips.png";
import PngGift from "@/assets/app/tab_gift.png.png";

export const Navbar = () => (
  <div className="sticky bottom-4 w-full flex justify-between items-end p-2">
    <div className=" absolute inset-0 bg-[#0a39b0] opacity-85 blur-none rounded-xl" />

    <button className="z-10">
      <img src={PngChips} className="h-[38px] mx-auto" />
      <div className="mt-1 w-20 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
        Buy Chips
      </div>
    </button>

    <button className="z-10">
      <img src={PngLobby} className="h-[58px]" />
      <div className="w-20 mx-auto mt-1 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
        Lobby
      </div>
    </button>

    <button className="z-10">
      <img src={PngGift} className="h-[46px] mx-auto" />
      <div className="w-20 mt-1 rounded-xl bg-[#0a39b0] bg-opacity-30 text-slate-50">
        Gift
      </div>
    </button>
  </div>
);
