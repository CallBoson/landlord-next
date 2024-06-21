import { Room, Client } from "@colyseus/core";
import { GameState } from "./schema/GameState";
import { Player } from "./schema/Player";
import { ClassicMode } from "./gameModes/ClassicMode";
import { NoShuffleMode } from "./gameModes/NoShuffleMode";
import { delay } from "../utils";

export class GameRoom extends Room<GameState> {
  maxClients: number = 3;

  onCreate(options: any) {
    this.setState(this.createGameModeStrategy(options.mode));

    this.onMessage("ready", (client) => {
      this.playerReady(client.sessionId);
    });

    this.onMessage("call_bid", (client, payload) => {
      // 叫地主/抢地主/不叫/不抢
    });
  }

  onJoin(client: Client, options: any) {
    console.log(`${client.sessionId}加入房间`);
    this.state.players.set(client.sessionId, new Player());
    this.playerReady(client.sessionId);
  }

  onLeave(client: Client, consented: boolean) {}

  onDispose() {}

  private createGameModeStrategy(mode: string) {
    switch (mode) {
      case "no-shuffle":
        return new NoShuffleMode();
      case "classic":
      default:
        return new ClassicMode();
    }
  }

  private playerReady(sessionId: string) {
    this.state.players.get(sessionId).isReady = true;
    console.log("玩家准备", sessionId);
    this.state.checkAllReady() && this.startGame();
  }

  private async startGame() {
    console.log("游戏开始");
    await delay(3000);

    console.log("开始发牌");
    this.state.dealCards();
    await delay(3000);

    console.log("开始抢地主");
    this.state.bidForLandlord();
  }
}
