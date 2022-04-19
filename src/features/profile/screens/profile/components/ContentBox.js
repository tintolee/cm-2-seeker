import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {theme} from '../../../../../components/Theme';

function ContentBox({routeMaps, posts, friends}) {
  const navigation = useNavigation();

  const ContentBox = ({number, text, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.5}
        onPress={onPress}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container1}>
      <ContentBox
        number={routeMaps ? routeMaps?.items?.length : 0}
        text={'Route Maps'}
        onPress={() => navigation.navigate('RouteMaps')}
      />
      <ContentBox number={posts ? posts?.items?.length : 0} text={'Steps'} />
      <ContentBox
        number={friends ? friends?.items?.length : 0}
        text={'Connections'}
        onPress={() => navigation.navigate('Connections')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: theme.spacing.s,
    marginTop: theme.spacing.s,
    marginBottom: -2,
    backgroundColor: theme.colors.background,
  },
  box: {
    alignItems: 'center',
    marginHorizontal: theme.spacing.m,
  },
  number: {
    ...theme.typography.formFieldTitle,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 10,
    letterSpacing: 0,
    marginTop: 2,
  },
});

export default ContentBox;
