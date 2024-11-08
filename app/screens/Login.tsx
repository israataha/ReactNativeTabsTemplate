import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { LoginForm } from '../components';
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
    <SafeAreaView style={styles.screenStyle}>
      <LoginForm onSubmit={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
});
