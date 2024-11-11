import React from 'react';

import { screen, setup, waitFor } from '../test-utils';
import { TabNavigator } from './TabNavigator';

describe('TabNavigator', () => {
  it('renders correctly', () => {
    setup(<TabNavigator />);
  });

  it('should display Home screen initially', async () => {
    setup(<TabNavigator />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeDefined();
      expect(screen.getByTestId('settings-screen')).toBeDefined();

      expect(screen.getByRole('header')).toHaveTextContent('Home');
    });
  });

  it('should display Settings screen when clicking Settings tab', async () => {
    const { user } = setup(<TabNavigator />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeDefined();
      expect(screen.getByTestId('settings-screen')).toBeDefined();
    });

    await user.press(screen.getByTestId('settings-screen'));

    await waitFor(() => {
      expect(screen.getByRole('header')).toHaveTextContent('Settings');
    });
  });
});
