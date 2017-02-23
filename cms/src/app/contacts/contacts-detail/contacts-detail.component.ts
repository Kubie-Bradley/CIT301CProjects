import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Contact} from "../contacts";
import {Subscription} from "rxjs";
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html'
})
export class ContactsDetailComponent implements OnInit {
 @Input() selectedContact: Contact;
  private subscription: Subscription;
  private contactIdx: number;
  private contact: Contact;
  private contactGroup: Contact[]=[];

  constructor(private contactService: ContactsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIdx = params['idx'];
        this.contact = this.contactService.getContact(this.contactIdx);
        this.contactGroup = this.contact.group;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
