import { Button } from "@nextui-org/react";
import Profile from "./components/User/Profile";

export default function Home() {
  return (
    <>
      <Profile />

      <main className="gap-4 h-full flex justify-center items-center">
        <Button color="primary">Classic</Button>
        <Button color="primary">No-shuffled</Button>
      </main>
    </>
  );
}
