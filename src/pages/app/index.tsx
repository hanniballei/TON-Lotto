import {
  LockActivies,
  LuckyPepe,
  Navbar,
  Ranking,
  ShareBox,
} from "./components";

function App() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      <div className="w-full flex justify-around gap-2">
        <LuckyPepe />

        <Ranking />
      </div>

      <LockActivies className="-ml-[10px]" />

      <ShareBox />

      <Navbar />
    </div>
  );
}

export default App;
