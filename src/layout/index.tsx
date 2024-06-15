import { BackButtonManipulator } from "@/components/BackButtonManipulator";
import { http } from "@/lib/http";
import { storageSet } from "@/lib/storage";
import { getStartParams } from "@/lib/tma";
import {
  initClosingBehavior,
  useLaunchParams,
  useViewport,
} from "@tma.js/sdk-react";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import IconChips from "@/assets/app/icon_chips.png";
import IconPoints from "@/assets/app/icon_points.png";
import { FreeScratchDialog } from "@/components/FreeScratchDialog";
import usePointsStore from "@/store/usePointsStore";
import { useCountUp } from "react-countup";

interface UserInfo {
  chips: number;
  points: number;
  ranking: number;
  invitation_code: string;
  is_new_user: boolean;
}

const Header = () => {
  const { initPoints, points, chips } = usePointsStore();
  const launchParams = useLaunchParams();
  const viewport = useViewport();
  const [closingBehavior] = initClosingBehavior();
  const chipsCountUpRef = useRef<HTMLSpanElement>(null);
  const pointsCountUpRef = useRef<HTMLSpanElement>(null);

  const navigate = useNavigate();
  const freeScratchDialog = useRef<HTMLDialogElement>(null);

  const { update: chipsCountUpdate } = useCountUp({
    ref: chipsCountUpRef,
    start: 0,
    end: chips,
    delay: 0,
    duration: 0.5,
  });

  const { update: pointsCountUpdate } = useCountUp({
    ref: pointsCountUpRef,
    start: 0,
    end: points,
    delay: 0,
    duration: 0.5,
  });

  useEffect(() => {
    chipsCountUpdate(chips);
  }, [chips, chipsCountUpdate]);

  useEffect(() => {
    pointsCountUpdate(points);
  }, [points, pointsCountUpdate]);

  useEffect(() => {
    viewport?.expand();
    closingBehavior.enableConfirmation();
  }, [viewport, closingBehavior]);

  useEffect(() => {
    const init = async () => {
      const { data } = await http.get("/user", {
        params: {
          invitation_code: getStartParams(launchParams.startParam, "referral"),
        },
      });
      const userData = data as UserInfo;
      storageSet("invitation_code", userData.invitation_code);
      initPoints({ chips: userData.chips, points: userData.points });
      if (userData?.is_new_user) {
        freeScratchDialog.current?.show();
      }
    };
    init();
  }, [launchParams, initPoints]);

  return (
    <>
      <header className="flex justify-between py-4 text-slate-50">
        <div className="flex gap-2">
          <div className="bg-[#212946] rounded-md p-2 px-4 flex gap-1 items-center">
            <img src={IconChips} className="w-[16px] h-[16px]" />
            <span className="text-sm" ref={chipsCountUpRef}>
              {chips || 0}
            </span>
          </div>
          <div className="bg-[#212946] rounded-md p-2 px-4 flex gap-1 items-center">
            <img src={IconPoints} className="w-[16px] h-[16px]" />
            <span className="text-sm" ref={pointsCountUpRef}>
              {points || 0}
            </span>
          </div>
        </div>
      </header>

      <FreeScratchDialog
        ref={freeScratchDialog}
        onConfirm={() => {
          freeScratchDialog.current?.close();
          navigate({ pathname: "/lobby" });
        }}
      />
    </>
  );
};

const Layout = () => {
  return (
    <>
      <BackButtonManipulator />
      <div className="bg-gradient-to-r from-[#0a39b0] to-blue-950">
        <div className={"container min-h-dvh max-w-lg flex flex-col px-4"}>
          <Header />
          <main className="relative grow">
            <Suspense
              fallback={
                <div className="fixed inset-0 w-screen h-screen flex justify-center items-center">
                  <Loading />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
