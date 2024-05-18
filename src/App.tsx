import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex justify-center items-center">
      <Button asChild>
        <Link to="/lobby">Lobby</Link>
      </Button>
    </div>
  );
}

export default App;
