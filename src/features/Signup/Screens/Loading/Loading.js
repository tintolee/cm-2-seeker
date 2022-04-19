import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Loading() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Loading1');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/LogoNew1.jpeg')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: '7%',
  },

  bodyText: {
    textAlign: 'center',
    justifyContent: 'center',
    top: '10%',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
