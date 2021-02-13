import nextConnect from 'next-connect';
import dbMiddleware from '../../../middleware/db';
import Quote from '../../../schema/quote';

const handler = nextConnect();
handler.use(dbMiddleware);
handler.post(async (req, res) => {
   try {
      console.log(req.body);
      const quote = new Quote({
         text: req.body.quote,
         author: 'Kanye West',
         reactions: [
            {
               emote: req.body.reaction,
               madeBy: { ...req.body.user },
            },
         ],
      });
      const savedQuote = await quote.save();
      res.json(savedQuote);
   } catch (err) {
      console.log(err);
   }
});
export default handler;
