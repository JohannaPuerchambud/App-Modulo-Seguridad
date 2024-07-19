import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rolUserApiService {
  private url: string = 'https://api-modulo-seguridad.onrender.com/api/role_users';

  constructor(private http: HttpClient) {}

  getRolUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  createRolUser(roleUser: any): Observable<any> {
    return this.http.post<any>(this.url, roleUser);
  }

  updateRolUser(roleUserId: string, roleUser: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${roleUserId}`, roleUser);
  }

  deleteRolUser(roleUserId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${roleUserId}`);
  }

  getRolUserById(roleUserId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${roleUserId}`);
  }

  getRolUsersByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/user/${userId}`);
  }
}
