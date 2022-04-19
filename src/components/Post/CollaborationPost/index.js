import React from 'react';
import {View, Image} from 'react-native';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoubleTap from '../../../components/DoubleTap';

export default function CollaborationPost({
  collaboration,
  onPressOptions,
  onPressShare,
  dispatch,
  userId,
  likesData,
  handler,
}) {
  const [isLiked, setIsLiked] = React.useState(likesData?.seekerHasLiked);
  const [likeAnimation, setlikeAnimation] = React.useState(false);

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
        items: collaboration?.likes?.items,
        postType: 'discover-collaboration',
        collaborationId: collaboration?.id,
        seekerId: userId,
      });
    }
  };
  return (
    <View>
      <Header
        firstName={collaboration.owner?.firstName}
        lastName={collaboration.owner?.lastName}
        seekerId={collaboration.owner?.id}
        logo={collaboration.owner?.profilePic}
        onPressOptions={onPressOptions}
      />
      <DoubleTap doubleTap={likeHandler}>
        <Body
          type="COLLABORATION"
          collaboration={collaboration}
          likeAnimation={likeAnimation}
          likesData={likesData}
          setlikeAnimation={() => setlikeAnimation(!likeAnimation)}
        />
      </DoubleTap>
      <Footer
        type="COLLABORATION"
        likesCount={likesData?.likesCount}
        likesDescription={likesData?.description}
        firstLikerImage={likesData?.img}
        caption={collaboration?.caption}
        username={collaboration.owner?.firstName}
        onPressShare={onPressShare}
        onPressLike={() => likeHandler('press')}
        postedAt={collaboration.startDate}
        isLiked={likesData?.seekerHasLiked}
      />
    </View>
  );
}
