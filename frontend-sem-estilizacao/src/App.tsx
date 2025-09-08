import Register from "./components/Register";
import Login from "./components/Login";
import { Card } from "./components/ui/card";

function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
      <Card className="p-8 flex flex-col gap-8">
        <Register />
        <Login />
      </Card>
    </div>
  );
}

export default App;