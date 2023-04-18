import { BrowserRouter } from 'react-router-dom';

import { AppProvider } from './hooks';

import { Routes } from './routes';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}
