import Pusher from "pusher";
import { Request, Response } from "express";
// import BodyParser from "body-parser";
// import CORS from "cors";

import jsonServer from "json-server"
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const pusherCredentials = {
  appId: process.env.API_ID || '',
  key: process.env.KEY || '',
  secret: process.env.APP_SECRET || '',
  cluster: process.env.APP_CLUSTER || '',
  encrypted: true
};
const pusher = new Pusher(pusherCredentials);

server.use(middlewares)

server.post('/matches/:id/join', (req: Request, res: Response) => {
  console.log("POST HERE")
  res.jsonp(req.query)
})

server.post('/message', (req: Request, res: Response) => {
  const payload = req.body;
  pusher.trigger('game', 'update', payload);
  res.send(payload)
});

server.use(router)
server.use(jsonServer.bodyParser)

server.listen(5000, () => {
  console.log('JSON Server is running')
})
