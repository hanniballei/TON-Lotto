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
import { useInitData, useUtils } from "@tma.js/sdk-react";
import { ChannelUrl, TwitterUrl } from "@/const/app";
import { useToast } from "@/components/ui/use-toast";
import usePointsStore from "@/store/usePointsStore";

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

const TaskItem = ({
  text,
  points,
  isDone,
  onClaim,
  onReClick,
}: {
  text: string;
  points: number;
  isDone?: boolean;
  onClaim: () => Promise<void>;
  onReClick?: () => void;
}) => {
  return (
    <div className="flex gap-2 mt-2">
      <div
        className="w-full text-lg font-bold text-[#FF8B00] border-b-2 border-[#FFC300]"
        style={{
          textShadow: "0px 1px 1px  #FFFFFF",
        }}
      >
        {text}
      </div>

      {isDone ? (
        <CheckedButton onClick={onReClick} />
      ) : (
        <ClaimButton points={points} onClaim={onClaim} />
      )}
    </div>
  );
};

const Ranking = () => {
  const { toast } = useToast();
  const tmaUtils = useUtils();
  const { invite } = useInvite();
  const initData = useInitData();
  const [rankInfo, setRankInfo] = useState<RankInfo>();
  const [taskStatus, setTaskStatus] = useState<TaskStatus>();
  const { addChips, points } = usePointsStore();

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
        Points Challenge
      </h1>
      <p className="text-sm text-center" style={{ color: "rgb(255, 158, 42)" }}>
        Earn points, climb the ranks, and win token airdrops!
      </p>
      <img src={PngChampion} className="w-[150px] mx-auto my-6" />
      <div className="w-fit flex mx-auto gap-1">
        <img src={PngLock} className="h-4" />
        <span className="text-sm text-white font-bold">My Points</span>
      </div>
      <p
        className="text-4xl font-bold text-center my-6"
        style={{
          color: "rgb(255, 228, 124)",
        }}
      >
        {points}
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

      <TaskItem
        isDone={taskStatus?.premium}
        text="Premium Gift"
        points={2000}
        onClaim={async () => {
          if (!initData?.user?.isPremium) {
            toast({ variant: "black", description: "You are not premium" });
            return;
          }
          await api.checkPremium();
          addChips(2000);
          await refreshStatus();
        }}
      />

      <TaskItem
        isDone={taskStatus?.join_our_channel}
        text="Join Channel"
        points={2000}
        onClaim={async () => {
          tmaUtils.openTelegramLink(ChannelUrl);
          await api.checkJoinChannel();
          addChips(2000);
          await refreshStatus();
        }}
        onReClick={() => {
          tmaUtils.openTelegramLink(ChannelUrl);
        }}
      />

      <TaskItem
        isDone={taskStatus?.follow_our_x}
        text="Follow X"
        points={2000}
        onClaim={async () => {
          tmaUtils.openLink(TwitterUrl);
          await api.checkTwitterFollow();
          addChips(2000);
          await refreshStatus();
        }}
        onReClick={() => {
          tmaUtils.openLink(TwitterUrl);
        }}
      />

      <TaskItem
        isDone={taskStatus?.daily_invite}
        text="Invite Friends"
        points={1200}
        onClaim={async () => {
          await api.checkDailyInvite();
          addChips(1200);
          await invite();
          await refreshStatus();
        }}
        onReClick={() => {
          invite();
        }}
      />

      <TaskItem
        isDone={taskStatus?.daily_checkin}
        text="Daily Check-in"
        points={1200}
        onClaim={async () => {
          await api.checkDailyClaim();
          addChips(1200);
          await refreshStatus();
        }}
      />

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
                    {/* <p className="text-white">TODO: Frens</p> */}
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
