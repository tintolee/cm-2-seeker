import React from 'react';
import { View,Text } from 'react-native';
import Body from '../../../../../../components/Post/components/Body';
import Footer from './Footer';
import Header from './Header';
import { palette, theme } from '../../../../../../components/Theme';
import moment from 'moment';
export default function ContentPost({ content, firstName, lastName, seekerId, logo, caption, username,messageAuthor,isSender,messageTime }) {

  return (
    <View style={{ width: '100%', alignContent: isSender ?'flex-end': 'flex-start', flexDirection: 'row', justifyContent:  isSender ?'flex-end': 'flex-start', marginVertical:10 }}>
      <View style={{ width: '90%', }}>
        <Header
          firstName={firstName}
          lastName={lastName}
          seekerId={seekerId}
          logo={logo}

        />
        {content.postType == "OPPORTUNITY" && <Body type={content.postType} {...content} opportunity={content} />}
        {content.postType == "COLLABORATION" && <Body type={content.postType} {...content} collaboration={content} />}
        {content.postType == "CONTENT" && <Body type={content.postType} {...content} collaboration={content} />}
        {content.postType == "POST" && <Body type={content.postType} {...content}  />}
        <Footer
          type="seeker"
          caption={caption}
          postedAt={content.createdAt}
          username={username}
          post={content}
        />
        <View style={{flexDirection:'row',marginLeft:10,marginTop:10}}> 
        <Text style={{color:palette.lightGray,fontSize:10}}>{messageAuthor}</Text>
        <Text style={{color:palette.lightGray,fontSize:10,marginLeft:20}}>{moment(messageTime).format('mm:hh a').toLocaleUpperCase()}</Text>
        </View>
       
      </View>
    </View>
  );
}
