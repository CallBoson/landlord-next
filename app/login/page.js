"use client";

import { Button } from "@nextui-org/react";

export default function Login() {
  function handleStart() {
    fetch("/api/user/register/quick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => res.json());
  }

  return (
    <main className="gap-4 h-full flex justify-center items-center">
      <Button color="primary" onClick={handleStart}>
        快速游戏
      </Button>
    </main>
  );
}
