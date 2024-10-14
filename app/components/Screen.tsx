import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView, View } from 'react-native';

interface ScreenProps {
  children?: React.ReactNode;
}

export const Screen = (props: ScreenProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView>
      <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        {props.children}
      </View>
    </SafeAreaView>
  );
};
