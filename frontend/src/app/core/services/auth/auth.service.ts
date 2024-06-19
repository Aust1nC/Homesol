import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<User>(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<User>(
      `${this.baseUrl}/register`,
      { username, email, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.post<User>(
      `${this.baseUrl}/logout`,
      {},
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
