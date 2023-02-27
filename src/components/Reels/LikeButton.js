import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(!liked);
  };

  return (
    <IconButton
      icon={liked ? 'heart' : 'heart-outline'}
      color={liked ? 'red' : 'black'}
      onPress={handlePress}
    />
  );
};

export default LikeButton;
