import nextConnect from 'next-connect';
import dbMiddleware from '../../../middleware/db';

const handler = nextConnect();
handler.use(dbMiddleware);
handler.post(async (req, res) => {
   try {
      console.log(req.body);
      let doc = await req.db.collection('userLikes').insertOne(req.body);
      console.log(doc);
      res.json(doc);
   } catch (err) {
      console.log(err);
   }
});
export default handler;
