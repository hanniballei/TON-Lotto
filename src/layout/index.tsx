import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex gap-2 p-4">
      <div className="border rounded-md p-2">
        💰<span className="ml-2">6000000</span>
      </div>
      <div className="border rounded-md p-2">
        💎<span className="ml-2">6</span>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div className="container min-h-dvh max-w-md flex flex-col">
      <Header />
      <main className="relative grow">
        <Suspense fallback={<>loading</>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default Layout;
