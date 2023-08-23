import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ContractForm = ({ onClose, onAddContract }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleAddContract = () => {
    if (title) {
      onAddContract({ title });
    //   onClose();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Contract</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#000" 
        autoCapitalize = {"characters"}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Contract Details"
        value={details}
        onChangeText={setDetails}
        placeholderTextColor="#000" 
      /> */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddContract}>
        <Text style={styles.addButtonText}>Add Contract</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color:'black'
  },
  addButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  cancelButtonText: {
    color: 'gray',
  },
});

export default ContractForm;
