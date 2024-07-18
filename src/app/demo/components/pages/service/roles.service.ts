import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesApiService {

  url: string = 'https://api-modulo-seguridad.onrender.com';

  constructor(private api: HttpClient) {}

  getRoles(): Observable<any> {
    return this.api.get(this.url + '/api/roles');
  }

  createRole(role: any): Observable<any> {
    return this.api.post(this.url + '/api/roles', role);
  }

  updateRoleById(id: number, role: any): Observable<any> {
    return this.api.put(this.url + `/api/roles/${id}`, role);
  }

  deleteRoleById(id: number): Observable<any> {
    return this.api.delete(this.url + `/api/roles/${id}`);
  }
}
