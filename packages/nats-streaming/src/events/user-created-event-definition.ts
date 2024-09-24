import { Subjects } from "./subjects";

export interface UserCreatedEventDefinition {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    fName: string;
    email: string
  };
}