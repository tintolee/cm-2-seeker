import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ContentBox = ({number, text}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default function ProfileContentBox({routeMap}) {
  const steps = routeMap && routeMap.posts.items.length || 0;
  const attended = 0;
  const hosted = 0;
  const collaborated = 0;
  const milestones = (routeMap && routeMap.posts.items.filter(item=>item.type == "MILESTONE").length) || 0;
  // console.log(,"<==")

  return (
    <View style={styles.container}>
      <ContentBox number={steps} text={'Steps'} />
      <ContentBox number={milestones} text={'Milestones'} />
      {/* <ContentBox number={attended} text={'Attended'} />
      <ContentBox number={hosted} text={'Hosted'} />
      <ContentBox number={collaborated} text={'Collaborated'} /> */}
    </View>
  );
}
