/**
 * The app navigator is used for the primary navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as Screens from '../screens';
import { NavigationContainer } from '@react-navigation/native';
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

type AppStackParamList = {
  Login: undefined;
  Welcome: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Screens.Login} />
      {/* <Stack.Screen name="Welcome" component={Screens.Welcome} /> */}
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
