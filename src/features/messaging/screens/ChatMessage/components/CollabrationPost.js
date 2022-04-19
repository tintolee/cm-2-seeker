import React from 'react';
import {View} from 'react-native';
import Body from '../../../../../components/Post/components/Body';
import Footer from '../../../../../components/Post/components/Footer';
import Header from '../../../../../components/Post/components/Header';

export default function CollaborationPost({
  collaboration,
  onPressOptions,
  onPressShare,
}) {
  return (
    <View>
      <Header
        firstName={collaboration.owner?.firstName}
        lastName={collaboration.owner?.lastName}
        seekerId={collaboration.owner?.id}
        logo={collaboration.owner?.profilePic}
        onPressOptions={onPressOptions}
      />
      <Body type="COLLABORATION" collaboration={collaboration} />
      {/* <Footer
        type="COLLABORATION"
        likesCount={1}
        caption={collaboration.description}
        username={collaboration.owner?.firstName}
        onPressShare={onPressShare}
        postedAt={collaboration.startDate}
       
      /> */}
    </View>
  );
}
