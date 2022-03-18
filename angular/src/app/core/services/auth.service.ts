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

  login(username: string, password: string) {
    return this.http
      .post<LoginResult>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((res) => {
          this._user.next({
            username: res.username,
          });
          this.setLocalStorage(res);
        })
      );
  }

  logout() {
    this.clearLocalStorage();
    this._user.next(null);
    this.router.navigate(['login']);
  }

  setLocalStorage(res: LoginResult) {
    localStorage.setItem('access_token', res.accessToken);
  }

  clearLocalStorage() {
    localStorage.removeItem('access_token');
  }

}
