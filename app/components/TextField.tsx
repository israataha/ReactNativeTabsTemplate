import React from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: Omit<RegisterOptions<T, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'> | undefined;
};

type TextFieldProps<T extends FieldValues> = ControllerProps<T> & TextInputProps;

export function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const { control, name, rules, ...inputProps } = props;

  const { field, fieldState } = useController<T>({ control, name, rules });
  const error = fieldState.error?.message;

  return (
    <View>
      <TextInput
        autoCapitalize={inputProps.autoCapitalize || 'none'}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        style={styles.inputStyle}
        value={field.value}
        {...inputProps}
      />
      {error && <Text style={styles.errorStyle}>{error}</Text>}
    </View>
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
  errorStyle: {
    color: 'red',
  },
});
