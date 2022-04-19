import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import * as actions from '../../_redux/actions';
import NotificationItem from './components/NotificationItem';
import styles from './styles';

const notifications = [
  {
    id: 1,
    message: 'You have been invited to apply for an opportunity.',
    date: '15-05-2021',
    type: 'NOTIFICATION',
  },
  {
    id: 2,
    message: 'Social Media Executive Assistant. Application unsuccessful.',
    date: '15-04-2021',
    type: 'NEGATIVE',
  },
  {
    id: 3,
    message: 'Diana has shared an opportunity with you.',
    date: '15-02-2021',
    type: 'PEOPLE',
  },
  {
    id: 4,
    message: 'Lorem ipsum dolor sit consectectur ipsum dolor.',
    date: '10-05-2021',
    type: 'NOTIFICATION',
  },
  {
    id: 5,
    message: 'Lorem ipsum dolor sit consectectur ipsum dolor.',
    date: '01-05-2021',
    type: 'NOTIFICATION',
  },
];

export default function Notifications() {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        style={styles.list}
        renderItem={({item}) => <NotificationItem {...item} />}
        keyExtractor={({id}) => id.toString()}
      />
    </View>
  );
}
