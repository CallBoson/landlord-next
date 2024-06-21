import { GameState } from "../schema/GameState";
import { ArraySchema } from "@colyseus/schema";
import { Card } from "../schema/Card";

export class NoShuffleMode extends GameState {
  dealCards(): void {
    super.dealCards();

    // 洗牌（可能使用特殊的洗牌规则）
    // 模拟一种简单的好牌规则

    // 发牌
    let index = 0;
    for (const player of this.players.values()) {
      player.cards = new ArraySchema<Card>();
      for (let i = 0; i < 17; i++) {
        player.cards.push(this.deck[index++]);
      }
    }
  }
}
