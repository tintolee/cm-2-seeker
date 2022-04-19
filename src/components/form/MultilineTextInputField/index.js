import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {theme} from '../../Theme';
import styles from './styles';

export default function MultilineTextInputField({caption, hasError, ...props}) {
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.top}>
          <Text style={styles.caption}>{caption}</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors.formFieldPlaceholder}
            underlineColorAndroid="transparent"
            // returnKeyType="done"
            // blurOnSubmit={true}
            autoCorrect={false}
            {...props}
            multiline
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.caption}>
            {props.maxLength -
              (props?.value !== undefined ? props?.value?.length : 0)}{' '}
            characters remaining
          </Text>
        </View>
      </View>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
