import PngChampion from "@/assets/app/champion.png";
import PngRank from "@/assets/app/rank.png";
import PngNo1 from "@/assets/ranking/no-1.png";
import PngPeoples from "@/assets/ranking/peoples.png";
import PngLock from "@/assets/ranking/lock.png";

const Ranking = () => {
  const ranks = [1, 2, 3];

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

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Invite Friends
        </div>

        <button
          className="text-[#383838] font-bold bg-[#FF8B00] rounded-lg w-[120px]"
          style={{
            boxShadow: "inset 2px 2px 5px  #FFFFFF",
          }}
        >
          +$1000
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Daily Check-in
        </div>

        <button
          className="text-[#383838] font-bold bg-[#FF8B00] rounded-lg w-[120px]"
          style={{
            boxShadow: "inset 2px 2px 5px  #FFFFFF",
          }}
        >
          +$200
        </button>
      </div>

      <div
        className="rounded-lg px-2 py-4 mt-4"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
        }}
      >
        {ranks.map((it, index) => (
          <>
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                {index === 0 ? (
                  <img src={PngNo1} className="h-[40px] w-[40px]" />
                ) : (
                  <div className="rounded-full border-2 w-[40px] h-[40px] flex justify-center items-center text-[#FFE47C] border-[#FFE47C]">
                    {index + 1}
                  </div>
                )}
                <div>
                  <p className="font-bold">Anton</p>
                  <p className="text-white">12345 Frens</p>
                </div>
              </div>
              <div className="text-[#FFE47C]">800000 Points</div>
            </div>
            {index !== ranks.length - 1 && (
              <div className="h-[2px] bg-[#E5E5E5] my-1" />
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
