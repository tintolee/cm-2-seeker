import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Item from './Item';
import styles from './styles';

export default function Seekers({seekers, jumpToTab}) {
  const handleViewAllOnPress = () => {
    jumpToTab('seekers');
  };

  return (
    <View>
      <Text style={styles.title}>Seekers</Text>
      {seekers.slice(0, 3).map((item, index) => (
        <Item key={index} item={item} />
      ))}
      {seekers.length > 3 && (
        <TouchableOpacity style={styles.viewAll} onPress={handleViewAllOnPress}>
          <Text style={styles.viewAllText}>
            View all {seekers.length} seekers
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
