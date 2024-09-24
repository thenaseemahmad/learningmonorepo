import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
import { UserCreatedListener } from "./events/user-created-listener";
console.clear();

const stan = nats.connect("ticketing", randomBytes(8).toString('hex'), {
  url: "http://localhost:4222"
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  //lets listen to close event, in case someone wants to close the connection
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
  new UserCreatedListener(stan).listen();
  //whole code from here is commented out because we have defined classes to do the same
  // const options = stan.subscriptionOptions()
  //   //set this option if you want your event to acknowledge after you processesed it
  //   //by default all events will be acknowledged as processed and lost forever
  //   .setManualAckMode(true)
  //   //everytime deliver all the historical events
  //   .setDeliverAllAvailable()
  //   //add a durable name if you want NATS to send only the historical events that 
  //   //are not acknowledged last time when they were sent over
  //   .setDurableName('email-verification-service');

  // const subscriber = stan.subscribe("user:created", "new-user-regisration-queue-group", options);
  // subscriber.on("message", (msg: Message) => {
  //   console.log("New event received, [" + msg.getSequence() + "] " + msg.getData());
  //   //to acknowledge back to NATS that the event has been processed
  //   msg.ack();
  // })
});

//handle the kill command or terminate command
//interrpt request
process.on("SIGINT", () => { stan.close() });
//terminate request
process.on("SIGTERM", () => { stan.close() });



