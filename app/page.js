import { Button } from "@nextui-org/react";
import Profile from "./components/User/Profile";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center">
      <Profile />

      <div className="mt-4 gap-4 flex justify-center items-center">
        <Button color="primary">Classic</Button>
        <Button color="primary">No-shuffled</Button>
      </div>
    </main>
  );
}
