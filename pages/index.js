import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import Emoji from '../components/Emoji';
import Quote from '../components/Quote';
import Loader from '../components/Loader';

export default function Home(props) {
   const { quote } = props;
   const [session, loading] = useSession();

   return (
      <>
         <Head>
            <title>Kanye Quotes</title>
         </Head>
         {loading && <Loader />}
         {!loading && (
            <div className={styles.container}>
               <header>
                  <div className={styles.header}>
                     <div className={styles.title}>
                        <h1>Quote of the 'Ye</h1>
                     </div>
                     {session && (
                        <div className={styles.profile}>
                           <div className={styles.profileIcon}>
                              <img
                                 height="40"
                                 width="40"
                                 src="/icons/user.svg"
                              />
                           </div>
                           <div className={styles.profileMenu}>
                              <nav>
                                 <ul>
                                    <li>
                                       <Link href="/profile">
                                          <a>Profile</a>
                                       </Link>
                                    </li>

                                    <li>
                                       <Link href="#">
                                          <a onClick={signOut}>Sign Out</a>
                                       </Link>
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                        </div>
                     )}
                  </div>
               </header>
               <main>
                  <div className={styles.main}>
                     <div className={styles.content}>
                        <Quote quote={quote} />
                     </div>
                  </div>
               </main>
            </div>
         )}
      </>
   );
}

export async function getStaticProps() {
   // Get external data from the file system, API, DB, etc.
   const response = await fetch('https://api.kanye.rest');
   const data = await response.json();

   console.log(data);

   // The value of the `props` key will be
   //  passed to the `Home` component
   return {
      props: data,
   };
}
