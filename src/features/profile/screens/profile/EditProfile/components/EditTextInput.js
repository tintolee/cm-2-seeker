import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {renderIcon} from '../../../../../../components/svg/utils/renderIcon';
import {theme} from '../../../../../../components/Theme';

export default function EditTextInput({
  fieldTitle,
  icon,
  iconColor = theme.colors.primary,
  hasError,
  ...props
}) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{fieldTitle}</Text>
        {renderIcon(icon, iconColor)}

        <TextInput
          style={[
            styles.input,
            {
              color:
                props.editable === false
                  ? theme.colors.inactiveTintColor
                  : theme.colors.formFieldText,
            },
          ]}
          placeholderTextColor={theme.colors.formFieldPlaceholder}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          returnKeyType = {"done"}
          {...props}
          
          
        />
        {/* <View style={styles.LineBlack}></View> */}
      </View>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.formFieldTitle,
    color: theme.colors.formFieldTitle,
    bottom: 20,
    padding: 10,
  },
  inputContainer: {
    height: 76,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.m,
    paddingLeft: theme.spacing.ssm,
    shadowColor: 'rgba(0, 0, 0, 0.04)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: theme.radius.l,
    shadowOpacity: 1,
  },
  input: {
    ...theme.typography.formFieldText,
    color: theme.colors.formFieldText,
    bottom: 20,
    marginLeft: theme.spacing.ssm,
  },
  error: {
    ...theme.typography.regular,
    lineHeight: 16,
    color: theme.colors.formFieldError,
    marginTop: theme.spacing.s - 2,
  },
});
