import {Component, OnInit, Input} from '@angular/core';
import { Contacts } from '../contacts';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contacts;

  constructor() { }

  ngOnInit() {
  }

}
