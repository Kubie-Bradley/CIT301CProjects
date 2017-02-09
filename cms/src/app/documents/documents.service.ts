import { Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getMessages(){
    return this.documents;

  }

  getMessage(idx: number){
    Array.prototype.indexOf(this.documents, idx);
  }

}
