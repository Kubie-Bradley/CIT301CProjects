import {Injectable, EventEmitter} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { Document } from './document';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];
  getDocumentsEmitter = new EventEmitter<Document[]>();
  currentDocumentId: string;


  constructor(private http: Http) {
    this.getDocuments().subscribe(
      (data: Document[]) => {
        this.documents = data;
        this.getDocumentsEmitter.emit(this.documents);
      }
    );
    this.currentDocumentId = '1';
    // this.documents = MOCKDOCUMENTS;
  }

  // storeDocuments() {
  //   const body = JSON.stringify(this.documents);
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.put('https://kubiebcms.firebaseio.com/documents.json', body, {headers: headers}).toPromise();
  // }



  getDocuments(){
    return this.http.get('http://localhost:3000/documents')
      .map((response: Response) => {
       this.documents = response.json().obj;
       return this.documents;
      })
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  getDocument(id: string){
    return this.documents.find((document: Document) => document.id === id);
  }

  deleteDocument(document: Document){
    return this.http.delete("http://localhost:3000/documents/" + document.id)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  addDocument(document: Document) {
  const body = JSON.stringify(document);
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  return this.http.post('http://localhost:3000/documents', body, {headers: headers})
    .map((response: Response) => response.json())
    .catch((error: Response) => Observable.throw(JSON.stringify(error)));
}
  updateDocument(document: Document){
    const body = JSON.stringify(document);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.patch("http://localhost:3000/documents/" + document.id, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

}
