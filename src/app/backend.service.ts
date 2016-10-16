import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import './rxjs-extensions';

import { Door } from './door';
import { Event } from './event';
import { environment } from '../environments/environment';

@Injectable()
export class BackendService {

  private serviceUrl = environment.backendUrl;

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

  getEvents(): Observable<Event[]> {
    return this.http.get(this.serviceUrl + 'events')
      .map(this.readEvents);
  }

  private readEvents(res: Response) {
    let body = res.json();
    body.forEach(element => {
      console.log(element);
      if (element.has_data) {
        element.data_link =  environment.backendUrl + 'uploads/' + element._id;
      }
    });
    return body as Event[];
  }
}
