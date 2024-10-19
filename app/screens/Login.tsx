import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, TextField } from '../components';
import { useAuthStore } from '../stores/authStore';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const Login = () => {
  const { signIn } = useAuthStore();

  const { handleSubmit, control } = useForm<LoginSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  const login = () => {
    signIn('token');
  };

  return (
    <SafeAreaView style={styles.screenStyle}>
      <View style={styles.containerStyle}>
        <Text style={styles.headerTextStyle}> Log in</Text>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Email</Text>
          <TextField
            autoCapitalize="none"
            name="email"
            control={control}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Password</Text>
          <TextField
            autoCapitalize="none"
            control={control}
            name="password"
            secureTextEntry={true}
            style={styles.inputStyle}
            textContentType="password"
          />
        </View>
        <Button text="Login" style={styles.buttonStyle} onPress={handleSubmit(login)} />
        <Text style={styles.subtextStyle}>
          Don't have an account?{' '}
          <Link style={styles.linkStyle} to={{ screen: 'Signup' }}>
            Sign up
          </Link>
        </Text>
      </View>
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
  containerStyle: {
    alignSelf: 'stretch',
  },
  headerTextStyle: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 24,
  },
  inputContainerStyle: {
    marginHorizontal: 12,
    marginVertical: 2,
  },
  inputLabelStyle: {
    fontSize: 12,
  },
  inputStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 4,
    fontSize: 14,
    height: 40,
    marginVertical: 6,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  buttonStyle: {
    marginTop: 40,
  },
  subtextStyle: {
    marginHorizontal: 12,
    marginVertical: 18,
  },
  linkStyle: {
    fontWeight: '600',
  },
});
