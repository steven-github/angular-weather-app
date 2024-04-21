import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent {
  @Input() forecastData: any;
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature (°F)',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + '°F';
            }
            return label;
          },
          labelColor: function (context: any) {
            return {
              borderColor: 'rgb(0, 0, 255)',
              backgroundColor: 'rgb(255, 0, 0)',
              borderWidth: 2,
              borderDash: [2, 2],
              borderRadius: 5,
            };
          },
          labelTextColor: function (context: any) {
            return '#FFFFFF';
          },
        },
      },
    },
  };
  lineChartLegend = true;

  ngOnInit(): void {
    console.log(this.forecastData);
    this.parseForecastData();
  }

  parseForecastData(): void {
    const temperatureData = this.forecastData.map(
      (period: any) => period.temperature
    );
    const labelData = this.forecastData.map((period: any) => period.name);

    this.lineChartData.datasets[0].data = temperatureData;
    this.lineChartData.labels = labelData;
  }
}
