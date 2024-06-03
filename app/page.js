"use client";

import { Button } from "@nextui-org/react";
import Profile from "./components/User/Profile";
import client from "@/helpers/ws";

export default function Home() {
  const joinRoom = async () => {
    try {
      const room = await client.joinOrCreate("my_room");
      console.log("Joined or created room", room.id);
    } catch (error) {
      console.error("Join or create room failed", error);
    }
  };

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <Profile />

      <div className="mt-4 gap-4 flex justify-center items-center">
        <Button
          color="primary"
          onClick={() => {
            joinRoom();
          }}
        >
          Classic
        </Button>
        <Button color="primary">No-shuffled</Button>
      </div>
    </main>
  );
}
