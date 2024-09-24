import { Subjects } from "./subjects";

export interface TicketCreatedEventDefinition {
  subject: Subjects.TicketCreated
  data: {
    id: string;
    title: string;
    price: number;
  }
}