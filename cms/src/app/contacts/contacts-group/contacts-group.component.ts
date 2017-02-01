import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Contact} from "../contacts";

@Component({
  selector: 'cms-contacts-group',
  templateUrl: './contacts-group.component.html'
})
export class ContactsGroupComponent implements OnInit {
 @Input() selectedContact: Contact;

 groupContact: Contact[] = [];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.groupContact = this.selectedContact.group;
  }

}
