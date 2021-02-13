import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
   text: { type: String, required: true },
   author: { type: String, required: true },
   reactions: [
      {
         emote: { type: String, required: true },
         madeBy: {
            name: String,
            image: String,
            email: { type: String, required: true },
         },
      },
   ],
});

export default mongoose.model('Quote', quoteSchema);
