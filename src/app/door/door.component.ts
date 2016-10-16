import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';
import { Door } from '../door';

@Component({
  selector: 'app-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.css']
})
export class DoorComponent implements OnInit {

  door = new Door;

  constructor(private backendService: BackendService) { }


  ngOnInit() {
    this.backendService.getDoor()
      .subscribe(door => this.door = door);
  }

  open(): void {
    this.door.unlocked = true;
    this.commitDoor();
  }

  close(): void {
    this.door.unlocked = false;
    this.commitDoor();
  }

  private commitDoor(): void {
    this.backendService.setDoor(this.door)
      .subscribe(response => console.log('ok'));
  }

}
