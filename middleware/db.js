import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(
   'mongodb+srv://admin:r883aQR84hQ6bvA@cluster0.uvsds.mongodb.net/sample_mflix?retryWrites=true&w=majority',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   },
);

async function database(req, res, next) {
   if (!client.isConnected()) await client.connect();
   req.dbClient = client;
   req.db = client.db('sample_mflix');
   return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
