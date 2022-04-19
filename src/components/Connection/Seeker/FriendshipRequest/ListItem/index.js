import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../../../form';
import ImageS3 from '../../../../Image/ImageS3';
import styles from './styles';

export default function ListItem({
  requester: item,
  id: friendshipRequestId,
  recipientId,
  requesterId,
  handleIgnoreFriendshipRequest,
  handleAcceptFriendshipRequest,
}) {
  const navigation = useNavigation();

  const handleSeekerOnPress = (id) => {
    navigation.navigate('SeekerProfile', {seekerId: id});
  };

  const handleIgnoreFriendshipRequestOnPress = (id) => {
    handleIgnoreFriendshipRequest(id);
  };

  const handleAcceptFriendshipRequestOnPress = (
    id,
    recipientId,
    requesterId,
  ) => {
    handleAcceptFriendshipRequest(id, recipientId, requesterId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarContainer}>
          {item.profilePic && (
            <ImageS3 imageObj={item.profilePic} style={styles.logo} />
          )}
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={styles.nameContainer}
          activeOpacity={0.5}
          onPress={() => handleSeekerOnPress(item.id)}>
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.removeButton}
            activeOpacity={0.5}
            onPress={() =>
              handleIgnoreFriendshipRequestOnPress(friendshipRequestId)
            }>
            <Text style={styles.removeButtonText}>Ignore</Text>
          </TouchableOpacity>
          <Button
            title="Accept"
            height={32}
            onPress={() =>
              handleAcceptFriendshipRequestOnPress(
                friendshipRequestId,
                recipientId,
                requesterId,
              )
            }
          />
        </View>
      </View>
    </View>
  );
}
