import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
import { NewUserCreatedEventPublisher } from "./events/user-created-publisher";

console.clear();
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

stan.on('connect', async () => {
  console.log("Publisher connected to NATS");

  const newTicketCreated = new TicketCreatedPublisher(stan);
  try {
    await newTicketCreated.publish({
      id: '1234',
      title: 'Test ticket',
      price: 345
    });

  } catch (err) {

  }

  const newUserCreated = new NewUserCreatedEventPublisher(stan);
  try {
    await newUserCreated.publish({
      id: '1234xyz', fName: 'Naseem Ahamd', email: 'nasee@gmail.com'
    })

  } catch (err) {

  }
  // const data = JSON.stringify({
  //   id: '234',
  //   email: 'nasee@nasee.com'
  // });

  // stan.publish("ticket:created", data, (err, guid) => {
  //   if (err) {
  //     console.log("Event publish failed, Error: " + err);
  //   } else {
  //     console.log("Event published, Publish guid: " + guid);
  //   }
  // })
});