import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  private url: string = 'https://api-modulo-seguridad.onrender.com';

  constructor(private api: HttpClient) { }

  login(username: string, password: string, module: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*'
    });

    const body = {
      usr_user: username,
      usr_password: password,
      mod_name: module
    };

    return this.api.post(`${this.url}/api/login_module`, body, { headers: headers });
  }

  getModules(): Observable<any> {
    return this.api.get(`${this.url}/api/modules`);
  }
}
