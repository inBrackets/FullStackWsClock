import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WebsocketService} from './services/websocket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular';
  websocketSrv = inject(WebsocketService);
  currentTimestamp: string = '';

  ngOnInit(): void {
    console.log('connecting...');
    this.websocketSrv.connect();

    this.websocketSrv.timestamp$.subscribe(timestamp => {
      this.currentTimestamp = timestamp;
    });
  }

}
