import React from 'react';

import { useAuth } from '../core/auth';
import { screen, setup, waitFor } from '../test-utils';
import { AppNavigator } from './AppNavigator';

// Mock the useAuth hook
jest.mock('../core/auth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('AppNavigator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    setup(<AppNavigator />);
  });

  it('should display Login screen if not authenticated', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    setup(<AppNavigator />);

    await waitFor(() => {
      expect(screen.getByText('Log in')).toBeDefined();
    });
  });

  it('should navigate to Sign up screen from Login screen', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    const { user } = setup(<AppNavigator />);

    await waitFor(() => {
      expect(screen.getByText('Log in')).toBeDefined();
      expect(screen.getByText('Sign up')).toBeDefined();
    });

    await user.press(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(screen.getByText('Create an account')).toBeDefined();
    });
  });

  it('should display Home screen if authenticated', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    setup(<AppNavigator />);

    await waitFor(() => {
      expect(screen.getByTestId('home-screen')).toBeDefined();
      expect(screen.getByRole('header')).toHaveTextContent('Home');
    });
  });
});
