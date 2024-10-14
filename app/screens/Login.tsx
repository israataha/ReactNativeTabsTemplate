import { Text, TextInput, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuthStore } from '../stores/authStore';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuthStore();

  const login = () => {
    signIn('token');
  };

  return (
    <SafeAreaView style={styles.screenStyle}>
      <View style={styles.containerStyle}>
        <Text style={styles.headerTextStyle}> Log in</Text>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Email</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.inputStyle}
          />
        </View>

        <View style={styles.inputContainerStyle}>
          <Text style={styles.inputLabelStyle}>Password</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.inputStyle}
          />
        </View>
        <Button text="Login" style={styles.buttonStyle} onPress={login} />
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
});
