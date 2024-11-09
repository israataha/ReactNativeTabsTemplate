import React from 'react';
import { Text } from 'react-native';

import { screen, setup } from '../test-utils';
import { Screen } from './Screen';

describe('Screen component ', () => {
  it('renders correctly', () => {
    setup(<Screen />);
  });

  it('renders children correctly', async () => {
    setup(
      <Screen>
        <Text>Hello</Text>
      </Screen>,
    );

    expect(await screen.findByText('Hello')).toBeOnTheScreen();
  });
});
