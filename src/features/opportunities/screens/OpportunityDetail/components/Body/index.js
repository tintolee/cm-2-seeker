import React,{useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  FilledPinFill,
  FilledCalendarFill,
} from '../../../../../../components/svg/icons';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import Footer from '../Footer';
import styles from './styles';
import {theme} from '../../../../../../components/Theme';

export default function Body({
  opportunity,
  likeData,
  dispatch,
  handler,
  seekerId
}) {
  const navigation = useNavigation();
  console.log("likesData in Body: ", likeData);
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
         items: opportunity?.likes?.items,
         postType: "opportunity",
         opportunityId: opportunity?.id,
         seekerId: seekerId,
         navigation: navigation
       });
    }
  };


  const {
    applicationDeadline,
    applicationRequired,
    caption,
    date,
    description,
    location,
    opportunityProvider,
    title,
  } = opportunity;

  const opportunityAttendees =
    opportunity?.attendees &&
    opportunity?.attendees?.items.filter((item) => item.status === 1);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{marginTop: theme.spacing.m}}
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate('ProviderProfile', {
            providerId: opportunityProvider.id,
            forceUpdate: (new Date()).toLocaleDateString()
          })
        }>
        <Text style={styles.hostedBy}>
          Hosted by{' '}
          <Text style={{fontWeight: 'bold'}}>{opportunityProvider.name}</Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rowContainer}>
        <FilledPinFill width={20} height={20} color="#000" />
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.rowContainer}>
        <FilledCalendarFill width={20} height={20} color="#000" />
        {date && (
          <Text style={styles.location}>
            {moment(date).format('Do MMM, h:mm a')}
          </Text>
        )}
      </View>
      {opportunityAttendees.length > 0 && (
        <View style={styles.attendeesContainer}>
          {applicationRequired ? (
            <Text style={styles.whosAttending}>
              Who's applied:
              <Text
                style={{
                  fontWeight: 'bold',
                }}>{` ${opportunityAttendees.length} Applicants`}</Text>
            </Text>
          ) : (
            <>
              <Text style={styles.whosAttending}>Who's attending</Text>
              <View style={styles.avatarContainer}>
                {opportunityAttendees.slice(0, 5).map((item, index) => (
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
            </>
          )}
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
      {applicationDeadline && (
        <Text style={styles.deadline}>
          {`Deadline to ${applicationRequired ? 'apply' : 'RSVP'}: ${moment(
            applicationDeadline,
          ).format('Do MMM YY')}`}
        </Text>
      )}
      <Footer
        likesCount={likeData?.likesCount}
        likesDescription={likeData?.description}
        firstLikerImage={likeData?.img}
        onPressLike={() => likeHandler('press')}
        isLiked={isLiked}
        caption={caption}
        username={opportunityProvider.name}
        postedAt={date}
      />
      <View style={{height: 10}} />
    </ScrollView>
  );
}
