import Head from 'next/head';
import Link from 'next/link';
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

   return (
      <>
         {loading && <Loader />}
         {!loading && !session && (
            <div className={styles.container}>
               <Head>
                  <title>Quote of the Ye</title>
               </Head>
               <header>
                  <div className={styles.header}>
                     <div className={styles.title}>
                        <h1>Kanye Quotes</h1>
                     </div>
                     <div className={styles.homeLink}>
                        <div className={styles.logo}>
                           <Link href="/api/auth/signin">
                              <img src="/icons/user.svg" />
                           </Link>
                        </div>
                     </div>
                  </div>
               </header>
               <main>
                  <div className={styles.main}>
                     <div className={styles.content}>
                        <span className={styles.quote}>{state.quote}</span>
                     </div>
                  </div>
               </main>
               <footer>
                  <div className={styles.footer}>
                     <div onClick={handleNewQuote} className={styles.plus}>
                        <img src="/icons/plus.svg" />
                     </div>
                  </div>
               </footer>
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
