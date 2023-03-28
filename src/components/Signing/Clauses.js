import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from "react-native";

const Clause = ({ clause, index, isEditing,handleclauseEdit, handleSave, handleClauseChange}) => {
  const myImage = require("../../asset/Assets/Icons/editButton.png");
  const [isEditingClause, setIsEditingClause] = React.useState(false);
  const [clauseText, setClauseText] = React.useState(clause);
  const [wordCount, setWordCount] = React.useState(clause.trim().split(/\s+/).length);

  const handleEditClause = () => {
    setIsEditingClause(true);
    handleclauseEdit(true)
  };

  const handleSaveClause = () => {
    setIsEditingClause(false);
    handleSave(false)
    // Here you can handle the logic to save the changes made to the clause
  };

  const handleTextChange = (text) => {
    setClauseText(text);
    const words = text.trim().split(/\s+/);
    setWordCount(words.length);
    handleClauseChange(index, text); // Call the callback function and pass the index and text as arguments
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isEditingClause ? (
          <TextInput
            style={styles.titleInput }
            value={clauseText}
            onChangeText={handleTextChange}
             multiline={true}
             numberOfLines={4}
          />
        ) : (
          <Text style={styles.title}>{clauseText}</Text>
        )}

        {isEditingClause ? (
          <TouchableOpacity style={styles.editButton} onPress={handleSaveClause}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEditClause}>
            {/* <Text style={styles.editButtonText}>Edit</Text> */}
            <Image source={myImage} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.wordCount}>{wordCount}/100 words</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    margin  : 4,
    borderRadius: 20,

  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    // backgroundColor: "#fff",
  },

  titleInput: {
    fontSize: 20,
  fontWeight: "bold",
  color: "#000",
  borderBottomWidth: 1,
  borderBottomColor: "black",
  width: "80%",
  marginVertical: 1, // Adjusted margin top
  marginHorizontal: 10,
  paddingVertical: 1, // Adjusted padding top
    paddingHorizontal: 10,
  },

  editButton: {
    color: "#FF6666",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#FF6666",
    padding: 10,
  },
  wordCount: {
    alignSelf: "flex-end",
    paddingRight: 20,
    paddingTop: 5,
    fontSize: 14,
    color: "#888",
  },
  
});

export default Clause;
