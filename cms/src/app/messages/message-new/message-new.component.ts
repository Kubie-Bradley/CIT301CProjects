import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contacts/contacts";
import {ContactsService} from "../../contacts/contacts.service";
import {MessagesService} from "../messages.service";
import {Message} from "../message";
import {Router} from "@angular/router";



@Component({
  selector: 'cms-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {

  private sender: Contact;

  constructor(private contactService: ContactsService,
              private messageService: MessagesService,
              private router: Router
              ) {
    this.sender = this.contactService.getCurrentContact()
  }

  onSubmit(value){
    const newMessage = new Message("", this.sender.name,"",value.message);
    this.messageService.addMessage(newMessage);
    this.router.navigate(['messages']);
  }

  onCancel(){
    this.router.navigate(['messages']);
  }


  ngOnInit() {

  }

}
