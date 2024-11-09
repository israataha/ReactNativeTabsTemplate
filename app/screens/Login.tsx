import React from 'react';

import { LoginForm, Screen } from '../components';
import { useAuth } from '../core/auth';

export const Login = () => {
  const { signIn } = useAuth();

  const onSubmit = () => {
    signIn('token');
  };

  return (
    <Screen>
      <LoginForm onSubmit={onSubmit} />
    </Screen>
  );
};
