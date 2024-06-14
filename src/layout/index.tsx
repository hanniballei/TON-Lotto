import { BackButtonManipulator } from "@/components/BackButtonManipulator";
import { http } from "@/lib/http";
import { storageSet } from "@/lib/storage";
import { getStartParams } from "@/lib/tma";
import { useLaunchParams } from "@tma.js/sdk-react";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

interface UserInfo {
  chips: number;
  points: number;
  ranking: number;
  invitation_code: string;
  is_new_user: boolean;
}

const Header = () => {
  const launchParams = useLaunchParams();
  const [data, setData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await http.get("/user", {
        params: {
          invitation_code: getStartParams(launchParams.startParam, "referral"),
        },
      });
      storageSet("invitation_code", (data as UserInfo).invitation_code);
      setData(data);
    };
    init();
  }, [launchParams]);

  return (
    <header className="flex justify-between py-4 text-slate-50">
      <div className="flex gap-2">
        <div className="border rounded-md p-2">
          💰<span className="ml-2">{data?.chips || 0}</span>
        </div>
        <div className="border rounded-md p-2">
          💎<span className="ml-2">{data?.points || 0}</span>
        </div>
      </div>

      {/* <TonConnectButton /> */}
    </header>
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
            <Suspense fallback={<>loading</>}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
