import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }

    this.authService.login(this.username, this.password).subscribe(res => {
      if(!environment.production) {
        console.log(res);
      }
    });
  }

}
