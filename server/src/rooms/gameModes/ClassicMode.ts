// ClassicMode.ts
import { GameState } from "../schema/GameState";
import { ArraySchema } from "@colyseus/schema";
import { Card } from "../schema/Card";

export class ClassicMode extends GameState {
  dealCards(): void {
    super.dealCards();

    // 洗牌
    for (let i = 0; i < 54; i++) {
      const index = Math.floor(Math.random() * 54);
      const temp = this.deck[i];
      this.deck[i] = this.deck[index];
      this.deck[index] = temp;
    }

    // 发牌
    let index = 0;
    for (const player of this.players.values()) {
      player.cards = new ArraySchema<Card>();
      for (let i = 0; i < 17; i++) {
        player.cards.push(this.deck[index++]);
      }
    }

    // 最后 3 个底牌
    this.landlordCards = new ArraySchema<Card>();
    for (let i = 0; i < 3; i++) {
      this.landlordCards.push(this.deck[index++]);
    }
  }
}
