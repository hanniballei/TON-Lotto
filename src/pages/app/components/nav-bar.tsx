import PngHome from "@/assets/app/tab_home.png";
import PngInvite from "@/assets/app/tab_invite.png";
import PngBuyPoints from "@/assets/app/tab_points.png";
// import PngLobby from "@/assets/app/tab_lobby.png";
// import PngChips from "@/assets/app/tab_chips.png";
import PngGift from "@/assets/app/tab_gift.png.png";

export const Navbar = () => (
  <div className="sticky bottom-4 w-full flex justify-between items-end gap-2">
    {/* <div className=" absolute inset-0 bg-[#0a39b0] opacity-85 blur-none rounded-xl" /> */}
    <button
      className="rounded-lg py-1 w-full flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(90deg, #936FF6 0%, #61E9FC 100%)",
        boxShadow: "0px 2px 0px  #FFFFFF",
      }}
    >
      <img src={PngHome} className="h-[28px] w-[28px]" />
      <p className="text-slate-50 text-sm">Lobby</p>
    </button>

    <button
      className="rounded-lg py-1 w-full flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(90deg, #936FF6 0%, #61E9FC 100%)",
        boxShadow: "0px 2px 0px  #FFFFFF",
      }}
    >
      <img src={PngBuyPoints} className="h-[28px] w-[28px]" />
      <p className="text-slate-50 text-sm">Buy Points</p>
    </button>

    <button
      className="rounded-lg py-1 w-full flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(90deg, #936FF6 0%, #61E9FC 100%)",
        boxShadow: "0px 2px 0px  #FFFFFF",
      }}
    >
      <img src={PngInvite} className="h-[28px] w-[28px]" />
      <p className="text-slate-50 text-sm">Invite</p>
    </button>

    <button
      className="rounded-lg py-1 w-full flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(90deg, #936FF6 0%, #61E9FC 100%)",
        boxShadow: "0px 2px 0px  #FFFFFF",
      }}
    >
      <img src={PngGift} className="h-[28px] w-[28px]" />
      <p className="text-slate-50 text-sm">Reward</p>
    </button>
  </div>
);
