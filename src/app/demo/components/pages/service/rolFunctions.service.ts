import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rolFunctionsApiService {

  private url: string = 'https://api-modulo-seguridad.onrender.com/api/role_functions';

  constructor(private http: HttpClient) {}

  getRoleFunctions(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  createRoleFunction(roleFunction: any): Observable<any> {
    return this.http.post<any>(this.url, roleFunction);
  }

  updateRoleFunction(rolFuncId: number, roleFunction: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${rolFuncId}`, roleFunction);
  }

  deleteRoleFunction(rolFuncId: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${rolFuncId}`);
  }
}

