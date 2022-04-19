import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import {theme} from '../../components/Theme';
import RouteMapsList from './screens/RouteMapsList';
import RouteMapDetail from './screens/RouteMapDetail';
import PostFeed from '../posts/screens/PostFeed';
import RouteMapDesign from './screens/RouteMapDesign';

const RouteMapsStack = createStackNavigator();
export const RouteMapsNavigator = () => {
  return (
    <RouteMapsStack.Navigator
      headerMode="screen"
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
      <RouteMapsStack.Screen
        name="RouteMapsList"
        component={RouteMapsList}
        options={{
          title: 'Route Maps',
        }}
      />
      <RouteMapsStack.Screen
        name="RouteMapDetail"
        component={RouteMapDetail}
        options={{
          title: 'Route Map Detail',
          header: () => null,
        }}
      />
      <RouteMapsStack.Screen
        name="RouteMapPostFeed"
        component={PostFeed}
        options={({route}) => ({title: route.params.title})}
      />
      <RouteMapsStack.Screen name="RouteMapDesign" component={RouteMapDesign} />
    </RouteMapsStack.Navigator>
  );
};
