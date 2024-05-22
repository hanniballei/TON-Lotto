import PngLockChallenge from "@/assets/app/lock_challenge.png";
import PngLockLotto from "@/assets/app/lock_lotto.png";
import PngLockRaffles from "@/assets/app/lock_raffle.png";
import PngLockSport from "@/assets/app/lock_sport.png";
import { cn } from "@/lib/utils";

export const LockActivies = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full grid grid-cols-4 gap-2", className)}>
      <img src={PngLockChallenge} />
      <img src={PngLockLotto} />
      <img src={PngLockRaffles} />
      <img src={PngLockSport} />
    </div>
  );
};
