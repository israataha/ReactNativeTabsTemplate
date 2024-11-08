import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ButtonProps extends PressableProps {
  loading?: boolean;
  /**
   * Text to display on the button
   */
  text: string;
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
}

export const Button = (props: ButtonProps) => {
  const { disabled = false, loading = false, style, testID, text, textStyle, ...rest } = props;
  return (
    <Pressable disabled={disabled || loading} style={[styles.button, style]} testID={testID} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" testID={testID ? `${testID}-activity-indicator` : undefined} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    borderRadius: 8,
    height: 44,
    justifyContent: 'center',
    textAlignVertical: 'center',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 22,
    paddingVertical: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});
