import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditComment = ({ commentText, onCancel, onSave }) => {
  const [text, setText] = useState(commentText);

  const handleSave = () => {
    onSave(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline={true}
        autoFocus={true}
      />
      <View style={styles.buttons}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EditComment;