import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {theme} from '../../../../../components/Theme';
import ActionItem from '../../../../../components/BottomActionModal/ActionItem';
import Divider from '../../../../../components/BottomActionModal/Divider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

export default function ProfileSettings({updateAuthState}) {
  const navigation = useNavigation();

  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View style={styles.content}>
            <ActionItem
              icon={'people'}
              name="Profile"
              onPress={() => {
                navigation.navigate('EditProfile');
              }}
            />
            <Divider />
            <ActionItem
              icon={'eye'}
              name="Password"
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
            />
            <Divider />
            <ActionItem
              icon={'fileText'}
              name="Interests"
              onPress={() => {
                navigation.navigate('SeekerProfile');
              }}
            />
            <Divider />
            <ActionItem
              icon={'bell'}
              name="Notifications"
              onPress={() => {
                navigation.navigate('ProfileNotifications');
              }}
            />
            <Divider />
            <ActionItem icon={'fileText'} name="Security" />
            <Divider />
            <ActionItem icon={'cornerUpRight'} name="Help" />
            <Divider />
            <ActionItem icon={'checkmark'} name="Report" />
            <Divider />
            <ActionItem icon={'eye'} name="Data Privacy" />
            <Divider />
            <ActionItem icon={'checkmark'} name="About" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 16,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.radius.m,
  },
  safeArea: {
    backgroundColor: theme.colors.background2,
    marginVertical: '-5%',
  },
  header: {
    backgroundColor: theme.colors.background2,
    shadowColor: '#000000',
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
