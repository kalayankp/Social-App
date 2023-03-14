import React, { useState } from 'react';
import { View, Text, TextInput, Button, CheckBox } from 'react-native';

const CreateCardScreen = () => {
  // State variables for card information
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardImage, setCardImage] = useState('');

  // State variables for clauses
  const [clauses, setClauses] = useState([]);
  const [newClause, setNewClause] = useState('');

  // Function to handle adding a new clause
  const handleAddClause = () => {
    setClauses([...clauses, newClause]);
    setNewClause('');
  };

  // Function to handle saving the card as a draft
  const handleSaveAsDraft = () => {
    // Save card data to database
    // Navigate to dashboard screen
  };

  // Function to handle publishing the card
  const handlePublish = () => {
    // Save card data to database
    // Navigate to dashboard screen
  };

  return (
    <View>
      <Text>Card Information</Text>
      <TextInput
        placeholder="Card Name"
        value={cardName}
        onChangeText={(text) => setCardName(text)}
      />
      <TextInput
        placeholder="Card Description"
        value={cardDescription}
        onChangeText={(text) => setCardDescription(text)}
      />
      <TextInput
        placeholder="Card Image"
        value={cardImage}
        onChangeText={(text) => setCardImage(text)}
      />

      <Text>Clauses</Text>
      <View>
        <TextInput
          placeholder="Enter new clause"
          value={newClause}
          onChangeText={(text) => setNewClause(text)}
        />
        <Button title="Add Clause" onPress={handleAddClause} />
      </View>
      {clauses.map((clause, index) => (
        <View key={index}>
          <CheckBox />
          <Text>{clause}</Text>
        </View>
      ))}

      <View>
        <Button title="Save as Draft" onPress={handleSaveAsDraft} />
        <Button title="Publish" onPress={handlePublish} />
      </View>
    </View>
  );
};

export default CreateCardScreen;