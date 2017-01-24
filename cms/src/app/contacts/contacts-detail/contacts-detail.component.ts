import { Component, OnInit, Input } from '@angular/core';
import {Contacts} from "../contacts";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
 @Input() selectedContact: Contacts;
  constructor() { }

  ngOnInit() {
  }

}
