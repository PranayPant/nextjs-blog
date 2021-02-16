import nextConnect from 'next-connect';
import dbMiddleware from '../../../middleware/db';
import { quoteSchema } from '../../../schema/quote';

const handler = nextConnect();
handler.use(dbMiddleware);
handler.post(async (req, res) => {
   try {
      const payload = req.body;
      const isValid = await quoteSchema.isValid(quoteSchema.cast(payload));
      if (isValid) {
         const filter = {
            quote: payload.quote,
            author: payload.author,
            reactions: {
               $elemMatch: {
                  madeBy: {
                     email: payload.reactions[0].madeBy.email,
                  },
               },
            },
         };
         const update = { $set: payload };
         const options = { upsert: true };
         const doc = await req.db
            .collection('quotes')
            .updateOne(filter, update, options);
         console.log('Successfully inserted!');
         res.status(200);
         res.end('Successful insert!');
      } else {
         res.status(400).send('Bad Payload');
      }
   } catch (err) {
      console.log(err);
      res.status(500);
      res.json({
         body: { message: 'Internal Server Error', err },
      });
   }
});
export default handler;
