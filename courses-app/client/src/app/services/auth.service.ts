import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/User';
import { UsersService } from './users.service';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$: Observable<string | null>;
  _token$: BehaviorSubject<string | null>;

  constructor(
    private usersService: UsersService,
    private http: HttpClient,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this._token$ = new BehaviorSubject(localStorage.getItem('token') || null);
    this.token$ = this._token$.asObservable();
  }

  user$(): Observable<User | null> {
    return this._token$.pipe(
      map((token) => (token ? jwt_decode(token) : null))
    );
  }

  private updateLocalStateAndNotify(response: any, message: string) {
    if (!response.error) {
      this._token$.next(response.token);

      (response.keepToken ? localStorage : sessionStorage).setItem(
        'token',
        response.token
      );

      this.notifierService.notify('success', message);
      this.router.navigate(['/']);
    } else {
      this.notifierService.notify('error', response.error);
    }
  }

  login({
    email,
    password,
    keepToken,
  }: Pick<User, 'email' | 'password'> & {
    keepToken: boolean;
  }): Observable<string> {
    return this.http
      .post(`${environment.serverUrl}/login`, { email, password })
      .pipe(
        tap((res: any) =>
          this.updateLocalStateAndNotify(
            { ...res, keepToken },
            'You were logged in'
          )
        )
      );
  }

  singup({ firstName, lastName, email, password }: User) {
    return this.usersService
      .create({ firstName, lastName, email, password })
      .pipe(
        tap((res: any) =>
          this.updateLocalStateAndNotify(
            res,
            'You were logged in automatically'
          )
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._token$.next(null);
    this.notifierService.notify('success', 'You were logged out');
    this.router.navigate(['/']);
  }
}
