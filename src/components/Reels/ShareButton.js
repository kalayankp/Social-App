
import React from 'react';
import { View, Share, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ShareButton = ({ content }) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: content,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onShare}>
        <Icon name="share" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;