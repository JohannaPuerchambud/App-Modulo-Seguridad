import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionesApiService {

  private url: string = 'https://api-modulo-seguridad.onrender.com/api/functions';

  constructor(private http: HttpClient) {}

  getFunciones(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  createFuncion(func: any): Observable<any> {
    return this.http.post<any>(this.url, func);
  }

  updateFuncion(funcId: string, func: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${funcId}`, func);
  }

  deleteFuncion(funcId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${funcId}`);
  }
}
