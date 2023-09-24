import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputBox = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = (text) => {
    setInputValue(text);

    // Extract the mentioned names and hashtags from the text
    const mentionedNames = text.match(/@(\w+)/g);
    const mentionedHashtags = text.match(/#(\w+)/g);

    // Update the input text by replacing mentioned names and hashtags with styled text
    let updatedText = text;
    if (mentionedNames) {

      mentionedNames.forEach((name) => {
        updatedText = updatedText.replace(
          name,
          `<span style="color: blue;">${name}</span>`
        );
      });
    }
    if (mentionedHashtags) {

      mentionedHashtags.forEach((tag) => {
        updatedText = updatedText.replace(
          tag,
          `<span style="color: blue;">${tag}</span>`
        );
      });
    }

    onInputChange(text);
    setInputValue(text)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.descriptionInput}
        value={inputValue}
        onChangeText={handleTextChange}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="black"


      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '90%',
  },
  descriptionInput: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    color: '#000000',
    textAlignVertical: 'top',

  },
});

export default InputBox;