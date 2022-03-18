import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationUser } from '../models/application-user';

interface LoginResult {
  username: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/account`;
  private _user = new BehaviorSubject<ApplicationUser | null>(null);
  user$ = this._user.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  autoLogin() {
    const currentUser: ApplicationUser = JSON.parse(localStorage.getItem('current_user') || '{}');
    if(JSON.stringify(currentUser) === '{}'){
      this._user.next(null);
      return;
    }
    
    this._user.next(currentUser);
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResult>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((res) => {
          const user = {username: res.username};
          this._user.next(user);
          this.setLocalStorage(res, user);
        })
      );
  }

  logout() {
    this.clearLocalStorage();
    this._user.next(null);
    this.router.navigate(['login']);
  }

  setLocalStorage(res: LoginResult, user: ApplicationUser) {
    localStorage.setItem('access_token', res.accessToken);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  }

}
