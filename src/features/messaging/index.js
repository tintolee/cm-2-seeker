import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from '../../components/Theme';
import LineArrowLeft from '../../components/svg/icons/LineArrowLeft';
import Main from './screens/Main';
import ChatMessage from './screens/ChatMessage';


const MessagesStack = createStackNavigator();

export const MessagesNavigator = () => {
  return (
    <MessagesStack.Navigator
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
      <MessagesStack.Screen name="Messages" component={Main} />
      {/* <MessagesStack.Screen name="Contacts" component={ChatContacts} />
      <MessagesStack.Screen name="ChatHome" component={ChatHome} />*/}
      <MessagesStack.Screen name="ChatMessage" component={ChatMessage}  options={{
          title: 'Chat Message',header: () => null}
        }/> 
    </MessagesStack.Navigator>
  );
};
