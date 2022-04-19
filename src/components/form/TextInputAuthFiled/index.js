import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {theme} from '../../../components/Theme';

export default function TextInputAuthFiled({fieldTitle, hasError, ...props}) {
  return (
    <View>
      <Text style={styles.title}>{fieldTitle}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.formFieldPlaceholder}
          underlineColorAndroid="transparent"
          returnKeyType={'done'}
          {...props}
        />
      </View>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.formFieldTitle,
    color: 'black',
    marginBottom: 5,
  },
  inputContainer: {
    height: 44,
    width: 315,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 8,
    backgroundColor: '#ededed',
    padding: -20,
    paddingHorizontal: 20,
  },
  input: {
    ...theme.typography.formFieldText,
    color: 'black',
    flex: 1,
  },
  error: {
    ...theme.typography.regular,
    lineHeight: 16,
    color: theme.colors.formFieldError,
    marginTop: theme.spacing.s,
  },
});
