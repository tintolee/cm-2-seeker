import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Item from './Item';
import styles from './styles';

export default function Collaborations({collaborations, jumpToTab}) {
  const handleViewAllOnPress = () => {
    jumpToTab('collaborations');
  };
  return (
    <>
      <Text style={styles.title}>Collaborations</Text>
      {collaborations.slice(0, 3).map((item, index) => (
        <Item key={index} item={item} />
      ))}
      {collaborations.length > 3 && (
        <TouchableOpacity style={styles.viewAll} onPress={handleViewAllOnPress}>
          <Text style={styles.viewAllText}>
            View all {collaborations.length} collaborations
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
