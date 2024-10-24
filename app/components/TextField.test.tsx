import { render, screen } from '@testing-library/react-native';
import React from 'react';

import { setup } from '../test-utils';
import { TextField } from './TextField';

describe('TextField component', () => {
  it('should render correctly', () => {
    render(<TextField testID="field" />);
    expect(screen.getByTestId('field')).toBeOnTheScreen();
  });

  it('should render placeholder correctly', () => {
    render(<TextField placeholder="Username" testID="field" />);
    expect(screen.getByTestId('field')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Username')).toBeOnTheScreen();
  });

  it('should render error correctly', () => {
    const error = 'This field is required';
    render(<TextField error={error} testID="field" />);
    expect(screen.getByTestId('field')).toBeOnTheScreen();
    expect(screen.getByTestId('field-error')).toHaveTextContent(error);
  });

  it('should render the error message & placeholder correctly ', () => {
    render(<TextField testID="field" placeholder="Enter your username" error="This is an error message" />);
    expect(screen.getByTestId('field')).toBeOnTheScreen();

    expect(screen.getByTestId('field-error')).toBeOnTheScreen();
    expect(screen.getByTestId('field-error')).toHaveTextContent('This is an error message');
    expect(screen.getByPlaceholderText('Enter your username')).toBeOnTheScreen();
  });

  it('should trigger onBlur event correctly ', async () => {
    const onBlur = jest.fn();
    const { user } = setup(<TextField testID="field" onBlur={onBlur} />);

    const input = screen.getByTestId('field');
    await user.type(input, 'test text');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should trigger onChangeText event correctly', async () => {
    const onChangeText = jest.fn();
    const { user } = setup(<TextField testID="field" onChangeText={onChangeText} />);

    const input = screen.getByTestId('field');
    await user.type(input, '123456789');
    expect(onChangeText).toHaveBeenCalledTimes(9); // every character is a change event
    expect(onChangeText).toHaveBeenCalledWith('123456789');
  });
});
