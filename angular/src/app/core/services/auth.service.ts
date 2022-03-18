import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}api/account`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/login`, { username, password })
  }
}
