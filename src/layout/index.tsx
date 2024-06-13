import { BackButtonManipulator } from "@/components/BackButtonManipulator";
import { http } from "@/lib/http";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { TonConnectButton } from "@tonconnect/ui-react";

const Header = () => {
  const [data, setData] = useState<{
    chips: number;
    points: number;
    ranking: number;
  } | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await http.get("/user");
      setData(data);
    };
    init();
  }, []);

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
