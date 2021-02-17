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
               bsonType: 'string',
            },
            email: {
               required: false,
               bsonType: 'string',
               pattern: '^.+@.+.$',
            },
            name: {
               required: true,
               bsonType: 'string',
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
               bsonType: 'string',
            },
            email: {
               required: true,
               patterns: `^.+\@.+$`,
            },
            name: {
               required: true,
               bsonType: 'string',
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
               bsonType: 'ObjectId',
               required: true,
            },
            quote: {
               bsonType: 'string',
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
               bsonType: 'ObjectId',
               required: true,
            },
            quoteId: {
               bsonType: 'ObjectId',
               required: true,
            },
            emote: {
               bsonType: 'string',
               required: 'true',
            },
         },
      },
   },
];
