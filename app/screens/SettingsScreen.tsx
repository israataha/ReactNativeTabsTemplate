import React from 'react';
import { View } from 'react-native';

import { Button } from '../components';
import { useAuth } from '../core/auth';

export const SettingsScreen = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <Button text="Log out" onPress={signOut} />
    </View>
  );
};
