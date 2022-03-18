import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  accessToken = '';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
  }

}
