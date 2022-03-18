import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Weather {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private readonly apiUrl = `${environment.apiUrl}WeatherForecast`;
  weathers: Weather[] = [];
  weathersPaginated: Weather[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.weathers.length;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getWeather() {
    this.http.get(this.apiUrl).subscribe(res => {
      if(!environment.production) {
        console.log(res);
      }
      this.weathers = res as Weather[];
      this.refreshWeathers();
    });
  }

  refreshWeathers() {
    this.weathersPaginated = this.weathers
      .map((weather, i) => ({id: i + 1, ...weather}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.collectionSize = this.weathers.length;
  }
}
