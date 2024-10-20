import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; // Spring BootのWebSocketエンドポイント

interface Rate {
  numeratorCurrency: string;
  denominatorCurrency: string;
  rate: number;
}

const stompClient = new Client({
  brokerURL: SOCKET_URL,
  connectHeaders: {
    // 必要に応じてヘッダーを追加
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  webSocketFactory: () => new SockJS(SOCKET_URL),
});

stompClient.activate();

export const subscribeToRates = (callback: (rate: Rate) => void): void => {
  stompClient.onConnect = () => {
    stompClient.subscribe("/topic/rates", (message: IMessage) => {
      const rate: Rate = JSON.parse(message.body);
      callback(rate);
    });
  };
};

export const unsubscribeFromRates = (): void => {
  stompClient.deactivate();
};

export default stompClient;
