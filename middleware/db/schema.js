export const collections = [
   {
      name: 'accounts',
   },
   {
      name: 'verificationRequests',
   },
   {
      name: 'authors',
      primaryKeys: ['name'],
      jsonSchema: {
         bsonType: 'object',
         required: ['name'],
         properties: {
            imageUrl: {
               required: false,
               type: 'string',
            },
            email: {
               required: false,
               type: 'string',
               patterns: `^.+\@.+$`,
            },
            name: {
               required: true,
               type: 'string',
            },
         },
      },
   },
   {
      name: 'users',
      primaryKeys: ['email'],
      jsonSchema: {
         bsonType: 'object',
         required: ['email'],
         properties: {
            imageUrl: {
               required: false,
               type: 'string',
            },
            email: {
               required: true,
               type: 'string',
               patterns: `^.+\@.+$`,
            },
            name: {
               required: true,
               type: 'string',
            },
         },
      },
   },
   {
      name: 'quotes',
      primaryKeys: ['authorId'],
      jsonSchema: {
         bsonType: 'object',
         required: ['authorId', 'quote'],
         properties: {
            authorId: {
               type: 'ObjectId',
               required: true,
            },
            quote: {
               type: 'string',
               required: true,
            },
         },
      },
   },
   {
      name: 'reactions',
      primaryKeys: ['userId', 'quoteId'],
      jsonSchema: {
         bsonType: 'object',
         required: ['userId', 'quoteId', 'emote'],
         properties: {
            userId: {
               type: 'ObjectId',
               required: true,
            },
            quoteId: {
               type: 'ObjectId',
               required: true,
            },
         },
      },
   },
];
