import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import * as mod from "./mod.ts";

class TestWsClient extends mod.WsClient {
  constructor() {
    super("wss://ws.postman-echo.com/raw");
  }

  callback = () => {
    console.log(this.lastMessage);
  };
}

Deno.test({
  name: "ws",
  fn: async (t) => {
    await t.step("create object", () => {
      const ws = new TestWsClient();
      test.assert(ws);
    });
    await t.step("connect", async () => {
      const ws = new TestWsClient();
      test.assert(await ws.connect());
    });
    await t.step("send", async () => {
      const ws = new TestWsClient();
      const message = { Hello: "World" };
      test.assert(await ws.connect());
      test.assert(ws.send(JSON.stringify(message)));
    });
    await t.step("callback", async () => {
      const ws = new TestWsClient();
      const message = { Hello: "World" };
      test.assert(await ws.connect());
      test.assert(ws.send(JSON.stringify(message)));
      ws.callback = () => {
        console.log(ws.lastMessage);
      };
      test.assert(ws.callback);
    });
  },
}, { sanitizeOps: false, sanitizeResources: false });
