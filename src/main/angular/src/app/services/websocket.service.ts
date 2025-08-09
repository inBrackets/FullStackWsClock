import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  stompClient: any;

  timeStampTopic = "/topic/timestamp";
  websocketEndpoint: string = "http://localhost:8080/gs-guide-websocket";

  // Subject to push timestamp updates
  timestamp$ = new Subject<string>();

  connect() {
    console.log("Initialize Websocket Connection");
    let ws = SockJS(this.websocketEndpoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient?.subscribe(_this.timeStampTopic, function (timeStampResponse: any) {
        _this.onTimeStampMessageReceived(timeStampResponse);
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
    console.log("Message Received Timestamp:: ", timestamp);
    this.timestamp$.next(timestamp); // Push new value to subscribers
  }
}
