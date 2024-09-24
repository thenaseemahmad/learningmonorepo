import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
export const stan = nats.connect('ticketing', randomBytes(8).toString('hex'), {
  url: 'http://localhost:4222'
});