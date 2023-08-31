import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

const Clause = (props) => {
  const [wordCount, setWordCount] = React.useState(props.clause.trim().split(/\s+/).length);

  return (
    <View style={styles.container}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.clause}</Text>
      </View>
      {/* <Text style={styles.wordCount}>{wordCount}/100 words</Text> */}
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
