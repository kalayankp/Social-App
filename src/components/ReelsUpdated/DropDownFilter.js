import React  from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

function DropDownFilter() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: profilePic }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
      <View>
        <Text style={{ fontWeight: 'bold' }}>{username}</Text>
        <TouchableOpacity onPress={toggleExpandCaption}>
          {renderCaption()}
          {!expanded && caption.length > MAX_CAPTION_LENGTH && <Text style={{ color: 'red' }}>...more</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DropDownFilter;