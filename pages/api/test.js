

import nextConnect from 'next-connect';
import middleware from '../../middleware/db';

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {

    try{
        let doc = await req.db.collection('movies').findOne()
        console.log(doc);
        res.json(doc);
    }
    catch(err){
        console.log(err)
    }

});
export default handler;
