import { ArraySchema, Schema, type } from "@colyseus/schema";
import { Card } from "./Card";

export class Player extends Schema {
  @type([Card])
  cards = new ArraySchema<Card>();

  @type("boolean")
  isLandlord = false;

  @type("boolean")
  isReady = false;
}
