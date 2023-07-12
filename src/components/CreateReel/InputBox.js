import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
const InputBox = ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = (text) => {
    setInputValue(text);
    onInputChange(text); // Invoke the callback function
  };

  const renderColoredText = (text) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      let wordStyle = null;

      if (word.startsWith('@')) {
        wordStyle = styles.mentionText;
      } else if (word.startsWith('#')) {
        wordStyle = styles.hashtagText;
      } else if (word.startsWith('http')) {
        wordStyle = styles.linkText;
      }

      return (
        <Text key={index} style={wordStyle}>
          {word + ' '}
        </Text>
      );
    });
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
      >
        {renderColoredText(inputValue)}
      </TextInput>
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
  mentionText: {
    color: 'blue',
  },
  hashtagText: {
    color: 'green',
  },
  linkText: {
    color: 'purple',
  },
});

export default InputBox;
