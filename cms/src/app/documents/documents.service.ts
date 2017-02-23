import { Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(){
    return this.documents;

  }

  getDocument(idx: number){
    return this.documents[idx];
  }

  deleteDocument(document: Document){
    this.documents.splice(this.documents.indexOf(document), 1);
  }
}
