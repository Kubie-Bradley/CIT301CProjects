import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contacts } from '../../contacts/contacts';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {
  contacts: Contacts[] = [];
  @Output() contactSelected = new EventEmitter<Contacts>();
  contact = new Contacts('Contact', 'Brad Kubie', 'kub13004@byui.edu', '208-270-2029','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTrv9G-g7XBSwBON_gnnLHL95pPxnbXpsCsMTjgPrC6aDt5gTo0','group1');
  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contacts) {
    this.contactSelected.emit(contact);
  }

}
