import React from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  LinkSelection,
  MultiSelect,
  Button,
  TextInput,
  DatePickerInput,
  ImagePicker,
  MultilineTextInputField,
} from '../../../../components/form';
import {LineCalendar} from '../../../../components/svg/icons';
import {theme} from '../../../../components/Theme';
import styles from './styles';

export default function CollaborationEdit() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.field}>
            <TextInput fieldTitle="Collaboration title" />
          </View>
          <View style={styles.field}>
            <ImagePicker fieldTitle="Add a cover photo" />
          </View>
          <View style={styles.field}>
            <MultilineTextInputField
              caption="Collaboration description"
              maxLength={800}
            />
          </View>
          <View style={styles.field}>
            <DatePickerInput
              fieldTitle="Start Date"
              placeholder="Select a date"
            />
          </View>
          <View style={styles.field}>
            <DatePickerInput
              fieldTitle="End Date (optional)"
              placeholder="Select a date"
              iconColor={theme.colors.grayIcon}
            />
          </View>
          <View style={styles.field}>
            <TextInput
              fieldTitle="Place"
              icon="pin"
              iconColor={theme.colors.grayIcon}
            />
          </View>
          <View style={styles.field}>
            <TextInput fieldTitle="Number of people wanted" icon="people" />
          </View>
          <View style={styles.field}>
            <LinkSelection fieldTitle="Open to" />
          </View>
          <View style={styles.field}>
            <MultiSelect
              fieldTitle="Invite connections"
              icon="personAdd"
              iconColor={theme.colors.grayIcon}
              onPress={() => navigation.navigate('InviteConnection')}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <Button title={'Create Collaboration'} />
        </SafeAreaView>
      </View>
    </View>
  );
}
