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
               <div className={styles.content}><span className={styles.quote}>{props.quote}</span></div>
            </div>
         </main>
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
