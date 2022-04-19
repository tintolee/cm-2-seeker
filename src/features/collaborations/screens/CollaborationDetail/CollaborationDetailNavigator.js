import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import CollaborationDetail from './index';
import JoinCollaboration from './JoinCollaboration';
import CollaborationApplicants from '../CollaborationApplicants';

const CollaborationDetailStack = createStackNavigator();

export const CollaborationDetailNavigator = ({route}) => {
  return (
    <CollaborationDetailStack.Navigator
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
      <CollaborationDetailStack.Screen
        name="CollaborationDetail"
        component={CollaborationDetail}
        initialParams={route.params}
        options={{
          title: 'Collaboration',
          header: () => null,
        }}
      />
      <CollaborationDetailStack.Screen
        name="JoinCollaboration"
        component={JoinCollaboration}
        options={{
          title: 'Join Collaboration',
          header: () => null,
        }}
      />
      <CollaborationDetailStack.Screen
        name="CollaborationApplicants"
        component={CollaborationApplicants}
        initialParams={route.params}
        options={{
          title: 'Applicants',
        }}
      />
    </CollaborationDetailStack.Navigator>
  );
};
