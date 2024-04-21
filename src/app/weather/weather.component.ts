import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  location: string = '';
  forecastData: any = null;

  constructor(
    private route: ActivatedRoute,
    private weatherApi: WeatherApiService
  ) {
    this.forecastData = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.location = params['location'];
      this.fetchForecast();
    });
  }

  fetchForecast(): void {
    this.forecastData = null;
    this.weatherApi.getForecast(this.location).subscribe((data: any) => {
      setTimeout(() => {
        this.forecastData = data.properties.periods;
      }, 500);
    });
  }
}
