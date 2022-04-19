import * as React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {shallowEqual, useSelector} from 'react-redux';
import {
  NavBarHome,
  NavBarRoute,
  NavBarMessages,
  NavBarNotifications,
  NavBarProfiles,
} from '../components/svg/icons';
import {theme} from '../components/Theme';

import {DiscoverNavigator} from '../features/discover';
import {RouteMapsNavigator} from '../features/routeMaps';
import {MessagesNavigator} from '../features/messaging';
import {NotificationsNavigator} from '../features/notifications';
import {ProfileNavigator} from '../features/profile';

import {RouteMapEditNavigator} from '../features/routeMaps/screens/RouteMapEdit/RouteMapEditNavigator';
import {PhotoEditNavigator} from '../features/posts/screens/PhotoEdit/PhotoEditNavigator';
import {BlogEditNavigator} from '../features/posts/screens/BlogEdit/BlogEditNavigator';
import {VideoEditNavigator} from '../features/posts/screens/VideoEdit/VideoEditNavigator';
import {MilestoneEditNavigator} from '../features/posts/screens/MilestoneEdit/MilestoneEditNavigator';
import {ShareNavigator} from '../features/posts/screens/Share/ShareNavigator';
import {OpportunityDetailNavigator} from '../features/opportunities/screens/OpportunityDetail/OpportunityDetailNavigator';
import {CollaborationDetailNavigator} from '../features/collaborations/screens/CollaborationDetail/CollaborationDetailNavigator';
import {CollaborationEditNavigator} from '../features/collaborations/screens/CollaborationEdit/CollaborationEditNavigator';
import {ProviderProfileNavigator} from '../features/providers/screens/ProviderProfile/ProviderProfileNavigator';
import {SeekerProfileNavigator} from '../features/seekers/screens/SeekerProfile/SeekerProfileNavigator';

const AppBottomTab = createBottomTabNavigator();
const AppStack = createStackNavigator();

export const TabNavigator = (props) => {
  return (
    <AppBottomTab.Navigator
      lazy={false}
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.inactiveTintColor,
        labelStyle: {
          ...theme.typography.regular,
        },
      }}>
      <AppBottomTab.Screen
        name="Discover"
        component={DiscoverNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <NavBarHome width={26} height={26} color={color} />
          ),
        }}
      />
      <AppBottomTab.Screen
        name="RouteMaps"
        component={RouteMapsNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <NavBarRoute width={26} height={26} color={color} />
          ),
        }}
      />
      <AppBottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <NavBarMessages width={26} height={26} color={color} />
          ),
        }}
      />
      <AppBottomTab.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <NavBarNotifications width={26} height={26} color={color} />
          ),
        }}
      />
      <AppBottomTab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({color}) => (
            <NavBarProfiles width={26} height={26} color={color} />
          ),
        }}>
        {(screenProps) => (
          <ProfileNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppBottomTab.Screen>
    </AppBottomTab.Navigator>
  );
};

export const AppNavigator = (props) => {
  const {profileCompleted} = useSelector(
    (state) => ({
      profileCompleted: state.seekerReducer.profileCompleted,
    }),
    shallowEqual,
  );

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Connecme App Camera Permission',
          message:
            'Connecme App needs access to your camera ' +
            'so you can Upload Pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // if (!profileCompleted) {
  //   return (
  //     <AppStack.Navigator headerMode="none" initialRouteName="UserProfile">
  //       <AppStack.Screen name="UserProfile" component={userProfileNavigator} />
  //     </AppStack.Navigator>
  //   );
  // }
  return (
    <AppStack.Navigator
      headerMode="none"
      initialRouteName="discover"
      screenOptions={{}}>
      <AppStack.Screen name="TabNavigator">
        {(screenProps) => (
          <TabNavigator
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="RouteMapsEdit" component={RouteMapEditNavigator} />
      <AppStack.Screen name="PhotoEdit" component={PhotoEditNavigator} />
      <AppStack.Screen name="BlogEdit" component={BlogEditNavigator} />
      <AppStack.Screen name="VideoEdit" component={VideoEditNavigator} />
      <AppStack.Screen
        name="MilestoneEdit"
        component={MilestoneEditNavigator}
      />
      <AppStack.Screen
        name="CollaborationEdit"
        component={CollaborationEditNavigator}
      />
      <AppStack.Screen name="Share" component={ShareNavigator} />
      <AppStack.Screen
        name="OpportunityDetail"
        component={OpportunityDetailNavigator}
      />
      <AppStack.Screen
        name="CollaborationDetail"
        component={CollaborationDetailNavigator}
      />
      <AppStack.Screen
        name="ProviderProfile"
        component={ProviderProfileNavigator}
      />
      <AppStack.Screen
        name="SeekerProfile"
        component={SeekerProfileNavigator}
      />
    </AppStack.Navigator>
  );
};
