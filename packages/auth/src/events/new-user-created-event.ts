import { Publisher } from '../../../nats-streaming/src/events/abstract-publisher';
import { Subjects } from '../../../nats-streaming/src/events/subjects';
import { UserCreatedEventDefinition } from '../../../nats-streaming/src/events/user-created-event-definition';


export class NewUserCreatedEventPublisher extends Publisher<UserCreatedEventDefinition> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}