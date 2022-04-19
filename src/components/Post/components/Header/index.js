import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LineMoreHorizontal, FilledCircle} from '../../../svg/icons';
import ImageS3 from '../../../Image/ImageS3';
import styles from './styles';
import {useSelector} from 'react-redux';

const Header = ({
  firstName,
  lastName,
  seekerId,
  providerId,
  logo,
  onPressOptions,
}) => {
  const navigation = useNavigation();
  const {seeker} = useSelector((state) => ({
    seeker: state.seekerReducer.seeker,
  }));
  const optionIconVisible = !!onPressOptions;

  const handleProfileOnPress = () => {
    if (seeker.id == seekerId) {
      navigation.navigate('Profile');
    } else {
      if (seekerId) {
        navigation.navigate('SeekerProfile', {seekerId});
      } else if (providerId) {
       navigation.navigate('ProviderProfile', {
      providerId: providerId,
      forceUpdate: (new Date()).toLocaleDateString()
    });
      }
    }
  };

  const handleOptionsOnPress = () => {
    if (onPressOptions) {
      onPressOptions(`${firstName}'s post`);
    }
  };

  const postLogo = () => {
    if (seekerId) {
      navigation.navigate('SeekerProfile', {seekerId});
    } else if (providerId) {
      navigation.navigate('ProviderProfile', {providerId});
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.left}
        activeOpacity={0.5}
        onPress={() => handleProfileOnPress()}>
        <View style={styles.profilePic}>
          {logo ? (
            <ImageS3 imageObj={logo} style={styles.logo} />
          ) : (
            <FilledCircle width="30" height="30" color="#ffd5a4" />
          )}
        </View>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
      </TouchableOpacity>
      {optionIconVisible && (
        <TouchableOpacity
          style={styles.right}
          activeOpacity={0.5}
          onPress={() => handleOptionsOnPress()}>
          <LineMoreHorizontal width={24} height={24} color="#0D1C2E" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
