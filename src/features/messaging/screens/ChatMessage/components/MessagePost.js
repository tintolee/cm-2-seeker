import React from 'react';
import {View} from 'react-native';
import Body from '../../../../../components/Post/components/Body';
import Footer from '../../../../../components/Post/components/Footer';
import Header from '../../../../../components/Post/components/Header';

export default function MessagePost({post}) {
  
  return (
    <View>
      <Header
        firstName={post?.seeker?.firstName}
        lastName={post?.seeker?.lastName}
        seekerId={post?.seeker?.id}
        logo={post.seeker?.profilePic}
        onPressOptions={onPressOptions}
      />
      <Body type={post.type} {...post} />
      <Footer
        type="seeker"
        likesCount={1}
        caption={post.caption}
        postedAt={post.createdAt}
        username={post.seeker?.firstName}
        onPressShare={onPressShare}
        post = {post}
      />
    </View>
  );
}
