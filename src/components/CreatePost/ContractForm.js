import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ContractForm = ({ onClose, onAddContract }) => {
  const [title, setTitle] = useState('');
  const [clauses, setClauses] = useState([]);
  const [clauseText, setClauseText] = useState('');
  const [editingClauses, setEditingClauses] = useState([]);

  const handleAddContract = () => {

    if (title && clauses.length > 0) {
      onAddContract(title, clauses);
    } else {
      alert('Please provide a title and at least one clause.');
    }
  };

  const handleAddClause = () => {
    if (clauseText) {
      setClauses([...clauses, clauseText]);
      setEditingClauses([...editingClauses, false]);
      setClauseText('');
    }
  };

  const handleEditClause = (index, text) => {
    const updatedClauses = [...clauses];
    updatedClauses[index] = text;
    setClauses(updatedClauses);
  };

  const toggleEditClause = (index) => {
    const updatedEditingClauses = [...editingClauses];
    updatedEditingClauses[index] = !updatedEditingClauses[index];
    setEditingClauses(updatedEditingClauses);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Contract</Text>
      <TextInput
        style={styles.input}
        placeholder="ENTER CONTRACT TITLE"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
        autoCapitalize="characters"
      />
      <ScrollView style={styles.clausesContainer}>
        {clauses.map((clause, index) => (
          <View key={index} style={styles.clauseContainer}>
            {editingClauses[index] ? (
              <TextInput
                style={styles.editClauseInput}
                value={clause}
                onChangeText={(text) => handleEditClause(index, text)}
              />
            ) : (
              <Text style={styles.clauseText}>
                {index + 1}. {clause}
              </Text>
            )}
            <TouchableOpacity onPress={() => toggleEditClause(index)}>
              <Text style={styles.editButtonText}>
                {editingClauses[index] ?
                  <AntDesign
                    name='check'
                    color='orange'
                    size={24}
                  /> :

                  <AntDesign
                    name='edit'
                    color='orange'
                    size={24}
                  />}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="ADD A NEW CLAUSE"
        value={clauseText}
        onChangeText={setClauseText}
        placeholderTextColor="#999"
        autoCapitalize="characters"
        multiline={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddClause}>
        <Text style={styles.addButtonText}>Add Clause</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleAddContract}>
          <Text style={styles.buttonText}>Add Contract</Text>
        </TouchableOpacity>
      </View>
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
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
  },
  clausesContainer: {
    maxHeight: 150,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clauseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  editClauseInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    color: 'black',
  },
  clauseText: {
    marginBottom: 5,
    color: 'black',
  },
  editButtonText: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default ContractForm;
