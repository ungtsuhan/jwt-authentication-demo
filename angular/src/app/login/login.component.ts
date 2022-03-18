import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.username || !this.password) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.authService.login(this.username, this.password).subscribe(res => {
      if(!environment.production) {
        console.log(res);
      }
      if(returnUrl == '/login'){
        this.router.navigate(['/']);
      } else{
        this.router.navigate([returnUrl]);
      }
    });
  }

}
