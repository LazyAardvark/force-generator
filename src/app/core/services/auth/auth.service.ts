import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; role: string; };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private tokenKey = 'access_token'; // Key for sessionStorage
  private authStatus$ = new BehaviorSubject<boolean>(this.hasValidToken());
  readonly authStatus: Signal<boolean> = toSignal(this.authStatus$, { initialValue: true });

  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        this.authStatus$.next(true);
        return true;
      }),
      catchError(this.handleError)
    );
  }

  register(user: { name: string; email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearTokens();
    this.authStatus$.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (environment.production) {
      return this.authStatus();
    }
    else {
      return true;
    }

  }
  //TODO define User Object
  getUser(): any | null {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getRole(): String{
    const user = this.getUser();
    return <String>user.role;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user && user.role === role;
  }


  private storeTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(this.tokenKey, accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  private getToken(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey) ? sessionStorage.getItem(this.tokenKey) : null;
    }
    else {
      return null;
    }
  }

  private clearTokens(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('refresh_token');
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) return of(false);

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      map((response) => {
        this.storeTokens(response.accessToken, response.refreshToken);
        return true;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An error occurred';
    if (error.status === 401) {
      message = 'Unauthorized: Invalid credentials';
      this.logout();
    } else if (error.status === 403) {
      message = 'Forbidden: Access denied';
    }
    return throwError(() => new Error(message));
  }
}
