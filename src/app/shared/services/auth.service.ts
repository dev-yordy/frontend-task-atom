import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { env } from '../../../environments/enviroment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const API_BASE = env.baseAPI;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: Auth, private http: HttpClient) {}

  login(email: string, password: string): Observable<UserCredential | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async (userCredential) => {
        const token = await userCredential.user.getIdToken();
        this.storeToken(token);
        this.isAuthenticatedSubject.next(true);
        return userCredential;
      }),
      catchError((error) => {
        console.error('Error de autenticación:', error);
        return of(null);
      })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutAndNotify(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
      }),
      catchError((error) => {
        console.error('Error al cerrar sesión:', error);
        return of();
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        const isAuthenticated = !!user && !!localStorage.getItem('token');
        observer.next(isAuthenticated);
        observer.complete();
      });
    });
  }

  register(email: string, password: string): Observable<UserCredential | null> {
    return this.http
      .post(`${API_BASE}/users/register`, { email, password })
      .pipe(
        switchMap(() => this.login(email, password)),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            () => new Error(error.message || 'Error al registrar usuario')
          );
        })
      );
  }
}
