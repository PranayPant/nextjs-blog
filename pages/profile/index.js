import { useSession, signOut } from 'next-auth/client';

export default function Profile() {
   const [session] = useSession();

   return (
      <p>
         Signed in as {JSON.stringify(session)}
         <button onClick={signOut}>Sign Out</button>
      </p>
   );
}
