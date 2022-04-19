import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Item from './Item';
import styles from './styles';

export default function Opportunities({opportunities, jumpToTab}) {
  const handleViewAllOnPress = () => {
    jumpToTab('opportunities');
  };

  return (
    <View>
      <Text style={styles.title}>Opportunities</Text>
      {opportunities.slice(0, 3).map((item, index) => (
        <Item key={index} item={item} />
      ))}
      {opportunities.length > 3 && (
        <TouchableOpacity style={styles.viewAll} onPress={handleViewAllOnPress}>
          <Text style={styles.viewAllText}>
            View all {providers.length} opportunities
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
