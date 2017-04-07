import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../contacts";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  private subscription: Subscription;
  private editMode: boolean = false;
  private hasGroup: boolean = false;
  private contactIdx: String;
  private oldContact: Contact;
  private groupContacts: Contact[]=[];
  private invalidGroupContact: boolean = true;

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.invalidGroupContact = false;
    this.subscription = this.route.params.subscribe(
      (params: any)=>{
        this.contactIdx = params['idx'];
        this.oldContact = this.contactService.getContact(this.contactIdx);
      }
    )
    this.editMode = true;
    if(this.groupContacts.length > 0){
      this.hasGroup = true;
    }

    this.groupContacts = this.groupContacts.splice(0);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(value){
    let newContact = new Contact(null, value.name, value.email, value.phone, value.imageUrl, null);
    if(this.editMode){
      newContact.id = this.oldContact.id;
      this.contactService.updateContact(newContact).subscribe();
    } else {
      this.contactService.addContact(newContact).subscribe();
    }

    this.router.navigate(['contacts']);
  }

  onCancel(){
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact){
    if (!newContact){
      return true;
    }

    if(newContact.id === this.oldContact.id){
      return true;
    }

    for(let i=0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    // If contact is outside the bounds of the array
    if (idx < 0 || idx >= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }


}
