import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

function ProfileName({firstName, lastName}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {firstName} {'\n'}
        {lastName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    width: '100%',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: theme.colors.black,
  },
});

export default ProfileName;
