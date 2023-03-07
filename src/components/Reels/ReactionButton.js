import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ReactionButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} >
      <Icon name={icon} type="font-awesome" size={20} />
    </TouchableOpacity>
  );
};

export default ReactionButton;