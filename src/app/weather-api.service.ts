import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getForecast(location: string): Observable<any> {
    const apiUrl = `https://api.weather.gov/gridpoints/${location}/31,80/forecast`;
    const apiUrl2 = `https://api.weather.gov/gridpoints/${location}/31,80/forecast`;
    const apiUrl3 = `https://api.weather.gov/gridpoints/${location}/31,80/forecast`;
    return this.http.get(apiUrl);
  }
}
