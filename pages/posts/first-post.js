import Head from 'next/head';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function FirstPost(props) {
   return (
      <div className={styles.container}>
         <Head>
            <title>Quote of the Ye</title>
         </Head>
         <header>
            <div className={styles.header}>
               <div className={styles.item}>
                  <h1>Kanye Quotes</h1>
               </div>
               <div className={styles.item}>
                  <Link href="/">
                     <a>Back Home</a>
                  </Link>
               </div>
            </div>
         </header>
         <div className={styles.main}>
            <main>
               <div>
                  <span>{props.quote}</span>
               </div>
            </main>
         </div>
      </div>
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
