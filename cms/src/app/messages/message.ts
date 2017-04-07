import {Contact} from "../contacts/contacts";
export class Message {
  constructor(public id: String, public subject: String, public text: String,  public sender: Contact) {

  }
}
