import {View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
const RightIcons = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Icon
        style={{
          paddingRight: 5,
          marginRight: 10,
          //  marginTop: 2
        }}
        name="bell"
        size={20}
        light
      />
      <Icon
        style={{
          paddingRight: 7,
          // marginTop: 2,
        }}
        name="heart"
        size={20}
        light
      />
      <Icon
        style={{
          paddingRight: 10,
          marginLeft: 10,
          // marginTop: 2
        }}
        name="comment"
        size={20}
        light
      />
    </View>
  );
};
export default RightIcons;
