import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import {theme} from '../../components/Theme';
import Discover from './screens/Discover';
import Search from './screens/Search';
import FilterOpportunities from './screens/Discover/FilterOpportunities';
import FilterOpportunitiesSelect from './screens/Discover/FilterOpportunitiesSelect';

const DiscoverStack = createStackNavigator();

export const DiscoverNavigator = () => {
  return (
    <DiscoverStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
          shadowColor: 'transparent',
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          ...theme.typography.headerTitle,
          lineHeight: 0,
        },
        headerHideShadow: true,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {marginLeft: theme.spacing.m},
        headerBackImage: () => (
          <LineArrowLeft width={24} height={24} color={theme.colors.primary} />
        ),
      }}>
      <DiscoverStack.Screen
        name="DiscoverFeed"
        component={Discover}
        options={{
          title: 'Discover',
        }}
      />
      <DiscoverStack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
        }}
      />
      <DiscoverStack.Screen
        name="OpportunitiesFilter"
        component={FilterOpportunities}
        options={{
          title: 'OpportunitiesFilter',
          header: () => null,
        }}
      />
      <DiscoverStack.Screen
        name="FilterOpportunitiesSelect"
        component={FilterOpportunitiesSelect}
        options={{
          title: 'FilterOpportunitiesSelect',
          header: () => null,
        }}
      />
    </DiscoverStack.Navigator>
  );
};
