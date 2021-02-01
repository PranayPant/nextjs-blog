import { useSession } from 'next-auth/client'

export default () => {
  const [ session, loading ] = useSession()

  return <>
    {session && <p>Signed in as {session.user.email}</p>}
    {!session && <p><a href="/api/auth/signin">Sign in</a></p>}
  </>
}