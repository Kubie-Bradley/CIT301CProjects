import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentsService} from "../documents.service";
import { Document } from  "../document";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'cms-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {

  private subscription: Subscription;
  private documentIdx: number;
  document: Document;
  private nativeWindow: any;

  constructor(private documentService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router,
              private windRefService: WindRefService) {
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.documentIdx = params['idx'];
        this.document = this.documentService.getDocument(this.documentIdx);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onView(){
    if(!this.document){
      return;
    }

    let currentUrl = this.document.url;
    this.nativeWindow.open(currentUrl);
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
