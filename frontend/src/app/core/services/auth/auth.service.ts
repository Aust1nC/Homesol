import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, UserResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
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
    const token = this.getToken();
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

  private getToken(): string {
    return this.currentUserValue?.token || '';
  }

  private startTokenExpiryCheck(): void {
    interval(this.checkInterval).subscribe({
      next: () => {
        const token = this.getToken();
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

  // Update user info in profile page
  update(id: string, userData: Partial<User>): Observable<UserResponse> {
    return this.http
      .patch<UserResponse>(`${this.apiUrl}/update/${id}`, userData)
      .pipe(
        tap({
          next: (updatedUser) => {
            const currentToken = this.getToken();

            const updatedUserWithToken = {
              me: updatedUser.me,
              token: currentToken,
            };
            localStorage.setItem(
              'currentUser',
              JSON.stringify(updatedUserWithToken)
            );
            this.currentUserSubject.next(updatedUserWithToken);
          },
          error: (error) => {
            console.error('Update error:', error);
          },
        })
      );
  }

  // Update user after an order is created
  updateCurrentUser(updatedUser: User): void {
    const currentToken = this.getToken();
    const updatedUserWithToken = {
      me: updatedUser,
      token: currentToken,
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUserWithToken));
    this.currentUserSubject.next(updatedUserWithToken);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUserDetails() {
    return this.http.get(`${this.apiUrl}/user-details`, {
      withCredentials: true,
    });
  }

  googleLogin(): void {
    window.location.href = `${this.apiUrl}/google`;
  }

  handleGoogleCallback(): void {
    this.getUserDetails().subscribe((res: any) => {
      const userWithToken = {
        me: res.me,
        token: res.token,
      };
      localStorage.setItem('currentUser', JSON.stringify(userWithToken));
      this.currentUserSubject.next(userWithToken);
      this.router.navigate(['/']);
    });
  }
}
