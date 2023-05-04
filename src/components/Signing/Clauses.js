import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from "react-native";

const Clause = (props) => {
  const myImage = require("../../asset/Assets/Icons/editButton.png");
  const [isEditingClause, setIsEditingClause] = React.useState(false);
  const [clauseText, setClauseText] = React.useState(props.clause);
  const [wordCount, setWordCount] = React.useState(props.clause.trim().split(/\s+/).length);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isEditingClause ? (
          <TextInput
            style={styles.titleInput }
            value={clauseText}
            onChangeText={(text) => {
              setClauseText(text);
              setWordCount(text.trim().split(/\s+/).length);
            }
            }
             multiline={true}
             numberOfLines={4}
          />
        ) : (
          <Text style={styles.title}>{clauseText}</Text>
        )}

        {isEditingClause ? (
          <TouchableOpacity style={styles.editButton} 
          onPress={() => {
            setIsEditingClause(false);
            props.saveClause(props.index, clauseText, false);
          }}
          >
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} 
          onPress={() => {
            setIsEditingClause(true);
            props.editClause(props.index, clauseText, true);

          }}
          >
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
    width: "80%",
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
