import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import {theme} from '../../components/Theme';
import Notifications from './screens/Notifications';

const NotificationsStack = createStackNavigator();

export const NotificationsNavigator = () => {
  return (
    <NotificationsStack.Navigator
      headerMode = "screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
          shadowColor: 'transparent',
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          ...theme.typography.headerTitle,
        },
        headerHideShadow: true,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {marginLeft: theme.spacing.m},
        headerBackImage: () => (
          <LineArrowLeft width={24} height={24} color={theme.colors.primary} />
        ),
      }}>
      <NotificationsStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
        }}
      />
    </NotificationsStack.Navigator>
  );
};
