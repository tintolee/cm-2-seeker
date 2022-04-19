import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';

export default function AdItem() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate('chatHome')}>
          <Image
            style={styles.adImage}
            source={require('../../../../../../assets/img/advert3x.png')}
          />
        </TouchableOpacity>

        <Text style={styles.advertTitle}>Advert title goes here</Text>
      </View>
      <Text style={styles.advertDescription}>
        Get exclusive lorem ipsum dolor sit consectectur
      </Text>
    </TouchableOpacity>
  );
}
