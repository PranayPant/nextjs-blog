import mongoose from 'mongoose';
import nextConnect from 'next-connect';

async function init() {
   try {
      mongoose.connect(process.env.DATABASE_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
   } catch (err) {
      console.log(('Err in db conn', err));
   }
}

async function database(req, res, next) {
   if (!mongoose.connection) await init();
   console.log('connection is', mongoose.connection);
   return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
