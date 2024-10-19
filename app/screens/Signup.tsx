import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { useAuthStore } from '../stores/authStore';

export const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuthStore();

  const signup = () => {
    signUp('token');
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
          <TextInput
            autoCapitalize="words"
            value={firstName}
            onChangeText={setFirstName}
            textContentType="givenName"
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Last Name</Text>
          <TextInput
            autoCapitalize="words"
            value={lastName}
            onChangeText={setLastName}
            textContentType="familyName"
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Email</Text>
          <TextInput
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            textContentType="emailAddress"
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Password</Text>
          <TextInput
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            textContentType="password"
            style={styles.inputStyle}
          />
        </View>
        <Button text="Sign up" style={styles.buttonStyle} onPress={signup} />
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
});
