import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

const Clause = (props) => {


  const { clause, index, editClause, isEditing } = props

  return (
    <View style={styles.container}>


      <View style={styles.titleContainer}>

        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={clause}
            onChangeText={(text) => editClause(index, text)}
          />
        ) : (
          <Text style={styles.title}>{clause}</Text>
        )}


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    margin: 4,
    borderRadius: 20,
  },

  titleContainer: {
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
