import NextAuth from 'next-auth';
import { session, signIn } from 'next-auth/client';
import Providers from 'next-auth/providers';
import nodemailer from 'nodemailer';

const options = {
   site: process.env.NEXTAUTH_URL,
   providers: [
      Providers.Google({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.Credentials({
         id: 'domain-login',
         name: 'Username/Password',
         authorize: async function (credentials) {
            console.log('creds', credentials);
            return { name: credentials.username };
         },
         credentials: {
            username: {
               label: 'Username',
               type: 'text ',
            },
            password: { label: 'Password', type: 'password' },
         },
      }),
      Providers.Email({
         server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
               user: process.env.EMAIL_SERVER_USER,
               pass: process.env.EMAIL_SERVER_PASSWORD,
            },
         },
         from: process.env.EMAIL_FROM,
      }),
   ],
   pages: {
      // signIn: '/auth/signin',
      newUser: null, // If set, new users will be directed here on first sign in
   },
   session: { jwt: true },
   debug: true,
   database: process.env.DATABASE_URL,
   callbacks: {
      /**
       * @param  {string} url      URL provided as callback URL by the client
       * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
       * @return {string}          URL the client will be redirect to
       */
      async redirect(url, baseUrl) {
         return baseUrl;
      },
   },
};

export default async (req, res) => {
   await NextAuth(req, res, options);
};
