
import Head from 'next/head'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function FirstPost(props){
    return(
        <div>
            <Head>
                <title>Quote of the Ye</title>
            </Head>
            <h1>First Post</h1>
            <Link href='/'><a>Back Home</a></Link>
            <div className={styles.imgContainer}><img src='/images/selfie.jpg' /></div>
            <div>
                <span>Kanye said whaaat???</span>
                <br />
                <span>{props.quote}</span>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    // Get external data from the file system, API, DB, etc.
    const response = await fetch('https://api.kanye.rest')
    const data = await response.json()
  
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: data
    }
  }