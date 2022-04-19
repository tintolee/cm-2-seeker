import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {User1, User2, User3, User4, User5} from '../../customData.json';
import moment from 'moment';
import TabView from '../../../discover/screens/Discover/components/TabView';
import ListItem from '../AnimatedListItem';
import UserItem from '../chatRoom/components/UserItem';
import UserFleet from './components/userFleet';
import UserFleetList from './components/userFleetList';
import AdItem from '../../screens/chatRoom/components/adItem';
import {useNavigation} from '@react-navigation/native';
import MessagesTab from '../components/messagesTab';
import Users from '../components/users';
import Messages from '../components/messages';
import {Button} from '../../../../components/form';

var today = new Date();
var yesterday = new Date(today);

const users = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
    firstName: 'Ben',
    LastName: 'Schultz',
    latestMessage: 'Hey babe watcha doing today ?',
    lastSeen: '22 Oct 2021',
    status: '1',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
    firstName: 'Myra',
    LastName: 'Ward',
    latestMessage: 'I know lol, but fingers crossed!',
    lastSeen: '22 Oct 2021',
    status: '1',
  },
  {
    id: '3',
    image: 'https://getweys.com/wp-content/uploads/2020/09/getsmall.png',
    firstName: '',
    LastName: '',
    latestMessage: '',
    lastSeen: '',
    status: '',
    title: 'Advert title goes here',
    message: 'Get exclusive lorem ipsum dolor sit consectectur',
    link: 'https://google.com',
    type: 'add',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
    firstName: 'Samson',
    LastName: 'Rose',
    latestMessage: 'Are you sure?',
    lastSeen: '11 Jan 2020',
    status: '0',
    count: 2,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
    firstName: 'Elon',
    LastName: 'Zuck',
    latestMessage: "Don't listen to them hun",
    lastSeen: '11 Jan 2020',
    status: '1',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4',
    firstName: 'Travis',
    LastName: 'Watkins',
    latestMessage: 'Yah, I have 3 lessons for you.',
    lastSeen: '11 Jan 2020',
    status: '1',
  },
];

export default function ChatRoom({navigation, route}) {
  return (
    <View style={styles.background}>
      <Users users={users} navigation={navigation} />
      <View style={{height: 50, marginVertical: 10}}>
        <MessagesTab />
      </View>
      <Messages messages={users} navigation={navigation} />
    </View>
  );
}
