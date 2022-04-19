import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import OpportunityDetail from './index';
import JobApply from './JobApply';

const OpportunityDetailStack = createStackNavigator();

export const OpportunityDetailNavigator = ({route}) => {
  return (
    <OpportunityDetailStack.Navigator
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
      <OpportunityDetailStack.Screen
        name="OpportunityDetail"
        component={OpportunityDetail}
        initialParams={route.params}
        options={{
          title: 'Opportunity',
          header: () => null,
        }}
      />
      <OpportunityDetailStack.Screen
        name="JobApply"
        component={JobApply}
        options={{
          title: 'Job Apply',
          header: () => null,
        }}
      />
    </OpportunityDetailStack.Navigator>
  );
};
