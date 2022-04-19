import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {User1} from '../../../../customData.json';
import Users from '../../../../data/Users';

import styles from './styles';

export default function UserFleet() {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{height: 50, width: 50, borderRadius: 25}}
            source={require('../../../../../../assets/img/avatar.jpeg')}
          />
        </View>
        <Text style={styles.username}>{User1.firstName}</Text>
      </View>
    </TouchableOpacity>
  );
}
