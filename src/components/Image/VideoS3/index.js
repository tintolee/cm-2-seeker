import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {Storage} from 'aws-amplify';

const VideoS3 = (props, ref) => {
  const [videoSource, setVideoSource] = useState(null);

  const {videoObj} = props;

  const getVideo = async ({key, bucket, region}) => {
    try {
      const videoURL = await Storage.get(key, {
        bucket: bucket,
        region: region,
      });
      setVideoSource({
        uri: videoURL,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (videoObj) {
      getVideo(videoObj);
    }
  }, [videoObj]);

  return (
    <View style={styles.container}>
      {videoSource && <Video ref={ref} source={videoSource} {...props} />}
    </View>
  );
};

const forwardedVideoS3 = React.forwardRef(VideoS3);

export default forwardedVideoS3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
