import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Video from 'react-native-video';

const VideoScreen = ({ route }) => {
  const { media } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Video
        source={{ uri: media.path }}
        controls
        resizeMode="contain" // Use resizeMode property to fit the video within the dimensions while maintaining aspect ratio
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      />
      <Text>{media.mime}</Text>
    </View>
  );
};

export default VideoScreen;
