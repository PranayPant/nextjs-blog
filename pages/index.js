import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import Profile from './profile';
import Loader from '../components/Loader';

export default function FirstPost(props) {
   const { quote } = props;
   const [state, setState] = useState({ quote, user: null });
   const [session, loading] = useSession();

   async function handleNewQuote() {
      const response = await fetch('https://api.kanye.rest');
      const { quote } = await response.json();
      setState((prev) => ({ ...prev, quote }));
   }

   async function handleLogin() {
      if (!session) {
         router.push('/api/auth/signin');
      }
   }

   return (
      <>
         {loading && <Loader />}
         {!loading && !session && (
            <div className={styles.container}>
               <Head>
                  <title>Kanye Quotes</title>
               </Head>
               <header>
                  <div className={styles.header}>
                     <div className={styles.title}>
                        <h1>Quote of the 'Ye</h1>
                     </div>
                  </div>
               </header>
               <main>
                  <div className={styles.main}>
                     <div className={styles.content}>
                        <div
                           onClick={handleNewQuote}
                           className={styles.fieldset}
                        >
                           <span className={styles.quote}>{state.quote}</span>
                        </div>
                        <div className={styles.emojis} onClick={handleLogin}>
                           <img
                              height="40"
                              width="40"
                              className={styles.upvote}
                              src="/icons/thumbs-up.svg"
                           />
                           <img
                              height="40"
                              width="40"
                              className={styles.downvote}
                              src="icons/thumbs-down.svg"
                           />
                        </div>
                     </div>
                  </div>
               </main>
            </div>
         )}
         {!loading && session && <Profile />}
      </>
   );
}

export async function getStaticProps() {
   // Get external data from the file system, API, DB, etc.
   const response = await fetch('https://api.kanye.rest');
   const data = await response.json();

   // The value of the `props` key will be
   //  passed to the `Home` component
   return {
      props: data,
   };
}
