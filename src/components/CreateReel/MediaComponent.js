import React from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, Video } from 'react-native';

const MediaComponent = ({ media }) => {
  const { width, height } = Dimensions.get('window');

  if (media.type === 'video') {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: media.url }}
          style={styles.video}
          resizeMode="cover"
          controls={true}
        />
      </View>
    );
  } else if (media.type === 'image') {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {}}
      >
        <Image source={{ uri: media.url }} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default MediaComponent;
