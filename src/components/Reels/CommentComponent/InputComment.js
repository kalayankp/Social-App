import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const InputComment = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput style={styles.input} placeholder="Add a comment..." />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 50,
    padding: 10,
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#EC4D36",
    fontSize: 16,
  },
});

export default InputComment;
