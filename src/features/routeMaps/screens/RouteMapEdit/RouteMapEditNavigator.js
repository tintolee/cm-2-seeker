import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import RouteMapsEdit from './index';
import SelectionDestination from './SelectionDestination';
import SelectionFocusAreas from './SelectionFocusAreas';
import CustomDestination from './CustomDestination';
import CustomFocus from './CustomFocus';

const RouteMapEditStack = createStackNavigator();

export const RouteMapEditNavigator = ({navigation, route}) => {
  return (
    <RouteMapEditStack.Navigator
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
      <RouteMapEditStack.Screen
        name="RouteMapsEdit"
        component={RouteMapsEdit}
        initialParams={route.params}
        options={{
          title: 'New Route Map',
        }}
      />
      <RouteMapEditStack.Screen
        name="SelectionDestination"
        component={SelectionDestination}
        options={{
          title: 'New Route Map',
        }}
      />
      <RouteMapEditStack.Screen
        name="SelectionFocusAreas"
        component={SelectionFocusAreas}
        options={{
          title: 'New Route Map',
        }}
      />
      <RouteMapEditStack.Screen
        name="CustomDestination"
        component={CustomDestination}
        options={{
          title: 'New Route Map',
        }}
      />
      <RouteMapEditStack.Screen
        name="CustomFocus"
        component={CustomFocus}
        options={{
          title: 'New Route Map',
        }}
      />
    </RouteMapEditStack.Navigator>
  );
};
