import nextConnect from 'next-connect';

import init, { getDbClient, connectDb } from './setup';

async function database(req, res, next) {
   try {
      const client = getDbClient(process.env.DATABASE_URL);
      const db = await connectDb(client);
      req.db = db;
   } catch (err) {
      console.error('Err accessing db from middleware:', err);
      res.status(500);
      res.send('Internal Server Error');
   }
   return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
