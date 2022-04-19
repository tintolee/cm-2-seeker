import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EnterIcon, FilledCircle,LineArrowLeft} from '../../../../../../components/svg/icons';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import {useSelector} from 'react-redux';
import {theme} from '../../../../../../components/Theme';

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
        navigation.navigate('ProviderProfile', {providerId});
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
    
        <TouchableOpacity
          style={styles.right}
          activeOpacity={0.5}
          onPress={() => handleProfileOnPress()}>
           <EnterIcon height={24} width={24} color="#000" />
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    backgroundColor:'white',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  left: {
    flexDirection: 'row',
  },
  profilePic: {
    marginRight: theme.spacing.s,
    height: 30,
    width: 30,
    borderRadius: theme.radius.l,
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: theme.radius.l,
  },
  name: {
    ...theme.typography.regular,
    // fontFamily: "SFProDisplay-Bold",
    color: theme.colors.black,
    letterSpacing: 0.4,
    alignSelf: 'center',
  },
});


export default Header;
