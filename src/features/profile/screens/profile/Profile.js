import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Auth} from 'aws-amplify';

import {clear as clearCollaborations} from '../../../collaborations/_redux/actions';
import {clear as clearDiscover} from '../../../discover/_redux/actions';
import {clear as clearOpportunities} from '../../../opportunities/_redux/actions';
import {clear as clearPosts} from '../../../posts/_redux/actions';
import {clear as clearProfile} from '../../../profile/_redux/actions';
import {clear as clearProviders} from '../../../providers/_redux/actions';
import {clear as clearRouteMaps} from '../../../routeMaps/_redux/actions';
import {clear as clearSeekers} from '../../../seekers/_redux/actions';
import {clear as clearUserProfile} from '../../../userProfile/_redux/actions';
import {clear as clearMessaging} from '../../../messaging/_redux/actions';

import * as actions from '../../_redux/actions';
import {s3Bucket, region, uploadImage} from '../../../../hooks/useUploadImage';
import {resizeImage} from '../../../../utils/FileResizer';
import {theme} from '../../../../components/Theme';
import ImageS3 from '../../../../components/Image/ImageS3';
import {ShapePencil} from '../../../../components/svg/icons';

import ActionItem from './components/LogoutModal/ActionItem';
import Divider from './components/LogoutModal/Divider';
import ContentBox from './components/ContentBox';
import ProfileName from './components/ProfileName';
import PostsGridView from './components/ProfilePosts/PostsGridView';
import ProfileMenuButton from './components/ProfileMenuButton';
import ModalBottom from './components/LogoutModal';

export default function Profile({
  updateAuthState,
  toggleModal,
  onModalHide,
  navigation,
}) {
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);

  const dispatch = useDispatch();
  const {user, seeker, posts} = useSelector(
    (state) => ({
      user: state.seekerReducer.seeker,
      seeker: state.profileReducer.seeker,
      posts: state.profileReducer.posts,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch(actions.fetchSeekerProfile(user.id));
    dispatch(actions.fetchSeekerPosts(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    //Fetch SeekerProfile and SeekerPosts when screen is focused.
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(actions.fetchSeekerProfile(user.id));
      dispatch(actions.fetchSeekerPosts(user.id));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [dispatch, navigation, user.id]);

  const toggleAddPostModal = () => {
    setAddPostModalVisible(!addPostModalVisible);
  };

  async function signOut() {
    try {
      await Auth.signOut();

      dispatch(clearCollaborations());
      dispatch(clearDiscover());
      dispatch(clearOpportunities());
      dispatch(clearPosts());
      dispatch(clearProviders());
      dispatch(clearRouteMaps());
      dispatch(clearSeekers());
      dispatch(clearProfile());
      dispatch(clearMessaging());

      updateAuthState('loggedOut');

      dispatch(clearUserProfile());

      navigation.navigate('SignIn');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  const imagePickerHandler = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 500,
        cropping: false,
        mediaType: 'photo',
      }).then((image) => {
        handleOnSubmit(image.path);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (imageUrl) => {
    try {
      if (imageUrl) {
        const config = {
          maxWidth: 500,
          maxHeight: 500,
          compressFormat: 'JPEG',
          quality: 100,
        };

        const resizedImage = await resizeImage(imageUrl, config);

        let image;
        if (resizedImage) {
          image = await uploadImage(resizedImage.path);

          const input = {
            id: user.id,
            profilePic: {
              key: image,
              bucket: s3Bucket,
              region: region,
            },
          };

          dispatch(actions.updateSeeker(input)).then(() => {
            dispatch(actions.fetchSeekerProfile(user.id));
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        <View style={styles.navigator}></View>
      </SafeAreaView>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <ImageS3 imageObj={seeker.profilePic} style={styles.image} />
          <TouchableOpacity
            onPress={imagePickerHandler}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 80,
              backgroundColor: '#f59532',
              padding: 10,
              borderRadius: 100,
            }}>
            <ShapePencil width={14} height={14} color={'#fff'} />
          </TouchableOpacity>
        </View>

        <ProfileMenuButton onPress={toggleAddPostModal} />
        <View style={styles.nameContainer}>
          <ProfileName
            firstName={seeker?.firstName ? seeker.firstName : ''}
            lastName={seeker?.lastName ? seeker.lastName : ''}
          />
        </View>
        <Text style={styles.biography}>{seeker?.biography}</Text>
        <ContentBox {...seeker} />
      </View>

      {posts && posts.length !== 0 && (
        <PostsGridView posts={posts} isMine={true} seeker={seeker} />
      )}
      <ModalBottom
        visible={addPostModalVisible}
        swipeDirection={['down']}
        toggleModal={toggleAddPostModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        onModalHide={onModalHide}>
        <ActionItem
          icon={'briefcase'}
          name="My Opportunities"
          onPress={() => {
            setAddPostModalVisible(false);
            setTimeout(() => {
              navigation.navigate('MyOpportunities');
            }, 250);
          }}
        />
        <Divider />
        <ActionItem
          icon={'people'}
          name="My Collaborations"
          onPress={() => {
            setAddPostModalVisible(false);
            setTimeout(() => {
              navigation.navigate('MyCollaborations');
            }, 250);
          }}
        />
        <Divider />
        <ActionItem
          icon={'settings'}
          name="Settings"
          onPress={() => {
            setAddPostModalVisible(false);
            setTimeout(() => {
              navigation.navigate('ProfileSettings');
            }, 250);
          }}
        />
        <Divider />
        <ActionItem icon={'logout'} name="Logout" onPress={signOut} />
      </ModalBottom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 10,
    marginTop: 35,
  },
  nameContainer: {
    marginBottom: 10,
  },
  biography: {
    textAlign: 'center',
    ...theme.typography.title6,
    color: theme.colors.formFieldTitle,
    marginHorizontal: 36,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 70,
  },
  navigator: {},
});
