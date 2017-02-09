import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  private documents: Document[] = [];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentService.getMessages();
  }

}
