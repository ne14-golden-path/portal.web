import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

import { Notice, NoticeLevel } from './notice.model';
import { SpaConfig } from '../config/spa-config.model';

@Injectable({ providedIn: 'root' })
export class SignalRService {

  private hubConnection: signalR.HubConnection;

  constructor(env: SpaConfig) {
    const hubUrl = `${env.apiUrl}/notifications-hub`;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl).build();
  }

  receiveMessage(): Observable<Notice> {
    return new Observable<Notice>((observer) => {
      this.hubConnection.on('ReceiveMessage', (notice: Notice) => {
        observer.next(notice);
      });
    });
  }

  start(token: string): Observable<void> {
    if (this.hubConnection.baseUrl.indexOf('?access_token=') == -1) {
      this.hubConnection.baseUrl += `?access_token=${token}`;
    }
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
    this.hubConnection?.stop();
  }
}