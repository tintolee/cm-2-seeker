import moment from 'moment';
import React from 'react';
import {Linking} from 'react-native';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {palette, theme} from '../../../../../components/Theme';

export default function index({messages, navigation}) {
  return (
    <View style={{flex: 1, marginHorizontal: 15}}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={messages}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => {
          return item.type != 'add' ? (
            <ChatRow item={item} navigation={navigation} />
          ) : (
            <AddRow item={item} />
          );
        }}
        renderHiddenItem={({item}, rowMap) => {
          if (item.type != 'add') {
            return (
              <View style={styles.rowBack}>
                <TouchableOpacity style={{width: 75, alignItems: 'center'}}>
                  {/* <Ionicons
                    name={'trash-outline'}
                    size={30}
                    color={palette.white}
                  /> */}
                </TouchableOpacity>
              </View>
            );
          }
        }}
        // leftOpenValue={0}
        rightOpenValue={-75}
      />
    </View>
  );
}

const ChatRow = ({item, navigation}) => {
  const {
    firstName,
    LastName,
    latestMessage,
    lastSeen,
    image,
    status,
    count,
    id,
  } = item;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate('ChatMessage', {otherUser: item})}
      style={styles.row}>
      <View style={styles.image}>
        <Image source={{uri: image}} style={{flex: 1, borderRadius: 100}} />
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                status == '1' ? theme.colors.green : theme.colors.grayIcon,
            },
          ]}
        />
      </View>
      <View style={{flex: 1, marginHorizontal: 5}}>
        <Text style={styles.name}>
          {firstName} {LastName}
        </Text>
        <View style={{marginTop: 5}}>
          <Text style={styles.message}>{latestMessage}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.message}>{moment(lastSeen).fromNow()}</Text>
        {count && (
          <View style={styles.counter}>
            <Text style={styles.counterText}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const AddRow = ({item}) => {
  const {title, message, image, link} = item;
  return (
    <View style={styles.addRow}>
      <View
        style={{
          backgroundColor: palette.white,
          padding: 5,
          borderRadius: 10,
          marginRight: 10,
        }}>
        <Image
          source={{uri: image}}
          style={{width: 33, height: 33}}
          resizeMode={'contain'}
        />
      </View>
      <View style={{flex: 1, marginHorizontal: 5}}>
        <Text style={styles.name}>{title}</Text>
        <View style={{marginTop: 5}}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(link)}>
        {/* <FontAwesome name={'angle-right'} size={30} color={palette.lightGray} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background2,
  },
  addRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.orangebg,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  rowBack: {
    flex: 1,
    backgroundColor: palette.orange,
    borderRadius: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 5,
  },
  userContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
    width: 75,
  },
  status: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: theme.colors.background,
    borderRadius: 100,
    position: 'absolute',
    bottom: 3,
    right: 3,
  },
  name: {
    ...theme.typography.title6,
    color: theme.colors.selectionItem,
    // fontFamily: "SFProDisplay-Semibold"
  },
  message: {
    ...theme.typography.title8,
    color: theme.colors.noRouteMap,
    // fontFamily: "SFProDisplay-Semibold"
  },
  counterText: {
    fontSize: 8,
    color: palette.white,
    // fontFamily: "SFProDisplay-Semibold"
  },
  counter: {
    backgroundColor: palette.orange,
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
