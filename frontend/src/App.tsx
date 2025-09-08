import { Card, CardTitle } from "./components/ui/card";
import Login from "./pages/Login";
import Register from "./pages/Register";

export function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
      <Card className="p-8 flex flex-col gap-8">
      <CardTitle className="text-center">Autenticação Facial</CardTitle>

        <Register />
        <Login />
      </Card>
    </div>
  );
}
