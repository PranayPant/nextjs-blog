import { useSession, signOut } from 'next-auth/client';

export default function Profile() {
   const [session, loading] = useSession();

   return (
      <>
         {session && (
            <p>
               Signed in as {JSON.stringify(session.user)}
               <button onClick={signOut}>Sign Out</button>
            </p>
         )}
         {!session && (
            <p>
               <a href="/api/auth/signin">Sign in</a>
            </p>
         )}
      </>
   );
}
