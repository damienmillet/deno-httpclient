// export type sendMessage<T = Record<never, never>> = {
//   name: string;
//   request_id?: string | number;
//   local_time: number;
//   msg: T;
// };

// // subscribe message sended to server
// export type subscribe<P = Record<never, never>> = {
//   params?: P;
// }
// // message sended to server
// export type mes<B = Record<never, never>> = {
//   body?: B;
// }

// export type sendMsg<P = Record<never, never>, B = Record<never, never>> = {
//   name: string;
//   version?: string;
// } & (subscribe<P> | mes<B>);

// // message received from server
// export type message<MSG = Record<never, never>> = {
//   request_id: number | string;
//   name: string;
//   msg: MSG;
//   status: number;
// };

// export type ws = {
//   url?: string;
//   core: WebSocket;
//   connected: boolean;
//   authenticated: boolean;
//   msg: MessageEvent;
//   requestId: number;
//   subscribeId: number;
//   serverTimestamp: number;
//   subscribed: sendMessage[];
//   receivedMessages: message[];
//   sendedMessages: sendMessage[];
//   callback: () => void;
//   init: () => void;
//   lastMessage: message;
//   getLastMessage: <T>() => message<T>;
//   duplicateMessage: () => boolean;
//   send: (message: sendMessage) => void;
//   open: (url: string) => Promise<Event>;
//   close: () => void;
//   restart: () => void;
//   message: (msg: sendMsg) => void;
//   subscribe: (msg: sendMsg, stop?: boolean) => void;
//   unsubscribe: (msg: sendMsg) => void;
//   findSended: <T>(request_id: string | number) => T;
//   findReceived: <T>(request_id: string | number) => T;
//   onMessage: (ev: MessageEvent) => void;
//   onOpen: (_ev: Event) => void;
//   onClose: (ev: CloseEvent) => void;
//   onError: (ev: Event) => void;
// };

// -------------------------------------------- //

// export const WsClient = { /** :ws*/
//   msg: {} as MessageEvent,
//   authenticated: false,
//   requestId: 0,
//   subscribeId: 0,
//   serverTimestamp: 0,
//   subscribed: [],
//   receivedMessages: [],
//   sendedMessages: [],
//   callback: () => { },
//   init: () => { },

//   get lastMessage(): message {
//     return JSON.parse(this.msg.data) as message;
//   },
//   getLastMessage: function <T>(): message<T> {
//     return this.lastMessage as message<T>;
//   },


//   onMessage(ev: MessageEvent) {
//     this.msg = ev;
//     console.log(this.msg)
//     if (!this.duplicateMessage()) {
//       switch (this.lastMessage.name) {
//         case "timeSync":
//           this.serverTimestamp = this.lastMessage.msg as number;
//           break;
//         case "heartbeat":
//           this.send({
//             name: "heartbeat",
//             msg: "pong",
//             local_time: Number(
//               Math.floor(Date.now() / 1000).toString().slice(-6),
//             ),
//           });
//           this.serverTimestamp = this.lastMessage.msg as number;
//           break;
//         default:
//           this.callback();
//           break;
//       }
//     }
//   },

// to proper

//   message(msg: sendMsg) {
//     this.send({
//       name: "sendMessage",
//       msg,
//       request_id: this.requestId.toString(),
//       local_time: Number(Math.floor(Date.now() / 1000).toString().slice(-6)),
//     });
//   },


//   subscribe(msg: sendMsg, stop = false) {
//     this.send({
//       name: stop ? "unsubscribeMessage" : "subscribeMessage",
//       msg,
//       request_id: "s_" + this.subscribeId,
//       local_time: Number(Math.floor(Date.now() / 1000).toString().slice(-6)),
//     });
//   },
//   unsubscribe(msg: sendMsg) {
//     this.subscribe(msg, true);
//   },
//   send(message: sendMessage) {
//     this.core.send(JSON.stringify(message));
//     this.sendedMessages.push(message);
//     if (message.name === "unsubscribeMessage") {
//       this.subscribed.splice(this.subscribed.indexOf(message), 1);
//     }
//     if (message.name === "subscribeMessage") {
//       this.subscribed.push(message);
//       return this.subscribeId++;
//     }
//     this.requestId++;
//   },

//   findSended<T>(request_id: string | number) {
//     return this.sendedMessages.find((m) => m.request_id === request_id) as T;
//   },
//   findReceived<T>(request_id: string | number) {
//     return this.receivedMessages.find((m) => m.request_id === request_id) as T;
//   },
//   duplicateMessage() {
//     const a = this.receivedMessages?.find((m) =>
//       m.name === this.lastMessage.name &&
//       m.request_id === this.lastMessage.request_id
//     );
//     if (
//       a && Object.entries(a.msg).toString() ===
//       Object.entries(this.lastMessage.msg).toString()
//     ) {
//       return true;
//     }
//     this.receivedMessages.push(this.lastMessage);
//     return false;
//   },
// };

export class WsClient extends WebSocket {
  declare requestId: number;
  declare subscribeId: number;
  declare serverTimestamp: number;
  declare lastMessageEvent: MessageEvent;
  declare lastJsonMessage: Record<never, never>;
  declare callback: () => void;

  get connected() {
    return this.readyState === this.OPEN;
  }

  get lastMessage() {
    return this.lastJsonMessage;
  }

  getLastMessage<T>() {
    return this.lastJsonMessage as T;
  }

  constructor(url: string) {
    super(url);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.requestId = 0;
      this.subscribeId = 0;
      super.onopen = (ev: Event) => {
        this.onOpen(ev);
        return resolve(ev);
      };
      super.onmessage = (ev: MessageEvent) => this.onMessage(ev);
      super.onclose = (ev: CloseEvent) => this.onClose(ev);
      super.onerror = (ev: Event) => {
        this.onError(ev);
        return reject(ev);
      };
      setTimeout(() => {
        if (!this.connected) {
          this.close();
          return reject(new Error("Connection timeout"));
        }
      }, 5000);
    });
  }

  restart() {
    try {
      this.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.url && this.connect();
    }
  }

  onOpen(_ev: Event) {
    // this.init();
    console.log(
      `ws connected to ${this.url} at ${new Date().toLocaleString(undefined, { hour12: false })
      }`,
    );
    console.log("Ready...");
  }
  onError(ev: Event) {
    console.log("Error: " + (ev as ErrorEvent).message);
  }
  onClose(_ev: CloseEvent) {
    console.log("ws closed");
  }
  onMessage(ev: MessageEvent) {
    this.lastMessageEvent = ev;
    // check if can parse to json
    this.lastJsonMessage = !ev.data.startsWith("{") ? ev.data : JSON.parse(ev.data);
    this.callback()
  }
  // string | ArrayBufferLike | Blob | ArrayBufferView
  send(data: Record<never, never>): void {
    if (this.connected) {
      if (typeof data === "object") {
        data = JSON.stringify(data)
      }
      return super.send(data as string | ArrayBufferLike | Blob | ArrayBufferView);
    }
    else {
      console.log("ws not connected");
    }
  }
}
