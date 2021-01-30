import * as Realm from 'realm-web'

const DB = {db: null}

export const MONGO_APP = new Realm.App({id: process.env.NEXT_PUBLIC_REALM_APP_ID})

export function connectToDB(){
    const mongodb = MONGO_APP.currentUser.mongoClient("mongodb-atlas");
    DB.db = mongodb
}

export function getDBInstance(){
    return DB.db
}
