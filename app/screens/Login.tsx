import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ControlledTextField } from '../components';
import { useAuth } from '../core/auth';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const Login = () => {
  const { signIn } = useAuth();
  const { control, handleSubmit, getValues } = useForm<LoginSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async () => {
    const { email, password } = getValues();
    try {
      await signIn(email, password);
    } catch (err) {
      console.log('Login error: ', err);
    }
  };

  return (
    <SafeAreaView style={styles.screenStyle}>
      <View style={styles.containerStyle}>
        <Text style={styles.headerTextStyle}> Log in</Text>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Email</Text>
          <ControlledTextField
            name="email"
            control={control}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Password</Text>
          <ControlledTextField control={control} name="password" secureTextEntry={true} textContentType="password" />
        </View>
        <Button text="Login" style={styles.buttonStyle} onPress={handleSubmit(onSubmit)} />
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
