import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherApiService } from '../weather-api.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
// import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  location: string = 'LWX';
  forecastData: any;
  chartData: ChartDataset[] = [];
  chartLabels: any[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    // scales: {
    //   xAxes: [
    //     {
    //       scaleLabel: {
    //         display: true,
    //         labelString: 'Time',
    //       },
    //     },
    //   ],
    //   yAxes: [
    //     {
    //       scaleLabel: {
    //         display: true,
    //         labelString: 'Temperature (°F)',
    //       },
    //     },
    //   ],
    // },
    // tooltips: {
    //   mode: 'index',
    //   intersect: false,
    // },
  };
  chartColors: any[] = [
    {
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
    },
  ];
  // chartType = 'line';

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
      this.forecastData = data;
      this.parseForecastData();
      console.log('this.forecastData', this.forecastData);
    });
  }

  parseForecastData(): void {
    // Assuming the data structure, parse the necessary data for the chart
    this.chartData = [
      {
        data: this.forecastData.properties.periods.map(
          (period: any) => period.temperature
        ),
        label: 'Temperature',
      },
    ];
    this.chartLabels = this.forecastData.properties.periods.map(
      (period: any) => period.name
    );
  }
}
