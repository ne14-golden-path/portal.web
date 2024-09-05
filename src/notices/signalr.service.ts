import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

import { Notice, NoticeLevel } from './notice.model';
import { SpaConfig } from '../config/spa-config.model';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(env: SpaConfig) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${env.apiUrl}/notifications-hub`) // SignalR hub URL
      .build();
  }

  receiveMessage(): Observable<Notice> {
    return new Observable<Notice>((observer) => {
      this.hubConnection.on('ReceiveMessage', (level: NoticeLevel, message: string) => {
        observer.next({ level, message });
      });
    });
  }

  start(): Observable<void> {
    return new Observable<void>((observer) => {
      this.hubConnection.start()
        .then(() => {
          console.log('SignalR hub connection started successfully');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error starting SignalR hub connection:', error);
          observer.error(error);
        });
    });
  }

  stop() {
    this.hubConnection.stop()
      .then(() => console.log('SignalR hub connection stopped successfully'))
      .catch(err => console.error('Error stopping SignalR hub connection:', err));
  }
}