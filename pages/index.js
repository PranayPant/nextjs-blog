import Head from 'next/head';
import Link from 'next/link';
import {useState} from 'react';

import { fetchQuote } from '../api';
import styles from './styles.module.scss';

export default function FirstPost(props) {

   const {quote} = props
   const [state, setState] = useState({quote})

   async function handleNewQuote() {
      const {quote} = await fetchQuote()
      setState( prev => ({...prev, quote}))
   }

   return (
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
                     <Link href="/">
                        <img src='/icons/home.svg' />
                     </Link>
                  </div>
               </div>
            </div>
         </header>
         <main>
            <div className={styles.main}>
               <div className={styles.content}>
                  <span className={styles.quote}>
                     {state.quote}
                  </span>
               </div>
            </div>
         </main>
         <footer>
            <div className={styles.footer}>
               <div onClick={handleNewQuote} className={styles.plus}>
                  <img src='/icons/plus.svg' />
               </div>
            </div>
         </footer>
      </div>
   );
}

export async function getStaticProps() {
   // Get external data from the file system, API, DB, etc.
   const data = await fetchQuote()

   // The value of the `props` key will be
   //  passed to the `Home` component
   return {
      props: data,
   };
}
