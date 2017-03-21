import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";
import { Document } from '../document';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  private subscription: Subscription; // route subscription
  private oldDocument: Document; // ref. to old document
  private documentIdx: number;
  private editMode: boolean = false; // in edit mode flag?

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('idx')) {
            this.editMode = true;
            this.documentIdx = params['idx'];
            this.oldDocument = this.documentService.getDocument(this.documentIdx);
        } else {
          this.editMode = false;
          this.oldDocument = null;
        }

      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(value){
    let newDocument = new Document(null,
                                   value.documentTitle,
                                   value.documentUrl, null);
    if (this.editMode){
      newDocument.id = this.oldDocument.id;
      this.documentService.updateDocument(this.oldDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['documents']);

  }

  onCancel(){
    this.router.navigate(['documents']);
  }

}
