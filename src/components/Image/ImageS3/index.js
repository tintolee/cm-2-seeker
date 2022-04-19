import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Storage} from 'aws-amplify';
import { theme } from '../../Theme';

function ImageS3({imageObj, ...props}) {
  const [imageSource, setImageSource] = useState(null);

  const getImage = async ({key, bucket, region}) => {
    try {
      const imageURL = await Storage.get(key, {
        bucket: bucket,
        region: region,
      });

      setImageSource({
        uri: imageURL,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (imageObj) {
      getImage(imageObj);
    }
    // return () => {
    //   setImageSource(null);
    // };
  }, [imageObj]);

  return (
    <View {...props}>
      <View style={styles.container}>
        {imageSource && <Image source={imageSource} {...props} />}
      </View>
    </View>
  );
}

export default ImageS3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
