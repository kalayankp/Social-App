import React from 'react';
import { View, Text, Image } from 'react-native';

function User({ username, profilePic, caption }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: profilePic }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
      <View>
        <Text style={{ fontWeight: 'bold' }}>{username}</Text>
        <Text>{caption}</Text>
      </View>
    </View>
  );
}

export default User;
