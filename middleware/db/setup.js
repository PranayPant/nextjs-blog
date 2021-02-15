import { collections } from './schema';

async function createNewCollections(db, lookup) {
   // Process schema
   // Create new collections as needed
   // Mark old collections for deletion
   return Promise.all(
      collections.map(({ name, primaryKeys }) => {
         // If schema collection NOT IN REMOTE, create it
         if (lookup[name] === undefined) {
            console.log('Creating collection', name);
            return db.createCollection(name);
         } else {
            lookup[name] = true;
            return Promise.resolve();
         }
      }),
   );
}

async function deleteOldCollections(db, lookup) {
   // Iterate over old collections and delete them
   return Promise.all(
      Object.keys(lookup).map((name) => {
         if (lookup[name] === false) {
            console.log('Dropping collection', name);
            return db.dropCollection(name);
         }
      }),
   );
}

export default async function init({ db }) {
   try {
      // Get all collection from db
      const res = await db.listCollections().toArray();
      const remoteCollections = res.map((d) => d.name);

      // Record names for later comparison
      const lookup = {};
      remoteCollections.forEach((name) => {
         lookup[name] = false;
      });
      await Promise.all([
         createNewCollections(db, lookup),
         deleteOldCollections(db, lookup),
      ]);
      console.log('Successfully instantiated schema');
   } catch (err) {
      console.error('Err creating schema:', err);
   }
}
