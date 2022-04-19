import React from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import {FilledPlusCircleFill} from '../../../components/svg/icons';
import {ImageS3, VideoS3} from '../../index';
import {theme} from '../../Theme';
import styles from './styles';

export default function ImagePickerField({
  fieldTitle,
  placeholder,
  imageUrl,
  setImageUrl,
  hasError,
  mediaType = 'photo',
}) {
  const handleChoosePhoto = async () => {
    // const result = await launchCamera({},()=>{});
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 500,
        cropping: false,
        mediaType: mediaType,
        duration: 600,
      }).then((image) => {
        setImageUrl(image.path);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text style={styles.title}>{fieldTitle}</Text>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={handleChoosePhoto}>
        {imageUrl && mediaType === 'photo' ? (
          imageUrl?.key ? (
            <ImageS3 imageObj={imageUrl} style={styles.image} />
          ) : (
            <Image style={styles.image} source={{uri: `file://${imageUrl}`}} />
          )
        ) : imageUrl && mediaType === 'video' ? (
          imageUrl?.key ? (
            <VideoS3 videoObj={imageUrl} style={styles.image} />
          ) : (
            <Video style={styles.image} source={{uri: `file://${imageUrl}`}} />
          )
        ) : (
          <View style={styles.content}>
            <FilledPlusCircleFill
              width={30}
              height={30}
              color={theme.colors.primary}
            />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.placeholder}>{placeholder}</Text>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
