import { GameState } from "../schema/GameState";

export class BidManager {
  bidOrder: string[];
  currentBidderIndex: number;
  bidValues: Map<string, number>;
  landlord: string | null;

  constructor(public gameState: GameState) {
    this.gameState = gameState;
  }

  // 开始叫地主
  startBid() {
    this.bidOrder = Array.from(this.gameState.players.keys());
    this.bidOrder.sort(() => Math.random() - 0.5); // 随机排序
    this.currentBidderIndex = 0;
    this.bidValues.clear();
    this.landlord = null;
    this.nextBidder();
  }

  // 轮到下一个玩家叫地主
  nextBidder() {
    const currentBidder = this.bidOrder[this.currentBidderIndex];
    this.gameState.currentBidder = currentBidder;
    // 通知当前叫地主的玩家
    // 例如：this.gameState.players.get(currentBidder).emit('bid');
    this.currentBidderIndex =
      (this.currentBidderIndex + 1) % this.bidOrder.length;
  }

  // 玩家叫地主
  playerBids(sessionId, bidValue) {
    const player = this.gameState.players.get(sessionId);
    if (player && this.bidOrder.includes(sessionId)) {
      this.bidValues.set(sessionId, bidValue);
      // 检查是否有玩家叫出了更高的价
      if (!this.landlord || bidValue > this.landlord.bidValue) {
        this.landlord = player;
        this.landlord.bidValue = bidValue;
      }
      // 检查是否所有玩家都叫过地主
      if (this.allPlayersBid()) {
        this.determineLandlord();
      }
    }
  }

  // 所有玩家都叫过地主
  allPlayersBid() {
    return this.bidValues.size === this.bidOrder.length;
  }

  // 确定地主
  determineLandlord() {
    if (this.landlord) {
      this.landlord.isLandlord = true;
      this.gameState.dealLandlordCards(this.landlord);
      this.gameState.phase = "rounding"; // 进入出牌阶段
    } else {
      // 重新发牌
      this.gameState.dealCards();
    }
  }
}
