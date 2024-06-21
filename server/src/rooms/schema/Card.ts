import { Schema, type } from "@colyseus/schema";

const SUITS = ["♦", "♣", "♥", "♠"];
const VALUES = [
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
  "2",
];

export class Card extends Schema {
  @type("number")
  code: number;

  @type("string")
  value: string;

  @type("string")
  suit: string;

  constructor(code: number) {
    super();

    this.code = code;

    if ([52, 53].includes(code)) {
      this.value = { 53: "大王", 52: "小王" }[code];
      return;
    }

    this.value = VALUES[code % 13];
    this.suit = SUITS[Math.floor(code / 13)];
  }
}
