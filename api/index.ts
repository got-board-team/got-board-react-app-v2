import Pusher from "pusher";
import Express, { Request, Response } from "express";
import BodyParser from "body-parser";
import CORS from "cors";

const app = Express();
const pusherCredentials = {
  appId: process.env.API_ID || '',
  key: process.env.KEY || '',
  secret: process.env.APP_SECRET || '',
  cluster: process.env.APP_CLUSTER || '',
  encrypted: true
};
const pusher = new Pusher(pusherCredentials);

app.use(CORS());
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.set('PORT', process.env.PORT || 5000);

app.post('/message', (req: Request, res: Response) => {
  const payload = req.body;
  pusher.trigger('game', 'update', payload);
  res.send(payload)
});

function createGame(request: Request, response: Response) {
  console.log(request.body);
};

app.post('/games', createGame);

app.listen(
  app.get('PORT'),
  () => console.log('Listening at ' + app.get('PORT'))
)
