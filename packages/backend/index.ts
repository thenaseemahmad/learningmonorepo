import express from 'express';
import { NewUserCreatedEventPublisher } from './events/new-user-created';
import { natsWrapper } from './events/nats-wrapper';
const app = express();



app.get('/data', async (req, res) => {
  await new NewUserCreatedEventPublisher(natsWrapper.client).publish({
    id: '1234', fName: 'Naseem', email: 'Nase@nas.com'
  })
  res.send({ foo: 'bar' });
});

app.listen(3001, async () => {
  await natsWrapper.connect('ticketing', 'abc', 'http://localhost:4222')
  console.log('Server is listening on 3001')
});