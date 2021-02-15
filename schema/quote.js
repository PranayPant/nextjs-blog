import * as yup from 'yup';

export const quoteSchema = yup.object().shape({
   quote: yup.string().required(),
   author: yup.string().required(),
   reactions: yup.array().of(
      yup.object().shape({
         emote: yup.string().required(),
         madeBy: yup.object().shape({
            name: yup.string(),
            image: yup.string(),
            email: yup.string().required(),
         }),
         createdOn: yup.date().default(function () {
            return new Date();
         }),
      }),
   ),
});
