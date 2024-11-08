import React, { forwardRef } from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface TextFieldProps extends TextInputProps {
  error?: string;
}

type ControlledProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: Omit<RegisterOptions<T, Path<T>>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'> | undefined;
};

type ControllerTextFieldProps<T extends FieldValues> = ControlledProps<T> & TextFieldProps;

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  const { error, testID, ...rest } = props;

  const inputStyle = [styles.inputStyle, rest.style, error ? styles.errorState : {}];

  return (
    <View>
      <TextInput
        autoCapitalize={rest.autoCapitalize || 'none'}
        autoComplete="off"
        autoCorrect={false}
        ref={ref}
        style={inputStyle}
        testID={testID}
        {...rest}
      />
      {error && (
        <Text testID={testID ? `${testID}-error` : undefined} style={styles.errorStyle}>
          {error}
        </Text>
      )}
    </View>
  );
});

/**
 * Used with react-hook-form
 */
export function ControlledTextField<T extends FieldValues>(props: ControllerTextFieldProps<T>) {
  const { control, name, rules, ...inputProps } = props;
  const { field, fieldState } = useController<T>({ control, name, rules });

  return (
    <TextField
      error={fieldState.error?.message}
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      ref={field.ref}
      testID={`${name.toString()}-input`}
      value={field.value}
      {...inputProps}
    />
  );
}
const styles = StyleSheet.create({
  inputStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 4,
    fontSize: 14,
    height: 40,
    marginVertical: 6,
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  errorState: {
    borderColor: 'red',
    color: 'red',
  },
  errorStyle: {
    color: 'red',
  },
});
