import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';

import { Button, ControlledTextField } from '../components';
import { useAuth } from '../core/auth';

const SignupSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignupSchemaType = z.infer<typeof SignupSchema>;

export const Signup = () => {
  const { signUp } = useAuth();

  const { handleSubmit, control } = useForm<SignupSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(SignupSchema),
  });

  const signup = () => {
    signUp();
  };

  return (
    <SafeAreaView style={styles.screenStyle}>
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
        <Button text="Sign up" style={styles.buttonStyle} onPress={handleSubmit(signup)} />
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
