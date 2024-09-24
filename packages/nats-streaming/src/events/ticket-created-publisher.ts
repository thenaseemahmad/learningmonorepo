import { Publisher } from "./abstract-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEventDefinition } from "./ticket-created-event-definition";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEventDefinition> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}