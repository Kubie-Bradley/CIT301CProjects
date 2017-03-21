import {Injectable, EventEmitter} from '@angular/core';
import {Message} from "./message";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];
  getMessageEmitter = new EventEmitter<Message[]>();
  currentMessageObj: Message;
  currentMessageId: string;

  constructor(private http: Http) {
    this.initMessages();
    this.currentMessageId = '1';
  }

  storeMessages() {
    const body = JSON.stringify(this.messages);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://kubiebcms.firebaseio.com/messages.json', body, {headers: headers}).toPromise();
  }

  initMessages(){
    return this.http.get('https://kubiebcms.firebaseio.com/messages.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Message[]) => {
          this.messages = data;
          this.getMessageEmitter.emit(this.messages);
        }
      );
  }
  getMessages(){
    return this.messages;

  }

  getMessage(idx: number){
    Array.prototype.indexOf(this.messages, idx);
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }

}
