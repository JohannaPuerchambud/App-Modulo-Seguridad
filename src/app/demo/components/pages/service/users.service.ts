import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  url: string = 'https://api-modulo-seguridad.onrender.com';

  constructor(private api: HttpClient) { }

  getUsers(): Observable<any> {
    return this.api.get(this.url + "/api/users");
  }

  getUserById(id: string): Observable<any> {
    return this.api.get(this.url + `/api/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.api.post(this.url + "/api/users", user);
  }

  updateUserById(id: string, user: any): Observable<any> {
    return this.api.put(this.url + `/api/users/${id}`, user);
  }

  deleteUserById(id: string): Observable<any> {
    return this.api.delete(this.url + `/api/users/${id}`);
  }
}
