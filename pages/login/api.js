import * as Realm from 'realm-web'
import {MONGO_APP} from '../../db'

export async function loginEmailPassword({email, password}){
    const creds = Realm.Credentials.emailPassword(email, password)
    try{
        const user = await MONGO_APP.logIn(creds)
        return user
    }
    catch(err){
        console.error("Failed to login user", err)
    }
}