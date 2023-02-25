import React from 'react';
import { Share } from 'react-native';
import { IconButton } from 'react-native-paper';

const ShareButton = ({ content }) => {
  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: content,
        url: 'https://example.com',
        title: 'Title of the content',
      });
      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };

  return (
    <IconButton
      icon="share-variant"
      onPress={shareContent}
    />
  );
};

export default ShareButton;