import { collections } from './schema';
import { MongoClient } from 'mongodb';

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

export async function setup(db) {
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

export function getDbClient(url) {
   return new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
}

export async function connectDb(client, _db) {
   try {
      if (!client.isConnected()) {
         await client.connect();
      }
      const db = _db ? client.db(_db) : client.db();
      return db;
   } catch (err) {
      console.error('Err connecting to db:', err);
      throw new Error(err);
   }
}

export default async function init(dbUrl, dbName) {
   try {
      const client = getDbClient(dbUrl);
      const db = await connectDb(client, dbName);
      await setup(db);
      return db;
   } catch (err) {
      console.error('Err initializing db connection:', err);
      throw new Error(err);
   }
}
