import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { User } from '../types/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<User[]>(`${environment.serverUrl}/users`)
      .pipe(shareReplay(1));
  }

  create(user: Partial<User>) {
    return this.http.post(`${environment.serverUrl}/signup`, user);
  }

  update(id: string, user: Partial<User>) {
    return this.http.put(`${environment.serverUrl}/users/${id}`, user);
  }

  delete(id: string) {
    return this.http.delete<User>(`${environment.serverUrl}/users/${id}`);
  }

  getById(id: string) {
    return this.http
      .get<User>(`${environment.serverUrl}/users/${id}`)
      .pipe(shareReplay(1));
  }
}
