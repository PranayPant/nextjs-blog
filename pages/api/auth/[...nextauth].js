import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {

  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    redirect: async (url, baseUrl) => {
      return Promise.resolve('/profile/')
    }
  },
  pages: {
    signIn: '/auth/signin',
    newUser: null // If set, new users will be directed here on first sign in
  }
}

export default async (req, res) => {
    await NextAuth(req, res, options)
}