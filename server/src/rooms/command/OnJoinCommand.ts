// OnJoinCommand.ts
import { Command } from "@colyseus/command";

export class OnJoinCommand extends Command<
  MyRoom,
  {
    sessionId: string;
  }
> {
  execute({ sessionId }) {
    this.state.players[sessionId] = new Player();
  }
}
