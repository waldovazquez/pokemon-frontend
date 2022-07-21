import React from 'react';

import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import {
  getLocalStorage,
} from './storage';

function ProtectedRoute() {
  const authToken = getLocalStorage('x-access-token');

  return (
    authToken ? <Outlet /> : <Navigate to="/sign-in" />
  );
}

export default ProtectedRoute;
