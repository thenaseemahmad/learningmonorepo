import { Publisher } from "./abstract-publisher";
import { Subjects } from "./subjects";
import { UserCreatedEventDefinition } from "./user-created-event-definition";

export class NewUserCreatedEventPublisher extends Publisher<UserCreatedEventDefinition> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}