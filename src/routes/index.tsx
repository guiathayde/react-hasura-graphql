import { Routes as Switch, Route, Navigate } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { Login } from '../pages/Login';
import { Querys } from '../pages/Querys';

export function Routes() {
  return (
    <Switch>
      <Route path="/login" element={<Login />} />

      <Route path="/querys" element={<PrivateRoute />}>
        <Route path="/querys" element={<Querys />} />
      </Route>
      {/* <Route path="/querys" element={<Dashboard />} /> */}

      <Route path="*" element={<Navigate to="/querys" replace />} />
    </Switch>
  );
}
