import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import {theme} from '../../components/Theme';
import Profile from './screens/profile/Profile';
import EditProfile from './screens/profile/EditProfile';
import ProfileSettings from './screens/profile/profileSettings/ProfileSettings';
import MyOpportunities from './screens/MyOpportunities';
import MyCollaborations from './screens/MyCollaborations';
import Connections from './screens/Connections';
import ProfileNotifications from './screens/profile/ProfileNotifications';
import PostFeed from './screens/PostFeed';
import {ChangePassword} from './screens/Settings/ChangePassword';

const ProfileStack = createStackNavigator();

export const ProfileNavigator = (props) => {
  return (
    <ProfileStack.Navigator
      headerMode = "screen"
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
      <ProfileStack.Screen
        name="Profile"
        options={{
          header: () => null,
        }}>
        {(screenProps) => (
          <Profile
            {...screenProps}
            route={screenProps.route}
            updateAuthState={props.updateAuthState}
          />
        )}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
        }}
      />
      <ProfileStack.Screen
        name="ProfileSettings"
        options={{
          title: 'Profile Settings',
        }}>
        {(screenProps) => (
          <ProfileSettings
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="MyOpportunities"
        component={MyOpportunities}
        options={{
          title: 'My Opportunities',
        }}
      />
      <ProfileStack.Screen
        name="MyCollaborations"
        component={MyCollaborations}
        options={{
          title: 'My Collaborations',
        }}
      />
      <ProfileStack.Screen
        name="Connections"
        component={Connections}
        options={{
          title: 'Connections',
        }}
      />
      <ProfileStack.Screen
        name="ProfileNotifications"
        component={ProfileNotifications}
        options={{
          title: 'Notifications',
        }}
      />
      <ProfileStack.Screen
        name="ProfilePostFeed"
        component={PostFeed}
        options={({route}) => ({title: route.params.title})}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
        }}
      />
    </ProfileStack.Navigator>
  );
};
