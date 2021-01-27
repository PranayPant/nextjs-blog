import * as Realm from 'realm-web';
import {connect, MONGO_APP} from '../db'

export async function fetchQuote(){
    const response = await fetch('https://api.kanye.rest');
    const data = await response.json();
    return data
}

function connectToDB(){
    return connect()
}

async function loginWithAnon(){
    const credentials = Realm.Credentials.anonymous();
    try{
        const user = await MONGO_APP.logIn(credentials);
        return user
    }
    catch(err){
        console.log('Failed to login anon user:', err)
        return null
    }
}

export async function init(){
    const user = await loginWithAnon()
    return {user}
}

