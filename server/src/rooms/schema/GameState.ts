import { ArraySchema, Schema, type, MapSchema } from "@colyseus/schema";
import { Player } from "./Player";
import { Card } from "./Card";

export class GameState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type([Card])
  lastCardsPlayed = new ArraySchema<Card>();

  @type([Card])
  deck = new ArraySchema<Card>();

  @type([Card])
  landlordCards = new ArraySchema<Card>();

  /**
   * 游戏阶段
   * wait_ready: 等待所有玩家准备
   * dealing: 发牌
   * bidding: 抢地主
   * rounding: 轮流出牌
   * end: 游戏结束
   */
  @type("string")
  phase: "wait_ready" | "dealing" | "bidding" | "rounding" | "end" =
    "wait_ready";

  playerReady(sessionId: string) {
    this.players.get(sessionId).isReady = true;
  }

  checkAllReady() {
    const isEnoughPlayers = this.players.size >= 3;
    const isAllReady = [...this.players.values()].every(
      (player) => player.isReady
    );

    return isEnoughPlayers && isAllReady;
  }

  generateCards(): void {
    this.deck = new ArraySchema<Card>();
    for (let i = 0; i < 54; i++) {
      this.deck.push(new Card(i));
    }
  }

  dealCards() {
    this.phase = "dealing";
    this.generateCards();

    // 洗牌发牌逻辑由子类实现
    // ...
  }

  bidForLandlord() {
    this.phase = "bidding";
  }

  playerBids(sessionId, bidValue) {
    this.auctionManager.playerBids(sessionId, bidValue);
  }
}
