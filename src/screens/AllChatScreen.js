import React from 'react';
import {View, Text, Pressable} from 'react-native';
import MainHeader from '../components/MainHeader';
import Back from '../components/Back';
const AllChatScreen = ({navigation}) => {
  return (
    <View>
      <MainHeader title="All Chats" rightComponent={Back} />
    </View>
  );
};
export default AllChatScreen;
