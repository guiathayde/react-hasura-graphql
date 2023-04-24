import { FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import styles from './styles.module.css';

export function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
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
            withCredentials: true,
          }
        );

        console.log(response.data);

        const { account_id } = response.data;

        setUser({
          account_id,
          email,
        });

        navigate('/querys');
      } catch (error) {
        alert('Erro ao fazer login: ' + String(error));
        console.error(error);
      }
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
