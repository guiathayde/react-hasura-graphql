import { FormEvent, useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import styles from './styles.module.css';

export function Login() {
  const [cookies, setCookies] = useCookies(['hasura-token']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const response = await axios.post(
        'http://auth.pv4.ubv:8111/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    },
    [email, password]
  );

  return (
    <form
      className={styles.container}
      onSubmit={async (e) => await handleLogin(e)}
    >
      <input
        type="email"
        autoComplete="on"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        autoComplete="on"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
