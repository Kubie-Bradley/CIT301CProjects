import {Injectable, EventEmitter} from '@angular/core';
import {Message} from "./message";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";
import {Observable} from "rxjs";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  getMessageEmitter = new EventEmitter<Message[]>();
  currentMessageObj: Message;
  currentMessageId: string;

  constructor(private http: Http) {
    this.currentMessageId = '1';
  }


  getMessages(){
    return this.http.get('http://localhost:3000/messages')
      .map((response: Response) => {
        this.messages = response.json().obj;
        return this.messages;
      })
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  // getMessage(idx: number){
  //   Array.prototype.indexOf(this.messages, idx);
  // }

  addMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:3000/messages', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

}
