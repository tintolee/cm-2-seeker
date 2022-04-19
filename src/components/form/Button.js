import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';

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
  const btnSize = size === 'large' ? large : small;
  const btnBgColor = type === 'filled' ? '#f59532' : 'transparent';
  const btnTextColor = type === 'filled' ? '#ffffff' : '#6371c2';
  const btnBorderRadius = bordered ? 32 : 8;

  const containerCommonStyle = {
    backgroundColor: btnBgColor,
    paddingVertical: 14,
    width: btnSize,
    alignItems: 'center',
    padding: '4%',
    borderRadius: btnBorderRadius,
  };

  const textCommonStyle = {
    color: btnTextColor,
    fontSize: 16,
    textAlign: 'center',
  };

  const border = type === 'outlined' && {
    borderColor: '#e7e7e7',
    borderWidth: 2,
  };

  return (
    <View style={{marginTop: '12%', marginBottom: '5%'}}>
      <TouchableOpacity onPress={onPress}>
        <View style={[containerCommonStyle, border]}>
          <Text style={[textCommonStyle]}> {text} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
