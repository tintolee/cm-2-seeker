import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../../../components/svg/icons/LineArrowLeft';
import {theme} from '../../../../components/Theme';
import SelectRouteMap from '../SelectRouteMap';
import BlogEdit from './index';

const BlogEditStack = createStackNavigator();

export const BlogEditNavigator = ({route}) => {
  return (
    <BlogEditStack.Navigator
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
      <BlogEditStack.Screen
        name="BlogEdit"
        component={BlogEdit}
        initialParams={route.params}
        options={{
          title: 'New Blog',
        }}
      />
      <BlogEditStack.Screen
        name="SelectRouteMap"
        component={SelectRouteMap}
        options={{
          title: 'Select a route map',
        }}
      />
    </BlogEditStack.Navigator>
  );
};
