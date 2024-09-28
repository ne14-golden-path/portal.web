import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { SignalRService } from "../notices/signalr.service";
import { Notice } from "../notices/notice.model";
import { ToastComponent } from "../notices/toast/toast.component";
import { MsalAppService } from "../config/msal.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule, ToastComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  activeNotice?: Notice;

  constructor(
    public msal: MsalAppService,
    private signalR: SignalRService,
  ) {

    msal.onLoggedOut = () => this.signalR.stop();
    msal.onLoggedIn = token => {
      this.signalR.start(token).subscribe(() => {
        this.signalR.receiveMessage().subscribe(n => this.activeNotice = n);
      });
    }
  }
  ngOnInit() { this.msal.init(); }
  ngOnDestroy() { this.msal.dispose(); }
}
