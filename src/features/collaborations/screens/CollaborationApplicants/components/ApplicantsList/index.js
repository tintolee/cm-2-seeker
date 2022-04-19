import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {collaborationStatus} from '../../../../../../utils/constants';
import {Button} from '../../../../../../components/form';
import ImageS3 from '../../../../../../components/Image/ImageS3';
import styles from './styles';

export default function ApplicantsList({applicants, applicantActionOnPress}) {
  const navigation = useNavigation();

  const Applicants = ({id, seeker, status}) => {
    // 1:Registered, 2:Invited, 3:Applied, 4:Unsuccessful

    return (
      <View style={styles.rowContainer}>
        <View style={styles.left}>
          <View style={styles.avatarContainer}>
            {seeker?.profilePic && (
              <ImageS3 imageObj={seeker?.profilePic} style={styles.logo} />
            )}
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.nameContainer}
            onPress={() =>
              navigation.navigate('SeekerProfile', {seekerId: seeker?.id})
            }>
            <Text style={styles.name}>
              {seeker?.firstName} {seeker?.lastName}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonsContainer}>
            {status === 1 && (
              <Text style={styles.removeButtonText}>Accepted</Text>
            )}
            {status === 2 && (
              <Text style={styles.removeButtonText}>Invited</Text>
            )}
            {status === 3 && (
              <>
                <TouchableOpacity
                  style={styles.removeButton}
                  activeOpacity={0.5}
                  onPress={() =>
                    applicantActionOnPress(id, collaborationStatus.unsuccessful)
                  }>
                  <Text style={styles.removeButtonText}>Ignore</Text>
                </TouchableOpacity>

                <Button
                  title="Accept"
                  height={32}
                  onPress={() =>
                    applicantActionOnPress(id, collaborationStatus.registered)
                  }
                />
              </>
            )}
            {status === 4 && (
              <Text style={styles.removeButtonText}>Rejected</Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={applicants}
      style={styles.list}
      renderItem={({item}) => <Applicants {...item} />}
      keyExtractor={({id}) => id.toString()}
    />
  );
}
