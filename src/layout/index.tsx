import { BackButtonManipulator } from "@/components/BackButtonManipulator";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// import { TonConnectButton } from "@tonconnect/ui-react";

const Header = () => {
  return (
    <header className="flex justify-between py-4 text-slate-50">
      <div className="flex gap-2">
        <div className="border rounded-md p-2">
          💰<span className="ml-2">6000000</span>
        </div>
        <div className="border rounded-md p-2">
          💎<span className="ml-2">6</span>
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
      <div className="bg-gradient-to-r from-blue-900 to-gray-900">
        <div className={"container min-h-dvh max-w-lg flex flex-col"}>
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
