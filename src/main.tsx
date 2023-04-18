import React from 'react';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import { App } from './App';

const client = new ApolloClient({
  uri: 'http://hasura.pv4.ubv:8080/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': 'admin',
  },
});

client
  .query({
    query: gql`
      query MyQuery {
        v4_account {
          account_id
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ApolloProvider>
  </React.StrictMode>
);
