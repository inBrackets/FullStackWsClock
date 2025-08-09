import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import {Client, CompatClient, Stomp} from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  stompClient!: CompatClient;

  timeStampTopic = "/topic/timestamp";
  websocketEndpoint: string = "http://localhost:8080/gs-guide-websocket";

  // Subject to push timestamp updates
  timestamp$ = new Subject<string>();

  constructor() { }

  connect() {
    console.log("Initialize Websocket Connection");
    let ws = SockJS(this.websocketEndpoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient?.subscribe(this.timeStampTopic, (timeStampResponse: any) => {
        this.onTimeStampMessageReceived(timeStampResponse);
      });
    }, this.errorCallBack);
  };

  disconnected() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: any) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  onTimeStampMessageReceived(message: any) {
    const timestamp = message.body;
    console.log("Message Received Timestamp::", timestamp);
    this.timestamp$.next(timestamp); // Push new value to subscribers
  }
}
