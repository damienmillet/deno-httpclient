import { Mox } from './deps.ts';

type sendMessage<T = Record<never, never>> = {
  name: string;
  request_id?: string | number;
  local_time: number;
  msg: T;
};

type sendMsg<P = Record<never, never>, B = Record<never, never>> = {
  name: string;
  params?: P;
  body?: B;
  version?: string;
};

export type message<MSG = Record<never, never>> = {
  request_id: number | string;
  name: string;
  msg: MSG;
  status: number;
};

/**
 * WebSocket Client
 * @class
 * @param {string} url - WebSocket URL
 * @returns {WsClient}
 * @requires [WebSocket,Mox]
 */
export abstract class Ws {
  declare core: WebSocket;
  declare authenticated: boolean;
  declare msg: MessageEvent;
  declare requestId: number;
  declare url: string;
  declare connected: boolean;
  declare subscribeId: number;
  declare serverTimestamp: number;
  declare callback: () => void;
  declare init: () => void;
  subscribed: sendMessage[] = [];
  receivedMessages: message[] = [];
  sendedMessages: sendMessage[] = [];

  get lastMessage() {
    return JSON.parse(this.msg.data) as message;
  }

  /**
   * @returns {message<T>}
   */
  getLastMessage<T>(): message<T> {
    return this.lastMessage as message<T>;
  }

  constructor(url: string) {
    this.requestId = 0;
    this.subscribeId = 0;
    this.url = url;
    this.core = new WebSocket(this.url);
    this.core.onopen = (ev: Event) => this.onOpen(ev);
    this.core.onmessage = (ev: MessageEvent) => this.onMessage(ev);
    this.core.onclose = (ev: CloseEvent) => this.onClose(ev);
    this.core.onerror = (ev: Event) => this.onError(ev);
  }

  open() {
    this.core = new WebSocket(this.url);
  }

  close() {
    this.core.close();
  }

  restart() {
    try {
      this.close();
    } catch (e) {
      console.log(e);
    } finally {
      this.open();
    }
  }

  message = (msg: sendMsg) =>
    this.send({
      name: 'sendMessage',
      msg,
      request_id: this.requestId.toString(),
      local_time: Number(Mox.now.toString().slice(-6)),
    });

  subscribe = (msg: sendMsg, stop = false) =>
    this.send({
      name: stop ? 'unsubscribeMessage' : 'subscribeMessage',
      msg,
      request_id: 's_' + this.subscribeId,
      local_time: Number(Mox.now.toString().slice(-6)),
    });

  unsubscribe = (msg: sendMsg) => this.subscribe(msg, true);

  send(message: sendMessage) {
    this.core.send(JSON.stringify(message));
    this.sendedMessages.push(message);
    if (message.name === 'unsubscribeMessage') {
      this.subscribed.splice(this.subscribed.indexOf(message), 1);
    }
    if (message.name === 'subscribeMessage') {
      this.subscribed.push(message);
      return this.subscribeId++;
    }
    this.requestId++;
  }

  findSended = <T>(request_id: string | number) =>
    this.sendedMessages.find((m) => m.request_id === request_id) as T;

  findReceived = <T>(request_id: string | number) =>
    this.receivedMessages.find((m) => m.request_id === request_id) as T;


  onMessage = (ev: MessageEvent) => {
    this.msg = ev;
    if (!this.duplicateMessage()) {
      switch (this.lastMessage.name) {
        case 'timeSync':
          this.serverTimestamp = this.lastMessage.msg as number;
          break;
        case 'heartbeat':
          this.send({
            name: 'heartbeat',
            msg: 'pong',
            local_time: Number(Mox.now.toString().slice(-6)),
          });
          this.serverTimestamp = this.lastMessage.msg as number;
          break;
        default:
          this.callback();
          break;
      }
    }
  };

  onOpen = (_ev: Event) => {
    this.connected = true;
    this.init();
    console.log('ws connected at ' + Mox.getFormattedDateTime());
    console.log('Ready...');
  };

  onClose = (_ev: CloseEvent) => {
    this.connected = false;
    this.requestId = 0;
    this.subscribeId = 0;
    console.log('ws closed');
  };

  onError = (ev: Event) => {
    this.connected = false;
    console.log('Error: ' + (ev as ErrorEvent).message);
  };

  duplicateMessage = () => {
    const a = this.receivedMessages?.find((m) =>
      m.name === this.lastMessage.name && m.request_id === this.lastMessage.request_id
    );
    if (a && Object.entries(a.msg).toString() ===
      Object.entries(this.lastMessage.msg).toString()
    ) {
      return true;
    }
    this.receivedMessages.push(this.lastMessage);
    return false;
  };
}
