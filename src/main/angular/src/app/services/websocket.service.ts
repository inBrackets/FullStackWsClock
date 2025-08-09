import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient!: Client; // Modern STOMP client

  readonly timeStampTopic = "/topic/timestamp";
  readonly websocketEndpoint = "http://localhost:8080/gs-guide-websocket";

  // Subject to push timestamp updates
  timestamp$ = new Subject<string>();

  constructor() { }

  connect() {
    console.log("Initialize Websocket Connection");

    this.stompClient = new Client({
      // Use SockJS as the transport
      webSocketFactory: () => new SockJS(this.websocketEndpoint),

      // Optional: disable verbose internal logging
      debug: () => {},

      // Called on successful connection
      onConnect: () => {
        this.stompClient.subscribe(this.timeStampTopic, (message: IMessage) => {
          this.onTimeStampMessageReceived(message);
        });
      },

      // Called on error or disconnect
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers['message'], frame.body);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },

      // Reconnect automatically after 5 seconds
      reconnectDelay: 5000
    });

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
      console.log("Disconnected");
    }
  }

  private onTimeStampMessageReceived(message: IMessage) {
    const timestamp = message.body;
    console.log("Message Received Timestamp::", timestamp);
    this.timestamp$.next(timestamp);
  }
}
