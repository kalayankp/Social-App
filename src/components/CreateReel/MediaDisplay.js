import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MediaDisplay = ({ selectedMedia, openMediaPicker }) => {
  const renderMedia = () => {
    if (selectedMedia.length === 0) {
      return (
        <View style={styles.noMediaContainer}>
          <TouchableOpacity onPress={openMediaPicker}>
            <Icon raised reverse name="upload" type="font-awesome" color="#FFA500" />
          </TouchableOpacity>
          <Text style={styles.noMediaText}>Select images/videos</Text>
        </View>
      );
    }
    return (
      <ScrollView horizontal>
        {selectedMedia.map((media, index) => (
          <View key={index} style={styles.mediaContainer}>
            {media.mime.match('image/') ? (
              <Image source={{ uri: media.path }} style={styles.image} />
            ) : (
              <Video
                style={styles.video}
                source={{ uri: media.path }}
                resizeMode="contain"
                controls
              />
            )}
            <Text style={styles.mediaIndex}>{index + 1}/{selectedMedia.length}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return <View style={styles.container}>{renderMedia()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    marginRight: 10,
  },
  image: {
    width: screenWidth,
    height: screenHeight * 2 / 3,
  },
  video: {
    width: screenWidth,
    height: screenHeight * 2 / 3,
  },
  noMediaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight * 1 / 4,
  },
  noMediaText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
  },
  mediaIndex: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MediaDisplay;
