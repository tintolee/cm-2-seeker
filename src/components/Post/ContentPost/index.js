import React, {useState} from 'react';
import {View} from 'react-native';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoubleTap from '../../../components/DoubleTap';

export default function ContentPost({
  content,
  onPressOptions,
  onPressShare,
  userId,
  dispatch,
  likesData,
  postType,
  handler,
}) {
  const [isLiked, setIsLiked] = useState(likesData?.seekerHasLiked);
  const [likeAnimation, setlikeAnimation] = useState(false);
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
        items: content?.likes?.items,
        postType: postType,
        postId: content?.id,
        seekerId: userId,
      });
    }
  };
  return (
    <View>
      <Header
        firstName={content.opportunityProvider.name}
        providerId={content.opportunityProviderId}
        logo={content.opportunityProvider.logo}
        onPressOptions={onPressOptions}
      />
      <DoubleTap doubleTap={likeHandler}>
        <Body
          type={content.type}
          {...content}
          likeAnimation={likeAnimation}
          setlikeAnimation={() => setlikeAnimation(!likeAnimation)}
        />
      </DoubleTap>
      <Footer
        likesCount={likesData?.likesCount}
        likesDescription={likesData?.description}
        firstLikerImage={likesData?.img}
        caption={content.caption}
        postedAt={content.createdAt}
        username={content.opportunityProvider.name}
        onPressShare={onPressShare}
        onPressLike={() => likeHandler('press')}
        isLiked={likesData?.seekerHasLiked}
      />
    </View>
  );
}
