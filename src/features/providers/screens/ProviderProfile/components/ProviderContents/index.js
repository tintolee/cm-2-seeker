import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ContentPost from '../../../../../../components/Post/ContentPost';
import OpportunityPost from '../../../../../../components/Post/OpportunityPost';
import styles from './styles';

export default function ProviderContents({contents, dispatch,postReactionHandlers, opportunities, userId}) {
  const navigation = useNavigation();

  const handleOnPressShare = (post) => {
    navigation.navigate('Share', {post});
  };

  return (
    <View style={styles.container}>
      {contents &&
        contents.items &&
        contents.items.map((item, index) => {
          let likesData = postReactionHandlers.getLikeDetails(item,userId),
          handler = postReactionHandlers.likeResourceHandler;
          return (
          <ContentPost
            key={index}
            content={item}
            onPressShare={() => handleOnPressShare(item)}
            likesData={likesData}
            handler={handler}
            dispatch={dispatch}
            postType="provider-post"
            userId={userId}
          />
        )}
        )}
      {opportunities &&
        opportunities.items &&
        opportunities.items.map((item, index) => {
          console.log("item: ",item);
          let likesData = postReactionHandlers.getLikeDetails(item,userId),
          handler = postReactionHandlers.likeResourceHandler;
          console.log("likesData in provider opportunity: ",likesData);
          return (
          <OpportunityPost
            key={index}
            opportunity={item}
            userId={userId}
            onPressShare={() => handleOnPressShare(item)}
            likesData={likesData}
            handler={handler}
          />
          )}
        )}
    </View>
  );
}
