import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import * as mod from "./mod.ts";

// class TestWsClient extends mod.WsClient {
//   constructor() {
//     super("wss://ws.postman-echo.com/raw");
//   }

//   callback = () => {
//     console.log(this.lastMessage);
//   };
// }

const ws = new mod.WsClient("wss://ws.postman-echo.com/raw");

ws.receive = () => {
  console.log(ws.lastMessage);
}

if (await ws.connect()) {
  ws.send("toto");
}
