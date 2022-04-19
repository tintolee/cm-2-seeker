import React, {useState} from 'react';
import {View} from 'react-native';

import {getAttandeeState} from '../../../utils/constants';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoubleTap from '../../../components/DoubleTap';

export default function OpportunityPost({
  opportunity,
  userId,
  onPressOptions,
  onPressShare,
  dispatch,
  likesData,
  handler,
}) {
  const [isLiked, setIsLiked] = useState(likesData?.seekerHasLiked);
  const [likeAnimation, setlikeAnimation] = useState(false);

  const {attendees, caption, date, opportunityProvider, title} = opportunity;

  const seekerAttendee = attendees?.items.find((a) => a.seekerId === userId);

  const attandeeState = getAttandeeState({
    status: seekerAttendee ? seekerAttendee.status : 0,
    opportunity,
  });
  //console.log("data in opp: ",[likesData]);

  const likeHandler = (isPress) => {
    if (!isLiked) {
      setlikeAnimation(!likeAnimation);
      setIsLiked(!isLiked);
    }
    if (isPress) {
      setIsLiked(!isLiked);
    }

    if (handler) {
      handler({
        dispatch: dispatch,
        isLiked: isLiked,
        items: opportunity?.likes.items,
        postType: 'discover-opportunity',
        opportunityId: opportunity?.id,
        seekerId: userId,
      });
    }
  };

  return (
    <View>
      <Header
        firstName={opportunityProvider.name}
        providerId={opportunityProvider.id}
        logo={opportunityProvider.logo}
        title={title}
        onPressOptions={onPressOptions}
      />
      <DoubleTap doubleTap={likeHandler}>
        <Body
          type="OPPORTUNITY"
          opportunity={opportunity}
          opportunityAttandee={attandeeState}
          likesData={likesData}
          likeAnimation={likeAnimation}
          likesCount={likesData?.likesCount}
          firstLikerImage={likesData?.img}
          likesDescription={likesData?.description}
          isLiked={likesData?.seekerHasLiked}
          setlikeAnimation={() => setlikeAnimation(!likeAnimation)}
        />
      </DoubleTap>
      <Footer
        likesCount={likesData?.likesCount}
        firstLikerImage={likesData?.img}
        likesDescription={likesData?.description}
        caption={caption}
        username={opportunityProvider.name}
        onPressShare={onPressShare}
        postedAt={date}
        onPressLike={() => likeHandler('press')}
        isLiked={likesData?.seekerHasLiked}
      />
    </View>
  );
}
