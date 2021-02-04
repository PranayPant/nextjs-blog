import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

async function database(req, res, next) {
   if (process.env.NODE_ENV === 'development') {
      if (!client.isConnected()) await client.connect();
      req.dbClient = client;
      req.db = client.db(process.env.DB);
      return next();
   } else {
      return res
         .status(404)
         .json({ message: 'The page you are looking for does not exist' });
   }
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
