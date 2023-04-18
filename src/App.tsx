import { useCookies } from 'react-cookie';

import { Login } from './pages/Login';
import { Querys } from './pages/Querys';

import './App.css';

/*
  login
  salvar token no cookie
  usar token para fazer as requisições set ApolloClient header
*/

export function App() {
  const [cookies] = useCookies(['hasura-token']);

  if (cookies['hasura-token']) {
    return <Querys />;
  }

  return <Login />;
}
