import React from 'react';

import { cleanup, screen, setup, waitFor } from '../test-utils';
import { LoginForm, LoginFormProps } from './LoginForm';

afterEach(cleanup);

const onSubmitMock: jest.Mock<LoginFormProps['onSubmit']> = jest.fn();

describe('LoginForm Form ', () => {
  it('renders correctly', async () => {
    setup(<LoginForm onSubmit={() => {}} />);

    expect(await screen.findByText(/Login/i)).toBeOnTheScreen();
  });

  it('should display required error when values are empty', async () => {
    const { user } = setup(<LoginForm onSubmit={() => {}} />);
    const button = screen.getByTestId('login-button');

    expect(screen.queryByText(/Email is required/i)).not.toBeOnTheScreen();

    await user.press(button);

    expect(await screen.findByText(/Email is required/i)).toBeOnTheScreen();
    expect(screen.getByText(/Password is required/i)).toBeOnTheScreen();
  });

  it('should display password length error when value is too short', async () => {
    const { user } = setup(<LoginForm onSubmit={() => {}} />);
    const passwordInput = screen.getByTestId('password-input');

    expect(screen.queryByText(/Password is required/i)).not.toBeOnTheScreen();
    expect(screen.queryByText(/Password must be at least 6 characters/i)).not.toBeOnTheScreen();

    await user.type(passwordInput, 'test');

    expect(await screen.queryByText(/Password is required/i)).not.toBeOnTheScreen();
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeOnTheScreen();
  });

  it('should clear password length error when value meets length requirement', async () => {
    const { user } = setup(<LoginForm onSubmit={() => {}} />);
    const passwordInput = screen.getByTestId('password-input');

    await user.type(passwordInput, 'test');

    expect(await screen.queryByText(/Password is required/i)).not.toBeOnTheScreen();
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeOnTheScreen();

    await user.clear(passwordInput);
    await user.type(passwordInput, 'test123');

    expect(screen.queryByText(/Password is required/i)).not.toBeOnTheScreen();
    expect(screen.queryByText(/Password must be at least 6 characters/i)).not.toBeOnTheScreen();
  });

  it('should display matching error when email is invalid', async () => {
    const { user } = setup(<LoginForm onSubmit={() => {}} />);

    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(emailInput, 'yyyyy');
    await user.type(passwordInput, 'test');
    await user.press(button);

    expect(await screen.findByText(/Invalid email format/i)).toBeOnTheScreen();
    expect(screen.queryByText(/Email is required/i)).not.toBeOnTheScreen();
  });

  it('should clear email error when email is valid', async () => {
    const { user } = setup(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByTestId('email-input');

    await user.type(emailInput, 'yyyyy');

    expect(await screen.findByText(/Invalid email format/i)).toBeOnTheScreen();
    expect(screen.queryByText(/Email is required/i)).not.toBeOnTheScreen();

    await user.type(emailInput, 'user@email.com');

    expect(screen.queryByText(/Invalid email format/i)).not.toBeOnTheScreen();
    expect(screen.queryByText(/Email is required/i)).not.toBeOnTheScreen();
  });

  it('should call LoginForm onSubmit with correct values when values are valid', async () => {
    const { user } = setup(<LoginForm onSubmit={onSubmitMock} />);

    const button = screen.getByTestId('login-button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    await user.type(emailInput, 'user@email.com');
    await user.type(passwordInput, 'password');
    await user.press(button);
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // expect.objectContaining({}) because we don't want to test the target event we are receiving from the onSubmit function
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        email: 'user@email.com',
        password: 'password',
      },
      expect.objectContaining({}),
    );
  });
});
