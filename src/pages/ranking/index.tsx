import PngChampion from "@/assets/app/champion.png";
import PngRank from "@/assets/app/rank.png";
import PngNo1 from "@/assets/ranking/no-1.png";
import PngPeoples from "@/assets/ranking/peoples.png";
import PngLock from "@/assets/ranking/lock.png";
import { api } from "./api";
import { useCallback, useEffect, useState } from "react";
import { RankInfo, TaskStatus } from "./types";

import IconChecked from "@/assets/ranking/btn-checked.svg";
import { useInvite } from "@/lib/hooks/useInvite";
import { useUtils } from "@tma.js/sdk-react";
import { ChannelUrl, TwitterUrl } from "@/const/app";

const ClaimButton = ({
  points,
  onClaim,
}: {
  points: number;
  onClaim: () => void;
}) => (
  <button
    className="text-[#383838] font-bold bg-[#FF8B00] rounded-lg w-[120px]"
    style={{
      boxShadow: "inset 2px 2px 5px  #FFFFFF",
    }}
    onClick={onClaim}
  >
    +${points}
  </button>
);

const CheckedButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    className="flex justify-center items-center bg-[#E5E5E5] rounded-lg w-[120px]"
    style={{
      boxShadow: "inset 2px 2px 5px  #FFFFFF",
    }}
    onClick={onClick}
  >
    <img src={IconChecked} />
  </button>
);

const Ranking = () => {
  const tmaUtils = useUtils();
  const { invite } = useInvite();
  const [rankInfo, setRankInfo] = useState<RankInfo>();
  const [taskStatus, setTaskStatus] = useState<TaskStatus>();

  const refreshStatus = useCallback(async () => {
    const { data } = await api.taskStatus();
    setTaskStatus(data);
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  useEffect(() => {
    const init = async () => {
      const { data: rankData } = await api.rank();
      setRankInfo(rankData);
    };
    init();
  }, []);

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
        {rankInfo?.current_user.chips}
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
          <p className="text-sm font-bold text-center">
            {rankInfo?.current_user.ranking}
          </p>
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
          <p className="text-sm font-bold text-center">
            {rankInfo?.current_user.invite_number}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Join Channel
        </div>

        {taskStatus?.join_our_channel ? (
          <CheckedButton
            onClick={() => {
              tmaUtils.openTelegramLink(ChannelUrl);
            }}
          />
        ) : (
          <ClaimButton
            points={2000}
            onClaim={async () => {
              await api.checkJoinChannel();
              tmaUtils.openTelegramLink(ChannelUrl);
              await refreshStatus();
            }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Follow X
        </div>

        {taskStatus?.follow_our_x ? (
          <CheckedButton
            onClick={() => {
              tmaUtils.openLink(TwitterUrl);
            }}
          />
        ) : (
          <ClaimButton
            points={2000}
            onClaim={async () => {
              await api.checkTwitterFollow();
              tmaUtils.openLink(TwitterUrl);
              await refreshStatus();
            }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Invite Friends
        </div>

        {taskStatus?.daily_invite ? (
          <CheckedButton
            onClick={() => {
              invite();
            }}
          />
        ) : (
          <ClaimButton
            points={1000}
            onClaim={async () => {
              await api.checkDailyInvite();
              invite();
              await refreshStatus();
            }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Daily Check-in
        </div>

        {taskStatus?.daily_checkin ? (
          <CheckedButton />
        ) : (
          <ClaimButton
            points={800}
            onClaim={async () => {
              await api.checkDailyClaim();
              await refreshStatus();
            }}
          />
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <div className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]">
          Premium Gift
        </div>

        {taskStatus?.premium ? (
          <CheckedButton />
        ) : (
          <ClaimButton
            points={2000}
            onClaim={async () => {
              await api.checkPremium();
              await refreshStatus();
            }}
          />
        )}
      </div>

      {(rankInfo?.ranking_info || []).length > 0 && (
        <div
          className="rounded-lg px-2 py-4 my-4"
          style={{
            background: "rgba(255, 255, 255, 0.65)",
          }}
        >
          {rankInfo?.ranking_info.map((_it, index) => (
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
                    <p className="font-bold">{_it.username}</p>
                    <p className="text-white">TODO: Frens</p>
                  </div>
                </div>
                <div className="text-[#FFE47C]">{_it.points} Points</div>
              </div>
              {index !== rankInfo?.ranking_info.length - 1 && (
                <div className="h-[2px] bg-[#E5E5E5] my-1" />
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ranking;
