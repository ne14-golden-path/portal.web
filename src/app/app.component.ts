import { Component, Inject, OnInit } from "@angular/core";
import { MsalAppBaseComponent } from "../config/msal-app-base.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from "@azure/msal-angular";

import { SpaConfig } from "../config/spa-config.model";
import { SignalRService } from "../notices/signalr.service";
import { map, merge, Observable, of, tap } from "rxjs";
import { Notice } from "../notices/notice.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends MsalAppBaseComponent {

  notice$?: Observable<Notice>;

  constructor(
    private signalR: SignalRService,
    @Inject(MSAL_GUARD_CONFIG) guard: MsalGuardConfiguration,
    env: SpaConfig,
    auth: MsalService,
    broadcast: MsalBroadcastService,
  ) {
    super(guard, env, auth, broadcast);

    this.signalR.start().pipe(
      map(_ => this.signalR.receiveMessage()),
      tap(ss => this.notice$ = ss)
    );


    this.signalR.start().subscribe(() => {
      this.signalR.receiveMessage().subscribe(notice => {
        console.warn('SIGNALR MESSAGE RECEIVED!!!!', notice);
      });
    });
  }

  // override onSpaLoginChange(): void {
  //   if (this.loginDisplay) {
  //     this.signalR.start().subscribe(() => {
  //       this.signalR.receiveMessage().subscribe(notice => {
  //         console.warn('SIGNALR MESSAGE RECEIVED!!!!', notice);
  //       });
  //     });
  //   }
  //   else {
  //     this.signalR.stop();
  //   }
  // }
}
