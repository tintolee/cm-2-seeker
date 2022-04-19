import React,{useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  FilledPinFill,
  FilledCalendarFill,
} from '../../../../../../components/svg/icons';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import Footer from '../Footer';
import styles from './styles';

export default function Body({
  collaboration,
  likeData,
  dispatch,
  handler,
  seekerId
}) {
  const navigation = useNavigation();

  const [isLiked, setIsLiked] = useState(likeData?.seekerHasLiked);
  const [likeAnimation, setlikeAnimation] = useState(false);

  const likeHandler = (isPress) => {
    if (!isLiked) {
      setlikeAnimation(!likeAnimation);
      setIsLiked(!isLiked);
    }
    if (isPress) {
      setIsLiked(!isLiked);
    }

    if(handler){
       handler({
         dispatch: dispatch,
         isLiked: isLiked,
         items: collaboration?.likes?.items,
         postType: "collaboration",
         collaborationId: collaboration?.id,
         seekerId: seekerId,
         navigation: navigation
       });
    }
  };

  const registeredMembers =
    collaboration?.members &&
    collaboration?.members?.items.filter((item) => item.status === 1);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('SeekerProfile', {
            seekerId: collaboration?.owner?.id,
          })
        }>
        <Text style={styles.hostedBy}>
          Created by{' '}
          <Text style={{fontWeight: 'bold'}}>
            {collaboration?.owner?.firstName} {collaboration?.owner?.lastName}
          </Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>{collaboration.title}</Text>
      <View style={styles.rowContainer}>
        <FilledPinFill width={20} height={20} color="#000" />
        <Text style={styles.location}>{collaboration.location}</Text>
      </View>
      <View style={styles.rowContainer}>
        <FilledCalendarFill width={20} height={20} color="#000" />
        <Text style={styles.location}>
          {moment(collaboration.startDate).format('Do MMM, h:mm a')}
        </Text>
      </View>
      {registeredMembers.length > 0 && (
        <View style={styles.attendeesContainer}>
          <Text style={styles.whosAttending}>Who's involed</Text>
          <View style={styles.avatarContainer}>
            {registeredMembers.slice(0, 5).map((item, index) => (
              <View key={index} style={styles.attendeeAvatar}>
                {item?.seeker?.profilePic && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate('SeekerProfile', {
                        seekerId: item?.seeker?.id,
                      })
                    }>
                    <ImageS3
                      imageObj={item?.seeker?.profilePic}
                      style={styles.logo}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
      <Text style={styles.description}>{collaboration.description}</Text>
      <Footer
        likesCount={likeData?.likesCount}
        likesDescription={likeData?.description}
        firstLikerImage={likeData?.img}
        onPressLike={() => likeHandler('press')}
        isLiked={isLiked}
        caption={collaboration?.caption}
        username={collaboration?.owner?.firstName}
        postedAt={collaboration?.date}
      />
    </ScrollView>
  );
}
