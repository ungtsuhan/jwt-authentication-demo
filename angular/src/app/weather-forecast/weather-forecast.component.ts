import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  private readonly apiUrl = `${environment.apiUrl}WeatherForecast`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.http.get(this.apiUrl).subscribe(res => {
      if(!environment.production) {
        console.log(res);
      }
    });
  }

}
