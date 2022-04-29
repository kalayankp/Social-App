import React from 'react';
import {View, Image} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
const LeftIcons = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <Icons.Button
        onPress={openDrawer}
        backgroundColor="white"
        color="#8d8d8d"
        style={{marginLeft: 10}}
        name="bars"
        size={20}
        light
      />
      <Image source={require('../asset/images/logo.png')} />
    </View>
  );
};
export default LeftIcons;
