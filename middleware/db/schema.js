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
   },
   {
      name: 'users',
      primaryKeys: ['email'],
   },
   {
      name: 'quotes',
      primaryKeys: ['authorId'],
   },
   {
      name: 'reactions',
      primaryKeys: ['userId', 'quoteId'],
   },
];
