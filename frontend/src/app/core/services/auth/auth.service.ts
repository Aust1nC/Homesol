import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserResponse } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<UserResponse | null>;
  public currentUser: Observable<UserResponse | null>;
  private checkInterval = 60 * 1000;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<UserResponse | null>(
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
        if (this.tokenExpired(token)) {
          this.logout();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public get currentUserValue(): UserResponse | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap({
          next: (user) => {
            if (user && user.token) {
              const userToSave = user;
              localStorage.setItem('currentUser', JSON.stringify(userToSave));
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
    firstName: string,
    lastName: string,
    password: string
  ): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, {
      username,
      firstName,
      lastName,
      email,
      password,
    });
  }

  update(id: string, userData: Partial<User>): Observable<UserResponse> {
    return this.http
      .patch<UserResponse>(`${this.apiUrl}/update/${id}`, userData)
      .pipe(
        tap({
          next: (updatedUser) => {
            console.log('Updated User:', updatedUser);
            const currentToken = this.getToekn();

            const updatedUserWithToken = {
              me: updatedUser.me,
              token: currentToken,
            };
            localStorage.setItem(
              'currentUser',
              JSON.stringify(updatedUserWithToken)
            );
            console.log(JSON.stringify(updatedUserWithToken));
            this.currentUserSubject.next(updatedUserWithToken);
          },
          error: (error) => {
            console.error('Update error:', error);
          },
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  googleLogin(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  handleGoogleCallback(token: string, user: UserResponse) {
    const userWithToken = { ...user, token };
    localStorage.setItem('currentUser', JSON.stringify(userWithToken));
    this.currentUserSubject.next(userWithToken);
    this.router.navigate(['/']);
  }
}
