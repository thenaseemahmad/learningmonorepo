import { Message } from "node-nats-streaming";
import { Listener } from "./abstract-listener";
import { TicketCreatedEventDefinition } from "./ticket-created-event-definition";
import { Subjects } from "./subjects";


export class TicketCreatedListener extends Listener<TicketCreatedEventDefinition> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEventDefinition['data'], msg: Message) {
    console.log(`Message#: ${msg.getSequence()}, Data: ${JSON.stringify(data)}`);
    //do whatever you want to do with your event here
    //we need to ack this message 
    msg.ack();
  }
}