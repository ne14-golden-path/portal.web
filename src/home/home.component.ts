import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SpaConfig } from "../config/spa-config.model";

@Component({
    selector: 'app-home',
    imports: [RouterModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public env: SpaConfig) {}
}