import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import CollaborationEdit from './index';
import InviteConnection from '../InviteConnection';

const CollaborationEditStack = createStackNavigator();

export const CollaborationEditNavigator = () => {
  return (
    <CollaborationEditStack.Navigator
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
      <CollaborationEditStack.Screen
        name="CollaborationEdit"
        component={CollaborationEdit}
        options={{
          title: 'New Collaboration',
        }}
      />
      <CollaborationEditStack.Screen
        name="InviteConnection"
        component={InviteConnection}
        options={{
          title: 'Invite Connections',
        }}
      />
    </CollaborationEditStack.Navigator>
  );
};
