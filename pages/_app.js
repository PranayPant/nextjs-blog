import '../styles/global.scss';
import { Provider } from 'next-auth/client';

export default function App({ Component, pageProps }) {
   return (
      <Provider session={pageProps.session}>
         <Component {...pageProps} />
      </Provider>
   );
}
