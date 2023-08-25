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

/**
 * WebSocket client
 * @version 1.0.0
 */
export class WsClient extends WebSocket {
  declare requestId: number;
  declare subscribeId: number;
  declare serverTimestamp: number;
  declare lastMessageEvent: MessageEvent;
  declare lastJsonMessage: Record<never, never>;
  declare receive: () => void;
  sendedMessages: Record<never, never>[] = [];
  receivedMessages: Record<never, never>[] = [];
  subscribed: Record<never, never>[] = [];

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
    this.lastJsonMessage = !ev.data.startsWith("{") ? ev.data : JSON.parse(ev.data);
    this.receivedMessages.push(this.lastJsonMessage);
    this.receive()
  }
  // string | ArrayBufferLike | Blob | ArrayBufferView
  send(data: Record<never, never>): void {
    if (this.connected) {
      if (typeof data === "object") {
        data = JSON.stringify(data)
      }
      this.sendedMessages.push(data);
      return super.send(data as string | ArrayBufferLike | Blob | ArrayBufferView);
    }
    else {
      console.log("ws not connected");
    }
  }
}
