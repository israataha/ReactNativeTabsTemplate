/**
 * The app navigator is used for the primary navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { useAuth } from '../core/auth';
import * as Screens from '../screens';
import { TabNavigator, TabParamList } from './TabNavigator';
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
  Signup: undefined;
  Welcome: undefined;
  BottomTabs: NavigatorScreenParams<TabParamList>;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isAuthenticated ? 'Welcome' : 'Login'}>
      {isAuthenticated ? (
        <Stack.Screen name="BottomTabs" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.Login} />
          <Stack.Screen name="Signup" component={Screens.Signup} />
        </>
      )}
    </Stack.Navigator>
  );
};
