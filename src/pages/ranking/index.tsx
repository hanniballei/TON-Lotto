import PngChampion from "@/assets/app/champion.png";
import PngRank from "@/assets/app/rank.png";
import PngNo1 from "@/assets/ranking/no-1.png";
import PngPeoples from "@/assets/ranking/peoples.png";
import PngLock from "@/assets/ranking/lock.png";

const Ranking = () => {
  return (
    <div>
      <h1
        className="text-center text-2xl font-bold"
        style={{
          color: "rgb(255, 139, 0)",
        }}
      >
        Pints Challenge
      </h1>
      <p className="text-sm text-center" style={{ color: "rgb(255, 158, 42)" }}>
        Earn points, climb the ranks, and win token airdrops!
      </p>
      <img src={PngChampion} className="w-[150px] mx-auto my-6" />
      <div className="w-fit flex mx-auto gap-1">
        <img src={PngLock} className="h-4" />
        <span className="text-sm text-white font-bold">My Token</span>
      </div>
      <p
        className="text-4xl font-bold text-center my-6"
        style={{
          color: "rgb(255, 228, 124)",
        }}
      >
        1,000,000,000
      </p>
      <div className="w-full flex justify-center items-center gap-2 mx-auto">
        <div
          className="rounded-lg py-2 px-4 w-fit h-auto"
          style={{
            background: "rgb(255, 228, 124)",
          }}
        >
          <div className="flex gap-1 text-xs font-bold">
            <img className="h-[15px]" src={PngRank} />
            Ranking
          </div>
          <p className="text-sm font-bold text-center">100</p>
        </div>

        <div
          className="rounded-lg py-2 px-4 w-fit h-auto"
          style={{
            background: "rgb(255, 228, 124)",
          }}
        >
          <div className="flex gap-1 text-xs font-bold">
            <img src={PngPeoples} className="h-[15px]" />
            Invitations
          </div>
          <p className="text-sm font-bold text-center">2000</p>
        </div>
      </div>

      <div>
        Invite Friends
        <button>+ $1000</button>
      </div>

      <div>
        Daily Check-in
        <button>+ $200</button>
      </div>

      <div
        className="rounded-lg px-2 py-4"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
        }}
      >
        <div>
          <img src={PngNo1} />
          <div>
            <p>Anton</p>
            <p>12345 Frens</p>
          </div>
          <div>800000 Points</div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
