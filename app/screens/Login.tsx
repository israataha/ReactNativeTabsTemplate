import React from 'react';

import { LoginForm, Screen } from '../components';
import { useAuth } from '../core/auth';

export const Login = () => {
  const { signIn } = useAuth();

  const onSubmit = async () => {
    try {
      await signIn('token');
    } catch (err) {
      console.log('Login error: ', err);
    }
  };

  return (
    <Screen>
      <LoginForm onSubmit={onSubmit} />
    </Screen>
  );
};
