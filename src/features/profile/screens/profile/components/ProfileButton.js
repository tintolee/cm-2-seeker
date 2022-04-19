import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';
import {theme} from '../../../../../components/Theme';

const width = Dimensions.get('window').width;

const Button = ({
  text,
  onPress,
  type = 'filled',
  bordered = false,
  size = 'large',
}) => {
  const large = width / 1.3;
  const small = width / 2;
  const btnBgColor = type === 'filled' ? '#f59532' : 'transparent';
  const btnTextColor = type === 'filled' ? '#ffffff' : '#6371c2';
  const btnBorderRadius = bordered ? 32 : 8;

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    width: '100%',
    padding: 6,
    height: 32,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  };

  const border = type === 'outlined' && {
    borderColor: '#e7e7e7',
    borderWidth: 2,
  };

  return (
    <View style={{marginTop: '5%', marginBottom: '5%'}}>
      <TouchableOpacity onPress={onPress}>
        <View style={[containerCommonStyle, border]}>
          <Text style={[textCommonStyle]}> {text} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
