import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import Share from './index';

const ShareScreenStack = createStackNavigator();

export const ShareNavigator = ({route}) => {
  return (
    <ShareScreenStack.Navigator
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
      <ShareScreenStack.Screen
        name="Share"
        component={Share}
        initialParams={route.params}
        options={{
          title: 'Share',
        }}
      />
    </ShareScreenStack.Navigator>
  );
};
