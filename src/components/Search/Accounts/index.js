import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Item from './Item';
import styles from './styles';

export default function Accounts({providers, jumpToTab}) {

  const handleViewAllOnPress = () => {
    jumpToTab('providers');
  };

  return (
    <View>
      <Text style={styles.title}>Providers</Text>
      {providers.slice(0, 3).map((item, index) => (
        <Item key={index} item={item} />
      ))}
      {providers.length > 3 && (
        <TouchableOpacity style={styles.viewAll} onPress={handleViewAllOnPress}>
          <Text style={styles.viewAllText}>
            View all {providers.length} providers
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
