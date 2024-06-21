import gameConfig from "../game.config";

export function generateRoomId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < gameConfig.roomIdLength; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
