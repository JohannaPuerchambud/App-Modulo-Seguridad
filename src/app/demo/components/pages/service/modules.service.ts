import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModulesApiService {

  url: string = 'https://api-modulo-seguridad.onrender.com';

  constructor(private api: HttpClient) {

  }
  getModules(): Observable<any> {
    return this.api.get(this.url + "/api/modules");
  }
}