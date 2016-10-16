import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import './rxjs-extensions';

import { Door } from './Door';

@Injectable()
export class BackendService {

  private serviceUrl = "http://localhost:8080/api/";

  constructor(private http: Http) { }

  private getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  getDoor(): Observable<Door> {
    return this.http.get(this.serviceUrl + 'door')
      .map((r: Response) => r.json() as Door);
  }

  setDoor(door: Door): Observable<Response> {
    return this.http.post(this.serviceUrl + 'door', door, this.getHeaders());
  }
}
