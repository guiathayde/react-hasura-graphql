import { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { gql, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

import styles from './styles.module.css';

interface Account {
  account_id: number;
  email: string;
}

const GET_ACCOUNTS = gql`
  query MyQuery {
    v4_account {
      account_id
      email
    }
  }
`;

export function Querys() {
  const [cookies] = useCookies(['hasura-token']);

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: 'http://hasura.pv4.ubv:8080/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-token': cookies['hasura-token'],
          'x-hasura-admin-secret': 'admin',
          'x-hasura-role': 'common',
        },
      }),
    []
  );

  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const accounts = data.v4_account as Account[];

  return (
    <>
      {accounts.map(({ account_id, email }) => (
        <div key={account_id}>
          <h3>{email}</h3>
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.container}>
      <h1>Querys</h1>
    </div>
  );
}
