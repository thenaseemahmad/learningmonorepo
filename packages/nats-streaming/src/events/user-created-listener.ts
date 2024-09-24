import { Listener } from "./abstract-listener";
import { Message } from "node-nats-streaming";
import { UserCreatedEventDefinition } from "./user-created-event-definition";
import { Subjects } from "./subjects";

export class UserCreatedListener extends Listener<UserCreatedEventDefinition> {
  readonly subject = Subjects.UserCreated
  queueGroupName = 'welcome-service';
  onMessage(data: UserCreatedEventDefinition['data'], msg: Message) {
    console.log(`Message#: ${msg.getSequence()}, Data: ${JSON.stringify(data)}`);
    //do whatever you want to do with your event here
    //we need to ack this message
    msg.ack();
  }
}