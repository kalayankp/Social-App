import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import metrics from '../../contents/metrics';
// import {AppContext} from '../Context';
// import CommonStyle from '../Theme/CommonStyle';
// import {width} from '../Utils/Constant';
import {VolumeButton} from './AppButton';

const styles = StyleSheet.create({
  videoView: {
    width: metrics.width,
    opacity: 1,
  },
  videoOuter: {
    width: metrics.width,
    alignItems: 'center',
    justifyContent: 'center',
    // ...CommonStyle.center,
  },
});

const VideoComponent = ({post, isVisible, isNext, setIsMute, isMute}) => {
  // const {displayHeight} = useContext(AppContext);
  // const {isMute} = useContext(AppContext);
  const videoRef = useRef(null);
  const {url} = post;
  const {videoOuter, videoView} = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = error => {
    // Manage error here
  };

  return (
    <View style={[videoOuter, {height: metrics.height}]}>
      <Video
        // ref={videoRef}
        fullscreenAutorotate={true}
        source={url}
        autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, {height: metrics.height}]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch={'ignore'}
      />
      <VolumeButton onPress={setIsMute} isMute={isMute} />
    </View>
  );
};

export {VideoComponent};
