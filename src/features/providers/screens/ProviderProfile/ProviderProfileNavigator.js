import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import ProviderProfile from './index';

const ProviderProfileStack = createStackNavigator();

export const ProviderProfileNavigator = ({route}) => {
  return (
    <ProviderProfileStack.Navigator
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
      <ProviderProfileStack.Screen
        name="ProviderProfile"
        component={ProviderProfile}
        initialParams={route.params}
        options={{
          title: null,
        }}
      />
    </ProviderProfileStack.Navigator>
  );
};
