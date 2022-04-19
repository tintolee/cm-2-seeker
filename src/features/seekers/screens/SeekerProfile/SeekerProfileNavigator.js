import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import RouteMapDetail from '../RouteMapDetail';
import RouteMapsList from '../RouteMapsList';
import SeekerPostFeed from '../PostFeed';
import SeekerProfile from './index';

const SeekerProfileStack = createStackNavigator();

export const SeekerProfileNavigator = ({route}) => {
  return (
    <SeekerProfileStack.Navigator
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
      <SeekerProfileStack.Screen
        name="SeekerProfile"
        component={SeekerProfile}
        initialParams={route.params}
        options={{
          title: null,
        }}
      />
      <SeekerProfileStack.Screen
        name="SeekerPostFeed"
        component={SeekerPostFeed}
        options={({route}) => ({title: route.params.title})}
      />
      <SeekerProfileStack.Screen
        name="SeekerRouteMaps"
        component={RouteMapsList}
        options={{
          title: 'Route Maps',
        }}
      />
      <SeekerProfileStack.Screen
        name="SeekerRouteMapDetail"
        component={RouteMapDetail}
        options={{
          title: 'Route Map',
          header: () => null,
        }}
      />
    </SeekerProfileStack.Navigator>
  );
};
