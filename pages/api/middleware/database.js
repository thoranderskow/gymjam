import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient("mongodb+srv://Tskow:NA3t9BBCv2W6EA2F@cluster-gj.rgowv.mongodb.net/gjdb?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('gjdb');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
