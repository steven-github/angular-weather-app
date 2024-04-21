import { Component, Input } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  @Input() forecastData: any;
  chartData: ChartDataset[] = [];
  chartLabels: any[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          major: {
            enabled: true,
          },
          color: (context) =>
            (context.tick && context.tick.major && '#FF0000') || '#000000',
          font: function (context) {
            if (context.tick && context.tick.major) {
              return {
                weight: 'bold',
              };
            }
            return {
              weight: 'normal',
            };
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature (°F)',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '°F';
            }
            return label;
          },
          labelColor: function (context) {
            return {
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgb(255, 0, 0)',
              borderWidth: 2,
              borderDash: [2, 2],
              borderRadius: 5,
            };
          },
          labelTextColor: function (context) {
            return '#FFFFFF';
          },
        },
      },
    },
  };
  constructor() {}

  ngOnInit(): void {
    console.log(this.forecastData);
    this.parseForecastData();
  }

  parseForecastData(): void {
    const temperatureData = this.forecastData.map(
      (period: any) => period.temperature
    );
    const labelData = this.forecastData.map((period: any) => period.name);

    this.chartData = [
      { data: temperatureData, label: 'Temperature (°F)', fill: false },
    ];
    this.chartLabels = labelData;
  }
}
