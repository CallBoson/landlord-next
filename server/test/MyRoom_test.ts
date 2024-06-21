import assert from "assert";
import { ColyseusTestServer, boot } from "@colyseus/testing";

import appConfig from "../src/app.config";
import { GameState } from "../src/rooms/schema/GameState";

describe("testing your Colyseus app", () => {
  let colyseus: ColyseusTestServer;

  before(async () => (colyseus = await boot(appConfig)));
  after(async () => colyseus.shutdown());

  beforeEach(async () => await colyseus.cleanup());

  it("connecting into a room", async () => {
    const room = await colyseus.createRoom<GameState>("game_room", {});
    const client1 = await colyseus.connectTo(room);
    assert.strictEqual(client1.sessionId, room.clients[0].sessionId);
    await room.waitForNextPatch();

    assert.deepStrictEqual(
      { mySynchronizedProperty: "Hello world" },
      client1.state.toJSON()
    );
  });
});
