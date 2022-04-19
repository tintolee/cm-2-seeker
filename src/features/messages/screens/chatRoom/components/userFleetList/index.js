import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UserFleet from '../userFleet';
import Users from '../../../../data/Users';

const UserFleetList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Users}
        rednerItem={({item}) => <UserFleet user={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserFleetList;
