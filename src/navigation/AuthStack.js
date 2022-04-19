import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from '../components/Theme';
import LineArrowLeft from '../components/svg/icons/LineArrowLeft';

import SignInScreen from '../features/Signup/Screens/SignIn/SignInScreen';
import CreateAccount from '../features/Signup/Screens/CreateAccount/CreateAccount';
import CreatePassword from '../features/Signup/Screens/CreatePassword/CreatePassword';
import ForgotPassword from '../features/Signup/Screens/ForgotPassword';
import CompleteNewPassword from '../features/Signup/Screens/CompleteNewPassword';
import VerifyMobile from '../features/Signup/Screens/Verification/VerifyMobile /VerifyMobile';
import Loading from '../features/Signup/Screens/Loading/Loading';
import Loading1 from '../features/Signup/Screens/Loading/Loading1';
import AddDisplayName from '../features/Signup/Screens/Verification/AddDisplayName/AddDisplayName';

const Authstack = createStackNavigator();

export const Authstacknavigator = (props) => {
  return (
    <Authstack.Navigator
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
      <Authstack.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Authstack.Screen
        name="Loading1"
        component={Loading1}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Authstack.Screen
        name="SignIn"
        options={{headerShown: false, gestureEnabled: false}}>
        {(screenProps) => (
          <SignInScreen
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Authstack.Screen>
      <Authstack.Screen
        name="AddDisplayName"
        options={{headerShown: false, gestureEnabled: false}}>
        {(screenProps) => (
          <AddDisplayName
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Authstack.Screen>
      <Authstack.Screen
        name="VerifyMobile"
        options={{headerShown: false, gestureEnabled: false}}>
        {(screenProps) => (
          <VerifyMobile
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </Authstack.Screen>
      <Authstack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{
          headerShown: false,
        }}
      />
      <Authstack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: '',
        }}
      />
      <Authstack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          title: '',
        }}
      />
      <Authstack.Screen
        name="CompleteNewPassword"
        component={CompleteNewPassword}
        options={{
          title: '',
        }}
      />
    </Authstack.Navigator>
  );
};
