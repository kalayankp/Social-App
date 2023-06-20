import React, { useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';

function User({ username, profilePic, caption }) {
  const MAX_CAPTION_LENGTH = 20; // Maximum number of characters for the limited caption
  const EXPANDED_CAPTION_LENGTH = caption.length; // Length of the full caption

  const [expanded, setExpanded] = useState(false);

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const toggleExpandCaption = () => {
    setExpanded(!expanded);
  };

  const renderCaption = () => {
    const displayCaption = expanded ? caption : caption.substring(0, MAX_CAPTION_LENGTH);

    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = displayCaption.match(urlRegex);

    if (!matches) {
      return <Text>{displayCaption}</Text>;
    }

    const parts = displayCaption.split(urlRegex);
    return (
      <Text>
        {parts.map((part, index) => {
          if (matches.includes(part)) {
            return (
              <Text
                key={index}
                style={{ color: 'white', textDecorationLine: 'underline' }}
                onPress={() => handleLinkPress(part)}
              >
                {part}
              </Text>
            );
          }

          return part;
        })}
      </Text>
    );
  };

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

export default User;