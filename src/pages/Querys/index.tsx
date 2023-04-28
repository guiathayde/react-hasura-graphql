import { useEffect, useMemo, useState } from 'react';
import {
  gql,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
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
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const client = useMemo(() => {
    const link = createHttpLink({
      uri: 'http://hasura.pv4.ubv:8080/v1/graphql',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-role': 'common',
      },
      credentials: 'include',
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link,
    });
  }, []);

  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    client
      .query({
        query: GET_ACCOUNTS,
      })
      .then((response) => {
        console.log(response);
        setAccounts(response.data.v4_account);
      })
      .catch((error) => console.log(error));
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
