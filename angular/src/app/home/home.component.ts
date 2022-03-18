import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accessToken = '';

  constructor() { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
  }

}
