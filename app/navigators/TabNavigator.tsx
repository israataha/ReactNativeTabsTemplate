import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Home, Settings } from '../icons';
import { SettingsScreen, Welcome } from '../screens';

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

const HomeIcon = ({ color }: { color: string }) => {
  return <Home color={color} />;
};

const SettingsIcon = ({ color }: { color: string }) => {
  return <Settings color={color} />;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Welcome} options={{ tabBarIcon: HomeIcon, tabBarTestID: 'home-screen' }} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: SettingsIcon, tabBarTestID: 'settings-screen' }}
      />
    </Tab.Navigator>
  );
};
