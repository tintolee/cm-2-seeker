import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function Loading1() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 1600);
  }, []);
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      colors={['#e26424', '#e26424', '#f79533']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.bodyText}>
          PUTTING THE RIGHT PEOPLE IN THE RIGHT SEATS{' '}
        </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
  },

  bodyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Arial',
    letterSpacing: 0.8,
    width: 300,
    // height: 105,
  },
});
