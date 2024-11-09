import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  children?: ReactNode;
}

export const Screen = (props: ScreenProps) => {
  const { children, style, ...rest } = props;
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, styles.screenStyle, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
});
