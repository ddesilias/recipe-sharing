import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5454/api';

  private _authSubject = new BehaviorSubject<any>(null);
  public authSubject = this._authSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.getUserProfile().subscribe();
    }
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signin`, userData);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/signup`, userData);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${this.baseUrl}/user/profile`, { headers }).pipe(
      tap((user: any) => {
        const currentUser = this._authSubject.value;
        this._authSubject.next({ ...currentUser, ...user });
        return user;
      })
    );
  }

  logout() {
    localStorage.clear();
    this._authSubject.next(null);
  }
}
