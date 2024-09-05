import { Component, Inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from "@azure/msal-angular";

import { MsalAppBaseComponent } from "../config/msal-app-base.component";
import { SpaConfig } from "../config/spa-config.model";
import { SignalRService } from "../notices/signalr.service";
import { Notice } from "../notices/notice.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends MsalAppBaseComponent {

  constructor(
    private signalR: SignalRService,
    @Inject(MSAL_GUARD_CONFIG) guard: MsalGuardConfiguration,
    env: SpaConfig,
    auth: MsalService,
    broadcast: MsalBroadcastService,
  ) {
    super(guard, env, auth, broadcast);
  }

  onNotified(notice: Notice) {
    console.log('SIGNALR MESSAGE RECEIVED!!!!', notice);
  }

  override onSpaLoginChange(): void {
    if (!this.loginDisplay) this.signalR.stop();
    else {
      // This ludicrous state of affairs allows not just connect and disconnect to signalr 
      // but also timely automatic instant connection on new visit when already logged in
      const scopes = [`https://${this.env.b2cTenantSubdomain}.onmicrosoft.com/webapp/api`];
      this.authService.instance.initialize().then(_ =>
        this.authService.instance.acquireTokenSilent({ scopes }).then(result => {
          this.signalR.start(result.accessToken).subscribe(() => {
            this.signalR.receiveMessage().subscribe(this.onNotified);
          });
        }));
    }
  }
}
