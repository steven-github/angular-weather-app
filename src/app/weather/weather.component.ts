import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';
import { ChartConfiguration, ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  location: string = '';
  forecastData: any;

  constructor(
    private route: ActivatedRoute,
    private weatherApi: WeatherApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.location = params['location'];
      this.fetchForecast();
    });
  }

  fetchForecast(): void {
    this.weatherApi.getForecast(this.location).subscribe((data: any) => {
      this.forecastData = data.properties.periods;
    });
  }
}
