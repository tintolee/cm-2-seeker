import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import Accounts from '../../../../components/Search/Accounts';
import Opportunities from '../../../../components/Search/Opportunities';
import Collaborations from '../../../../components/Search/Collaborations';
import styles from './styles';

export default function AddTag() {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.accounts}>
          <Accounts />
        </View>

        <View style={styles.opportunities}>
          <Opportunities />
        </View>

        <View style={styles.collaborations}>
          <Collaborations />
        </View>
      </ScrollView>
    </View>
  );
}
