import React, { useState } from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { TabView, TabBar ,SceneMap} from 'react-native-tab-view';
import CircleIndicator from '../../../../components/Indicator';
import ConversationList from '../ConversationList';
import styles from './styles';

export default function MessagesTab({ navigation,route }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
     {key: 'All', title: 'All'},
     { key: 'Connections', title: 'Connections' },
     { key: 'CollaborationTab', title: 'Collaborations' },
     { key: 'ProvidersTab', title: 'Providers' },
  ]);
  console.log(routes)
  const renderScene = ({ route }) => {
    console.log('renderScene' + route.key)
    switch (route.key) {
      case 'All':
        return <ConversationList navigation={navigation} type={"All"} />;
      case 'Connections':
        return <ConversationList navigation={navigation} type={"CONNECTIONS"}/>;
      case 'CollaborationTab':
        return <ConversationList navigation={navigation} type={"GROUP"}/>;
      case 'ProvidersTab':
        return <ConversationList navigation={navigation} type={"PROVIDER"}/>;
      default:
        return null;
    }
  };

//   const renderScene = SceneMap({
//    // All: ConversationsScreen,
//    "chatstab": ConversationsScreen,
//   // CollaborationTab: ConversationsScreen,
//   //  ProvidersTab: ConversationsScreen,
// });


const ConversationsScreen = () => {

  return(
    <ConversationList navigation={navigation} />
  )
 
  // return(
  //   <View></View>
  // )
};

  const renderTabBar = (props) => (
    <View style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={{ backgroundColor: 'white' }}
        tabStyle={{ width: 'auto' }}
        scrollEnabled={true}
        renderLabel={({ route, focused, color }) => (
          <Text style={styles.tabLabel}>{route.title}</Text>
        )}
      />
    </View>
  );
       
  return (<>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      // style={styles.tabViewContainer}
      initialLayout={{ width: layout.width, height: layout.height }}
      scrollEnabled={true}
      //lazy={true}
    // renderLazyPlaceholder={() => <CircleIndicator />}
    />
  </>
  );
}
