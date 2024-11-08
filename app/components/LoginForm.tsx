import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@react-navigation/native';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ControlledTextField } from '.';

const LoginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

type LoginFormType = z.infer<typeof LoginSchema>;

export type LoginFormProps = {
  onSubmit: SubmitHandler<LoginFormType>;
};

export const LoginForm = (props: LoginFormProps) => {
  const { onSubmit } = props;
  const { control, handleSubmit } = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
  });

  return (
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
      <Button style={styles.buttonStyle} testID="login-button" text="Login" onPress={handleSubmit(onSubmit)} />
      <Text style={styles.subtextStyle}>
        Don't have an account?{' '}
        <Link style={styles.linkStyle} to={{ screen: 'Signup' }}>
          Sign up
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
