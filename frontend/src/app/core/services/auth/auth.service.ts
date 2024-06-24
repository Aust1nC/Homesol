import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;
  private checkInterval = 60 * 1000;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.validateTokenOnStartup();
    this.startTokenExpiryCheck();
  }

  private validateTokenOnStartup(): void {
    const token = this.getToekn();
    if (!token || this.tokenExpired(token)) {
      this.logout();
    }
  }

  private tokenExpired(token: string): boolean {
    if (!token) {
      return true;
    } else {
      const expiry = JSON.parse(atob(token.split('.')[1])).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    }
  }

  private getToekn(): string {
    return this.currentUserValue?.token || '';
  }

  private startTokenExpiryCheck(): void {
    interval(this.checkInterval).subscribe({
      next: () => {
        const token = this.getToekn();
        console.log(token);
        if (this.tokenExpired(token)) {
          this.logout();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap({
          next: (user) => {
            if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
          },
          error: (error) => {
            console.log('Login error:', error);
          },
        })
      );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  googleLogin(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  handleGoogleCallback(token: string, user: User) {
    const userWithToken = { ...user, token };
    localStorage.setItem('currentUser', JSON.stringify(userWithToken));
    this.currentUserSubject.next(userWithToken);
    this.router.navigate(['/']);
  }
}
