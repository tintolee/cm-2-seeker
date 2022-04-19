import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {renderIcon} from '../../../../../../components/svg/utils/renderIcon';
import {theme} from '../../../../../../components/Theme';

export default function Cvinput({
  fieldTitle,
  icon,
  onPress,
  iconColor = theme.colors.primary,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{fieldTitle}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: '#f59532',
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../../../../../../assets/img/uploadDoc.png')}
        />
      </TouchableOpacity>
      {renderIcon(icon, iconColor)}
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
