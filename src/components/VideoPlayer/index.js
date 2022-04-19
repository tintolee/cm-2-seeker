import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Muted, ShapePlay, Unmuted} from '../svg/icons';
import {VideoS3} from '../../components';
import InViewport from '../../components/InViewport';

export default function VideoPlayer({videoObj, ...props}) {
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);

  const refVideo = useRef(null);

  const pauseVideo = () => {
    if (refVideo.current) {
      setPaused(true);
      refVideo.current.seek(0);
    }
  };

  const playVideo = () => {
    if (refVideo.current) {
      setPaused(false);
    }
  };

  const handlePlaying = (isVisible) => {
    isVisible ? playVideo() : pauseVideo();
  };

  return (
    <InViewport onChange={handlePlaying}>
      <VideoS3
        ref={refVideo}
        videoObj={videoObj}
        rate={1.0}
        volume={1.0}
        muted={muted}
        paused={paused}
        resizeMode="cover"
        {...props}
      />
      {false && !paused && (
        <View style={styles.iconPlay}>
          <View style={[{...styles.iconContent, backgroundColor: 'white'}]}>
            <ShapePlay width={14} height={14} color={'#000'} />
          </View>
        </View>
      )}
      <TouchableWithoutFeedback onPress={() => setMuted(!muted)}>
        <View style={styles.iconMute}>
          <View style={styles.iconContent}>
            {muted ? (
              <Muted width={18} height={18} color={'#fff'} />
            ) : (
              <Unmuted width={18} height={18} color={'#fff'} />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </InViewport>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconPlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconMute: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  iconContent: {
    backgroundColor: 'black',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    padding: 4,
  },
});
