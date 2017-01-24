import { Component, OnInit, Input } from '@angular/core';
import {Contacts} from "../contacts";

@Component({
  selector: 'cms-contacts-group',
  templateUrl: './contacts-group.component.html'
})
export class ContactsGroupComponent implements OnInit {
 @Input() selectedContact: Contacts;
  constructor() { }

  ngOnInit() {
  }

}
