import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

import init from './setup';

const client = new MongoClient(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

async function database(req, res, next) {
   let db;
   try {
      if (!client.isConnected()) {
         await client.connect();
         db = client.db(process.env.DB);
         await init({ db });
      }
      req.db = db;
   } catch (err) {
      console.log('Err setting up db:', err);
      res.status(500);
      res.send('Internal Server Error');
   }

   return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
