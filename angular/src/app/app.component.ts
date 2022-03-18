import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(public authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.autoLogin();
  }

  logout() {
    this.authService.logout();
  }
}
