import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contacts";
import {Response, Http, Headers} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Injectable()
export class ContactsService {

  private contacts: Contact[] = [];
  getContactsEmitter = new EventEmitter<Contact[]>();
  currentContact: Contact;

  constructor(private http: Http) {
    this.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.getContactsEmitter.emit(this.contacts);
      }
    );
  }

  getContactById(id: string): Contact {
    return this.contacts.find((contact: Contact)=> contact.id === id);
  }



  getCurrentContact(){
    return this.currentContact;
  }

  getContacts() {
    return this.http.get('http://localhost:3000/contacts')
      .map((response: Response) => {
        this.contacts = response.json().obj;
        return this.contacts;
      })
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }


  getContact(idx: String){
    return this.contacts.find((contact: Contact) => contact.id === idx);
  }

  addContact(contact: Contact){
    const body = JSON.stringify(contact);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/contacts', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));

  }

  updateContact(contact: Contact) {
    const body = JSON.stringify(contact);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.patch("http://localhost:3000/contacts/" + contact.id, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  deleteContact(contact: Contact) {
    return this.http.delete("http://localhost:3000/contacts/" + contact.id)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }
}
