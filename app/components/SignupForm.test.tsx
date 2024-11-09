import React from 'react';

import { render, screen, setup, waitFor } from '../test-utils';
import { SignupForm, SignupFormProps } from './SignupForm';

describe('SignupForm component ', () => {
  it('renders correctly', async () => {
    render(<SignupForm onSubmit={() => {}} />);

    expect(screen.getByText('Create an account')).toBeOnTheScreen();
    expect(screen.getByTestId('first_name-input')).toBeOnTheScreen();
    expect(screen.getByTestId('last_name-input')).toBeOnTheScreen();
    expect(screen.getByTestId('email-input')).toBeOnTheScreen();
    expect(screen.getByTestId('password-input')).toBeOnTheScreen();
    expect(screen.getByTestId('signup-button')).toBeOnTheScreen();
  });

  it('should display required error when fields are empty', async () => {
    const { user } = setup(<SignupForm onSubmit={() => {}} />);

    expect(screen.queryByText('First name is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Last name is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Email is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Password is required')).not.toBeOnTheScreen();

    const button = screen.getByTestId('signup-button');
    await user.press(button);

    expect(screen.getByText('First name is required')).toBeOnTheScreen();
    expect(screen.getByText('Last name is required')).toBeOnTheScreen();
    expect(screen.getByText('Email is required')).toBeOnTheScreen();
    expect(screen.getByText('Password is required')).toBeOnTheScreen();
  });

  it('should clear required error when fields are not empty', async () => {
    const { user } = setup(<SignupForm onSubmit={() => {}} />);

    const firstnameInput = screen.getByTestId('first_name-input');
    const lastnameInput = screen.getByTestId('last_name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('signup-button');

    await user.press(button);

    expect(screen.getByText('First name is required')).toBeOnTheScreen();
    expect(screen.getByText('Last name is required')).toBeOnTheScreen();
    expect(screen.getByText('Email is required')).toBeOnTheScreen();
    expect(screen.getByText('Password is required')).toBeOnTheScreen();

    await user.type(firstnameInput, 'John');
    await user.type(lastnameInput, 'Doe');
    await user.type(emailInput, 'user@email.com');
    await user.type(passwordInput, 'password');

    expect(screen.queryByText('First name is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Last name is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Email is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Password is required')).not.toBeOnTheScreen();
  });

  it('should display password length error when value is too short', async () => {
    const { user } = setup(<SignupForm onSubmit={() => {}} />);
    const passwordInput = screen.getByTestId('password-input');

    expect(screen.queryByText('Password is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeOnTheScreen();

    await user.type(passwordInput, 'test');

    expect(await screen.queryByText('Password is required')).not.toBeOnTheScreen();
    expect(screen.getByText('Password must be at least 6 characters')).toBeOnTheScreen();
  });

  it('should clear password length error when value meets length requirement', async () => {
    const { user } = setup(<SignupForm onSubmit={() => {}} />);
    const passwordInput = screen.getByTestId('password-input');

    await user.type(passwordInput, 'test');

    expect(await screen.queryByText('Password is required')).not.toBeOnTheScreen();
    expect(screen.getByText('Password must be at least 6 characters')).toBeOnTheScreen();

    await user.clear(passwordInput);
    await user.type(passwordInput, 'test123');

    expect(screen.queryByText('Password is required')).not.toBeOnTheScreen();
    expect(screen.queryByText('Password must be at least 6 characters')).not.toBeOnTheScreen();
  });

  it('should call SignupForm onSubmit with correct values when values are valid', async () => {
    const onSubmitMock: jest.Mock<SignupFormProps['onSubmit']> = jest.fn();
    const { user } = setup(<SignupForm onSubmit={onSubmitMock} />);

    const firstnameInput = screen.getByTestId('first_name-input');
    const lastnameInput = screen.getByTestId('last_name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('signup-button');

    await user.type(firstnameInput, 'John');
    await user.type(lastnameInput, 'Doe');
    await user.type(emailInput, 'user@email.com');
    await user.type(passwordInput, 'password');
    await user.press(button);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    // expect.objectContaining({}) because we don't want to test the target event we are receiving from the onSubmit function
    expect(onSubmitMock).toHaveBeenCalledWith(
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'user@email.com',
        password: 'password',
      },
      expect.objectContaining({}),
    );
  });
});
