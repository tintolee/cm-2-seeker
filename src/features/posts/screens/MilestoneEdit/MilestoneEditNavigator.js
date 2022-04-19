import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import MilestoneEdit from './index';
import SelectRouteMap from '../SelectRouteMap';
import AddTag from '../AddTag';

const MilestoneEditStack = createStackNavigator();

export const MilestoneEditNavigator = ({route}) => {
  return (
    <MilestoneEditStack.Navigator
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
      <MilestoneEditStack.Screen
        name="MilestoneEdit"
        component={MilestoneEdit}
        initialParams={route.params}
        options={{
          title: 'New Milestone',
        }}
      />
      <MilestoneEditStack.Screen
        name="SelectRouteMap"
        component={SelectRouteMap}
        options={{
          title: 'Select a route map',
        }}
      />
      <MilestoneEditStack.Screen
        name="AddTag"
        component={AddTag}
        options={{
          title: 'Add a tag',
        }}
      />
    </MilestoneEditStack.Navigator>
  );
};
