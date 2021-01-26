import * as Realm from 'real-web';

const MONGODB_APP_ID = "kanyespeaks-owdlg"
const MONGO_APP = new Realm.App({id: MONGODB_APP_ID})

export async function fetchQuote(){
    const response = await fetch('https://api.kanye.rest');
    const data = await response.json();
    return data
}