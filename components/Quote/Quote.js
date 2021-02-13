import { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';
import Emoji from '../Emoji';

export default function Quote(props) {
   const { quote } = props;
   const [state, setState] = useState({ quote });
   const [session, loading] = useSession();

   async function handleNewQuote() {
      const response = await fetch('https://api.kanye.rest');
      const { quote } = await response.json();
      setState((prev) => ({ ...prev, quote }));
   }

   function createReaction(e, reaction) {
      e.stopPropagation();
      if (!session) {
         router.push('/api/auth/signin');
      } else {
         fetch(`${window.location.origin}/api/likes/create`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               user: session.user,
               quote: state.quote,
               reaction,
            }),
         });
      }
   }
   return (
      <div onClick={handleNewQuote} className={styles.quoteBody}>
         <span className={styles.quote}>{state.quote}</span>
         <div className={styles.emojis}>
            <div className={styles.emojiBackground}>
               <Emoji
                  onClick={(e) => createReaction(e, 'thumbsUp')}
                  type="thumbsUp"
               />
               <Emoji
                  onClick={(e) => createReaction(e, 'thumbsDown')}
                  type="thumbsDown"
               />
            </div>
         </div>
      </div>
   );
}
