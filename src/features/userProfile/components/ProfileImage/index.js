import React from 'react';
import {Image, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {FilledPlusCircleFill} from '../../../../components/svg/icons';
import {theme} from '../../../../components/Theme';
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
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 500,
        cropping: false,
        mediaType: mediaType,
      }).then((image) => {
        console.log(image)
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
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : 
        <View style={styles.content}>
          <FilledPlusCircleFill
            width={30}
            height={30}
            color={theme.colors.primary}
          />
        </View>
        }
      </TouchableOpacity>
      <Text style={styles.placeholder}>{placeholder}</Text>
      {hasError && <Text style={styles.error}>{hasError}</Text>}
    </>
  );
}
