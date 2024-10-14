import {
  Text,
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';

export interface ButtonProps extends PressableProps {
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
  const { style, ...rest } = props;
  return (
    <Pressable style={[style, styles.button]} {...rest}>
      <Text style={styles.buttonText}>{props.text}</Text>
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
