import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="gap-4 h-full flex justify-center items-center">
      <Button color="primary">Classic</Button>
      <Button color="primary">No-shuffled</Button>
    </main>
  );
}
