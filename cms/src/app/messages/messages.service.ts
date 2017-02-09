import { Injectable } from '@angular/core';
import {Message} from "./message";
import {MOCKMESSAGES} from "./MOCKMESSAGES";

@Injectable()
export class MessagesService {
  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(){
    return this.messages;

  }

  getMessage(idx: number){
    Array.prototype.indexOf(this.messages, idx);
  }

}
