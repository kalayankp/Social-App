import React from 'react';
import {View, Pressable} from 'react-native';
import IIcons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
const Back = () => {
  const navigation = useNavigation();
  function back() {
    navigation.navigate('BottomTabNavigation');
  }
  return (
    <View>
      <Pressable onPress={back}>
        <IIcons name="return-up-back" size={28} style={{marginRight: 12}} />
      </Pressable>
    </View>
  );
};
export default Back;
