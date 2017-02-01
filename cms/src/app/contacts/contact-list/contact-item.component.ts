import {Component, OnInit, Input} from '@angular/core';
import { Contact } from '../contacts';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit() {
  }

}
