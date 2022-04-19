import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import {theme} from '../../components/Theme';
import MyProfile from './MyProfile/MyProfile';
import Brands from './Brands/Brands';
import Interests from './Interests/Interests';
import AboutYourself from './AboutYourself/AboutYourself';


const userProfile = createStackNavigator();
export const userProfileNavigator = () => {

  return (
    <userProfile.Navigator
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
      <userProfile.Screen
        
        name="RouteMapsList"
        component={MyProfile}
        options={{
          title: 'Profile',
        }}
      />
      <userProfile.Screen
        name="Brands"
        component={Brands}
        options={{
          title: 'Brands',
          header: () => null,
        }}
      />
      <userProfile.Screen
        name="Interests"
        component={Interests}
        options={{
          title: 'Interests',
          header: () => null,
        }}
      />
      <userProfile.Screen
        name="AboutYourself"
        component={AboutYourself}
        options={{
          title: 'AboutYourself',
          header: () => null,
        }}
      />
    </userProfile.Navigator>
  );
};
