import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}
}
