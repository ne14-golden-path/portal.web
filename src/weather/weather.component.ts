import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { Forecast } from "./models/forecast.model";
import { SpaConfig } from "../config/spa-config.model";

@Component({
    selector: 'app-weather',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './weather.component.html',
    styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  forecasts: Forecast[] = [];
  private readonly url: string;

  constructor(private http: HttpClient, env: SpaConfig) {
    this.url = `${env.apiUrl}/WeatherForecast`;
  }

  getForecast() {
    this.http.get<Forecast[]>(this.url).subscribe(r => {
      this.forecasts = r;
    });
  }
}