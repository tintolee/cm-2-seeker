import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import moment from 'moment';
// import TabView from '../../../discover/screens/Discover/components/TabView';

// import UserItem from '../chatRoom/components/UserItem';
// import UserFleet from './components/userFleet';
// import UserFleetList from './components/userFleetList';
// import AdItem from '../../screens/chatRoom/components/adItem';
// import {useNavigation} from '@react-navigation/native';
import SearchInput from '../../../../components/Search/SearchInput/index'
import Users from '../../components/UserList';
// import Messages from '../components/messages';
// import {Button} from '../../../../components/form';
import MessagesTab from '../../components/MessagesTab';

export default function Main({navigation, route}) {
  return (
    <View style={styles.background}>
       <View style={{ marginHorizontal: 30}}>
       <SearchInput {...{placeholder:'Search'}}></SearchInput>
       </View>
     
      <Users navigation={navigation} />
      <View style={{flex:1, marginVertical: 10}}>
        <MessagesTab navigation={navigation}></MessagesTab>
      </View>
      {/* <Messages messages={users} navigation={navigation} /> */}
    </View>
  );
}
