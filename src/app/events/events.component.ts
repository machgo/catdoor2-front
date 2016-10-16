import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import { Event } from '../event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private backendService: BackendService) { }

  events: Event[];

  ngOnInit() {
    this.backendService.getEvents()
      .subscribe(events => this.events = events);
  }

}
