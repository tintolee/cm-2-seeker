import * as React from 'react';
import {useEffect, useState} from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';

import Onboarding from '../features/onboarding';
import {AppNavigator} from './AppNavigator';
import {Authstacknavigator} from '../navigation/AuthStack';
import {navigationRef} from './NavigationService';

export default function App() {
  const [isLoggedIn, setUserLoggedIn] = useState('initializing');

  useEffect(() => {
    checkIsOnBoarding();
  }, []);

  const Initializing = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  };

  async function checkIsOnBoarding() {
    const status = await AsyncStorage.getItem('IsOnBoarding');
    if (status) {
      checkAuthState();
    } else {
      setUserLoggedIn('onBoarding');
    }
  }

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      setUserLoggedIn('loggedIn');
    } catch (err) {
      setUserLoggedIn('loggedOut');
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  const onBoardingHandler = async () => {
    await AsyncStorage.setItem('IsOnBoarding', 'true');
    checkAuthState();
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      {isLoggedIn === 'initializing' && <Initializing />}
      {isLoggedIn === 'onBoarding' && (
        <Onboarding stateHandler={onBoardingHandler} />
      )}
      {isLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} />
      )}
      {isLoggedIn === 'loggedOut' && (
        <Authstacknavigator updateAuthState={updateAuthState} />
      )}
    </NavigationContainer>
  );
}
