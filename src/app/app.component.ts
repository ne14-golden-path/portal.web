import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { SignalRService } from "../notices/signalr.service";
import { Notice } from "../notices/notice.model";
import { ToastComponent } from "../notices/toast/toast.component";
import { MsalAppService } from "../config/msal.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { appActions } from "../store/app.actions";
import { map, Observable } from "rxjs";
import { appSelectors } from "../store/app.selectors";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule, ToastComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  notices$: Observable<{ key: string, notice: Notice}[]>;

  constructor(
    public msal: MsalAppService,
    private signalR: SignalRService,
    private store: Store<AppState>,
  ) {
    this.notices$ = store.select(appSelectors.getNotices).pipe(
      map(n => Object.keys(n).map(key => ({ key, notice: n[key] }))),
    );

    msal.onLoggedOut = () => this.signalR.stop();
    msal.onLoggedIn = token => {
      this.signalR.start(token).subscribe(() => {
        this.signalR.receiveMessage().subscribe(notice => {

          console.log('TODO! determine key!!', notice);
          const msg = { key: '123', notice };
          this.store.dispatch(appActions.addNotice(msg));
        });
      });
    }
  }

  ngOnInit() { this.msal.init(); }
  ngOnDestroy() { this.msal.dispose(); }

  onToastClose(key: string) {
    this.store.dispatch(appActions.removeNotice({ key }));
  }
}
