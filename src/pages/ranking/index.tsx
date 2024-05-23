import PngChampion from "@/assets/app/champion.png";
import PngRank from "@/assets/app/rank.png";
import PngNo1 from "@/assets/ranking/no-1.png";
import PngPeoples from "@/assets/ranking/peoples.png";
import PngLock from "@/assets/ranking/lock.png";

const Ranking = () => {
  return (
    <div>
      <h1>Pints Challenge</h1>
      <p>Earn points, climb the ranks, and win token airdrops!</p>
      <img src={PngChampion} />
      <p>
        <img src={PngLock} />
        My Token
      </p>
      <p>1,000,000,000</p>
      <div>
        <div>
          <p>
            <img src={PngRank} />
            Ranking
          </p>
          <p>100</p>
        </div>

        <div>
          <p>
            <img src={PngPeoples} />
            Invitations
          </p>
          <p>2000</p>
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

      <div className="rounded-lg">
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
