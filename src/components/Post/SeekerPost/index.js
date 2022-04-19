import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DoubleTap from '../../../components/DoubleTap';

export default function SeekerPost({
  post, 
  dispatch,
  postType,
  likesData,
  handler,
  seekerId,
  onPressOptions, 
  onPressShare
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

    if(handler){
       handler({
         dispatch: dispatch,
         isLiked: isLiked,
         items: post?.likes?.items,
         postType: postType,
         postId: post.id,
         seekerId: seekerId
       });
    }
  };

  return (
    <View>
      <Header
        firstName={post?.seeker?.firstName}
        lastName={post?.seeker?.lastName}
        seekerId={post?.seeker?.id}
        logo={post.seeker?.profilePic}
        onPressOptions={onPressOptions}
      />

      <DoubleTap doubleTap={likeHandler}>
        <Body
          type={post?.type}
          {...post}
          likeAnimation={likeAnimation}
          setlikeAnimation={() => setlikeAnimation(!likeAnimation)}
        />
      </DoubleTap>

      <Footer
        type="seeker"
        likesCount={likesData?.likesCount}
        likesDescription={likesData?.description}
        firstLikerImage={likesData?.img}
        caption={post.caption}
        postedAt={post.createdAt}
        username={post.seeker?.firstName}
        onPressShare={onPressShare}
        onPressLike={() => likeHandler('press')}
        isLiked={isLiked}
        post={post}
      />
    </View>
  );
}
