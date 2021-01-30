import * as Realm from 'realm-web';
import googleOneTap from 'google-one-tap';

import {connect, MONGO_APP} from './db'

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
    connectToDB()
    const user = await loginWithAnon()
    return {user}
}

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

export function loginGoogle(){
    const credentials = Realm.Credentials.google(process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI);
    // Calling logIn() opens a Google authentication screen in a new window.
    MONGO_APP.logIn(credentials).then(user => {
      // The logIn() promise will not resolve until you call `handleAuthRedirect()`
      // from the new window after the user has successfully authenticated.
      alert(`Logged in with id: ${user.id}`);
    })
    // When the user is redirected back to your app, handle the redirect to
    // save the user's access token and close the redirect window. This
    // returns focus to the original application window and automatically
    // logs the user in.
    Realm.handleAuthRedirect();
}

export function loginGoogleOneTap(){
    console.log('ontap')
    // Open the Google One Tap menu
    googleOneTap({ client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID }, async (response) => {
        console.log('ionside')
        // Upon successful Google authentication, log in to Realm with the user's credential
        const credentials = Realm.Credentials.google(response.credential)
        const user = await app.logIn(credentials);
        console.log(`Logged in with id: ${user.id}`);
    });
    console.log('outside')

}

