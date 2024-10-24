import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions, userEvent } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

const createAppWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => <NavigationContainer>{children}</NavigationContainer>;
};

// use this if you want to test user events
export const setup = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  const Wrapper = createAppWrapper();
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};

export * from '@testing-library/react-native';
