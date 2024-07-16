import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuditApiService {

  url: string = 'https://api-modulo-seguridad.onrender.com';

  constructor(private api: HttpClient) {

  }
  getAudit(): Observable<any> {
    return this.api.get(this.url + "/api/auditoria");
  }
}