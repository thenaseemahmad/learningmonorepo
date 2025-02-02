import nats, { Stan } from 'node-nats-streaming';

class NatsClient {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting!');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url: url });
    return new Promise<void>((resolve, reject) => {
      this._client?.on('connect', () => {
        console.log('Connected with NATS successfully')
        return resolve();
      })
      this._client?.on('error', (err) => { reject(err) })
    });
  }
};

export const natsClient = new NatsClient();