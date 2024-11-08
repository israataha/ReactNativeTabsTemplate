import React from 'react';

import { render, screen, setup } from '../test-utils';
import { Button } from './Button';

describe('Button component', () => {
  it('should render correctly', () => {
    render(<Button testID="button" text="Submit" />);
    expect(screen.getByTestId('button')).toBeOnTheScreen();
  });

  it('should render the loading indicator correctly', () => {
    render(<Button testID="button" text="Submit" loading={true} />);
    expect(screen.getByTestId('button')).toBeOnTheScreen();
    expect(screen.getByTestId('button-activity-indicator')).toBeOnTheScreen();
    expect(screen.queryByText('Submit')).not.toBeOnTheScreen();
  });

  it('should call onClick handler when clicked', async () => {
    const onClick = jest.fn();
    const { user } = setup(<Button testID="button" text="Click the button" onPress={onClick} />);
    expect(screen.getByTestId('button')).toBeOnTheScreen();

    await user.press(screen.getByTestId('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when loading', async () => {
    const onClick = jest.fn();
    const { user } = setup(<Button testID="button" loading={true} text="Click the button" onPress={onClick} />);
    expect(screen.getByTestId('button')).toBeOnTheScreen();
    expect(screen.getByTestId('button-activity-indicator')).toBeOnTheScreen();
    expect(screen.getByTestId('button')).toBeDisabled();
    await user.press(screen.getByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it("shouldn't call onClick when disabled", async () => {
    const onClick = jest.fn();
    const { user } = setup(<Button testID="button" text="Click the button" disabled={true} onPress={onClick} />);
    expect(screen.getByTestId('button')).toBeOnTheScreen();
    await user.press(screen.getByTestId('button'));

    expect(screen.getByTestId('button')).toBeDisabled();

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
