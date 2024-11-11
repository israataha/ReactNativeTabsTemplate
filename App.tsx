/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { AppNavigator } from '@/navigators/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './app/navigators/AppNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
