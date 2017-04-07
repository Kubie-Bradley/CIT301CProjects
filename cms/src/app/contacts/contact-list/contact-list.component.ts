import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Contact} from "../contacts";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html'
})

export class ContactListComponent implements OnInit {

  @Output() selectedContact = new EventEmitter<Contact>();
  contact: Contact = null;
  contacts: Contact[]= [];
  term: string;


  constructor(private contactService: ContactsService) {
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe();
    this.contactService.getContactsEmitter.subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );
  }

  onSelected(contact: Contact) {
    this.selectedContact.emit(contact);
  }


onKeyPress(value: string){
    this.term = value;
}


}




