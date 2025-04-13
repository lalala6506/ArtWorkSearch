import '@/styles/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';




export default function App({ Component, pageProps }) {
  
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => {
          const res = await fetch(url);
          // If the status code is not in the range 200-299, we try to parse and throw the error.
          if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.');
            error.info = await res.json();
            error.status = res.status;
            throw error;
          }
          return res.json();
        },
      }}
    >
      <RouteGuard>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </RouteGuard>
    </SWRConfig>
  );

}
