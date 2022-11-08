import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestBackendService {
  url = 'http://[::1]:3000/';

  constructor(private http: HttpClient) {}

  getData(entity: string): Observable<any> {
    return this.http.get(this.url + entity);
  }

  postData(entity: string, datos: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
    });
    const httpOptions = {
      headers,
    };

    return this.http.post(this.url + entity, datos, httpOptions);
  }
}
