import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../_redux/actions';
import PopupModal from '../../../../../../components/PopupModal';
import TitleText from '../../../../../../components/PopupModal/TitleText';
import MessageText from '../../../../../../components/PopupModal/MessageText';
import HintText from '../../../../../../components/PopupModal/HintText';
import {Button} from '../../../../../../components/form';
import styles from './styles';
import {View} from 'react-native';

export default function PostDeleteModal({visible, toggleModal, post}) {
  const [isLoading, setLoading] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleDeleteOnPress = (post) => {
    setLoading(true);

    setTimeout(() => {
      var input = {id: post.id, status: 0};

      dispatch(actions.updatePost(input)).then(() => {
        //Force update parameter to RouteMapDetail screen to refetch data
        navigation.navigate('RouteMapDetail', {forceUpdate: new Date().toLocaleString()});
      });
    }, 500);
  };

  return (
    <PopupModal visible={visible} toggleModal={toggleModal}>
      <View style={styles.title}>
        <TitleText title="Delete Post" />
      </View>
      <View style={styles.message}>
        <MessageText message="Are you sure you want to delete this post?" />
      </View>
      <View style={styles.hint}>
        <HintText hint="This action can’t be undone." />
      </View>
      <View style={styles.opportunitiesButton}>
        <Button
          title={isLoading ? 'Deleting...' : 'I’m sure'}
          onPress={() => handleDeleteOnPress(post)}
        />
      </View>
    </PopupModal>
  );
}
