import React, {useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import CircleIndicator from '../../../../../components/Indicator/CircleIndicator';
import ChatRoom from '../../chatRoom';
import ChatContacts from '../../chatContacts';
import styles from './styles';

export default function MessagesTab({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'All', title: 'All'},
    {key: 'ChatContacts', title: 'Connections'},
    {key: 'Collaborations', title: 'Collaborations'},
    {key: 'Providers', title: 'Providers'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Chats':
        return <ChatRoom />;
      case 'ChatContacts':
        return <ChatContacts />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <View style={{backgroundColor: 'white', paddingHorizontal: 16}}>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={{backgroundColor: 'white'}}
        tabStyle={{width: 'auto'}}
        scrollEnabled={true}
        renderLabel={({route, focused, color}) => (
          <Text style={styles.tabLabel}>{route.title}</Text>
        )}
      />
    </View>
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      scrollEnabled={true}
      lazy={true}
      renderLazyPlaceholder={() => <CircleIndicator />}
    />
  );
}
