import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { MsalAppService } from "../config/msal.service";
import { SignalRService } from "../notices/signalr.service";
import { Notice } from "../notices/notice.model";
import { ToastComponent } from "../controls/toast/toast.component";
import { AppState } from "../store/app.state";
import { appActions } from "../store/app.actions";
import { appSelectors } from "../store/app.selectors";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule, ToastComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  // Use this key to replace any existing generic message
  private readonly SHARED_CHANNEL_KEY: string = '';

  notices$: Observable<Record<string, Notice>>;

  constructor(
    public msal: MsalAppService,
    private signalR: SignalRService,
    private store: Store<AppState>,
  ) {
    this.notices$ = store.select(appSelectors.getNotices);
    msal.onLoggedOut = () => this.signalR.stop();
    msal.onLoggedIn = token => {
      this.signalR.start(token).subscribe(() => {
        this.signalR.receiveMessage().subscribe(notice => {
          const key = notice.data?.inboundBlobReference || this.SHARED_CHANNEL_KEY;
          this.store.dispatch(appActions.addNotice({ key, notice }));
          if (notice.title == 'Upload Success') {
            this.store.dispatch(appActions.listBlobs({}));
          }
        });
      });
    }
  }

  ngOnInit() { this.msal.init(); }
  ngOnDestroy() { this.msal.dispose(); }

  onToastClose(key: string) {
    this.store.dispatch(appActions.removeNotice({ key }));
  }

  onToggleDarkMode() {
    window.document.querySelector('html')?.classList.toggle('dark-mode');
  }
}
