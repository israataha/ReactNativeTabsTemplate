import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@react-navigation/native';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ControlledTextField } from '.';

const SignupSchema = z.object({
  first_name: z.string({ required_error: 'First name is required' }),
  last_name: z.string({ required_error: 'Last name is required' }),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

type SignupFormType = z.infer<typeof SignupSchema>;

export type SignupFormProps = {
  onSubmit: SubmitHandler<SignupFormType>;
};

export const SignupForm = (props: SignupFormProps) => {
  const { onSubmit } = props;
  const { handleSubmit, control } = useForm<SignupFormType>({
    mode: 'onBlur',
    resolver: zodResolver(SignupSchema),
  });

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.headerTextStyle}> Create an account</Text>

      <Text style={styles.subtextStyle}>
        Already have an account?{' '}
        <Link style={styles.linkStyle} to={{ screen: 'Login' }}>
          Log in
        </Link>
      </Text>

      <View style={styles.inputContainerStyle}>
        <Text style={styles.inputLabelStyle}>First Name</Text>
        <ControlledTextField autoCapitalize="words" control={control} name="first_name" textContentType="givenName" />
      </View>

      <View style={styles.inputContainerStyle}>
        <Text style={styles.inputLabelStyle}>Last Name</Text>
        <ControlledTextField autoCapitalize="words" control={control} name="last_name" textContentType="familyName" />
      </View>

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
      <Button text="Sign up" style={styles.buttonStyle} testID="signup-button" onPress={handleSubmit(onSubmit)} />
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
  subtextStyle: {
    marginHorizontal: 12,
    marginVertical: 18,
  },
  linkStyle: {
    fontWeight: '600',
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
});
