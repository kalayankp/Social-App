import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ClickableTextButton = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'orange',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default ClickableTextButton;
