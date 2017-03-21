import {Injectable, EventEmitter} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  getDocumentsEmitter = new EventEmitter<Document[]>();
  currentDocumentObj: Document;
  currentDocumentId: string;


  constructor(private http: Http) {
    this.initDocuments();
    this.currentDocumentId = '1';
    // this.documents = MOCKDOCUMENTS;
  }

  storeDocuments() {
    const body = JSON.stringify(this.documents);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://kubiebcms.firebaseio.com/documents.json', body, {headers: headers}).toPromise();
  }

  initDocuments(){
    return this.http.get('https://kubiebcms.firebaseio.com/documents.json').map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.getDocumentsEmitter.emit(this.documents);
        }
      );
  }

  getDocuments(){
    return this.documents;

  }

  getDocument(idx: number){
    return this.documents[idx];
  }

  deleteDocument(document: Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0){
      return;
    }
    this.documents.splice(pos, 1)
    this.storeDocuments();
  }

  addDocument(document: Document){
    if(document === null){
      return;
    }
    this.documents.push(document);
    this.storeDocuments();
  }

  updateDocument(oldDoc: Document, newDoc: Document){
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
    this.storeDocuments();
  }

}
