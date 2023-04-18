import { useEffect, useMemo, useState } from 'react';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

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
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const client = useMemo(
    () =>
      new ApolloClient({
        uri: 'http://hasura.pv4.ubv:8080/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'admin',
          'x-hasura-account-id': user ? String(user.account_id) : '1',
          'x-hasura-role': 'common',
        },
      }),
    []
  );

  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    client
      .query({
        query: GET_ACCOUNTS,
      })
      .then(({ data }) => {
        setAccounts(data.v4_account);
      });
  }, []);

  return (
    <>
      <button
        className={styles.logout}
        onClick={() => {
          setUser(undefined);
          navigate('/login');
        }}
      >
        Logout
      </button>

      {accounts.map(({ account_id, email }) => (
        <div key={account_id}>
          <h2>{account_id}</h2>
          <h3>{email}</h3>
        </div>
      ))}
    </>
  );
}
