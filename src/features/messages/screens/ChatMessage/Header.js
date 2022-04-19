import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Entype from 'react-native-vector-icons/Entypo';
import {palette, theme} from '../../../../components/Theme';

export default function Header({otherUser, navigation}) {
  return (
    <View
      style={{
        backgroundColor: palette.white,
        height: 60,
        marginHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {/* <Ionicons name={'arrow-back'} size={25} color={palette.orange} /> */}
      </TouchableOpacity>
      <Image
        source={{uri: otherUser.image}}
        style={{
          height: 36,
          width: 36,
          borderRadius: 100,
          backgroundColor: 'black',
          marginLeft: 20,
          marginRight: 10,
        }}
      />
      <View style={{flex: 1}}>
        <Text style={styles.name}>
          {otherUser.firstName} {otherUser.LastName}
        </Text>
        {otherUser.status == 1 ? (
          <View style={styles.row}>
            <View style={[styles.status]} />
            <Text style={styles.statustext}>Online</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          alert('addAction');
        }}>
        {/* <Entype
          name={'dots-three-horizontal'}
          size={25}
          color={palette.orange}
        /> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    width: 8,
    height: 8,
    marginRight: 4,

    // borderWidth: 2,
    // borderColor: theme.colors.background,
    backgroundColor: theme.colors.green,
    borderRadius: 100,
  },
  statustext: {
    ...theme.typography.regular,
    color: theme.colors.noRouteMap,
  },
  name: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
    // fontFamily: "SFProDisplay-Semibold"
  },
});
