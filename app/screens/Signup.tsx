import React from 'react';

import { Screen, SignupForm } from '../components';
import { useAuth } from '../core/auth';

export const Signup = () => {
  const { signUp } = useAuth();

  const onSubmit = () => {
    signUp('token');
  };

  return (
    <Screen>
      <SignupForm onSubmit={onSubmit} />
    </Screen>
  );
};
