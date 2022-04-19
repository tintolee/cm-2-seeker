import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {theme} from '../../../../../components/Theme';

function ProfileMenuButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuButton} activeOpacity={0.5}>
      <Image
        source={require('../../../../../assets/img/iconMenu3.png')}
        style={{height: "100%", width: '100%'}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: 24,
    height: 24,
    position: 'absolute',
    zIndex: 999,
    // top: 70,
    // alignItems: 'flex-end',
    paddingHorizontal: theme.sm,
    // left: 160,
    right: 30
  },
});

export default ProfileMenuButton;
