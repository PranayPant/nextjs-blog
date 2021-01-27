import * as Realm from 'realm-web'

const MONGODB_APP_ID = "kanyespeaks-owdlg"
const DB = {db: null}

export const MONGO_APP = new Realm.App({id: MONGODB_APP_ID})

export function connect(){
    const mongodb = MONGO_APP.currentUser.mongoClient("mongodb-atlas");
    DB.db = mongodb
}

export function getDBInstance(){
    return DB.db
}
