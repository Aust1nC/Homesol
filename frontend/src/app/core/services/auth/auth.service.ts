import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`,
      { username, email, password },
      { withCredentials: true }
    );
  }

  googleLogin(): void {
    window.location.href = `${this.baseUrl}/google`;
  }

  googleRegister(): void {
    window.location.href = `${this.baseUrl}/google`;
  }
}
