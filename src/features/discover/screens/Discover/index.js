import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import SearchBar from './components/SearchBar';
import TabView from './components/TabView';
import AddPostModal from './components/AddPostModal';
import styles from './styles';
import { useDispatch } from 'react-redux';
import * as postReactionHandlers from '../../../../lib/postreactions/postreactionhandlers';

export default function Discover({route}) {
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleAddPostModal = () => {
    setAddPostModalVisible(!addPostModalVisible);
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <TabView 
      route={route}
      dispatch={dispatch}
      postReactionHandlers={postReactionHandlers}
      />
      <TouchableOpacity
        style={styles.buttonGPlusStyle}
        activeOpacity={0.5}
        onPress={toggleAddPostModal}>
        <Image
          source={require('../../../../assets/img/gradientPlus.png')}
        />
      </TouchableOpacity>
      <AddPostModal
        visible={addPostModalVisible}
        toggleModal={toggleAddPostModal}
      />
    </View>
  );
}
