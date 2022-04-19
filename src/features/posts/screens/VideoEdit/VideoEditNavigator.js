import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import SelectRouteMap from '../SelectRouteMap';
import VideoEdit from './index';

const VideoEditStack = createStackNavigator();

export const VideoEditNavigator = ({route}) => {
  return (
    <VideoEditStack.Navigator
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
      <VideoEditStack.Screen
        name="VideoEdit"
        component={VideoEdit}
        initialParams={route.params}
        options={{
          title: 'New Video',
        }}
      />
      <VideoEditStack.Screen
        name="SelectRouteMap"
        component={SelectRouteMap}
        options={{
          title: 'Select a route map',
        }}
      />
    </VideoEditStack.Navigator>
  );
};
