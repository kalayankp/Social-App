import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { DraxView } from "react-native-drax";
import Video from "react-native-video";

const DraggableAssets = ({ data }) => {
  const { Content, Description, id } = data;
  const renderContent = (Content, Description, id) => {
    if (Content == null || Content.length === 0) {
      return <Text style={styles.textContent}>{Description}</Text>; // Return the Text component here
    } else {
      if (Content[0].mimetype === "img") {
        return <Image source={{ uri: Content[0].url }} style={styles.contentImage}  />;
      } else {
        return <Video source={{ uri: Content[0].url }} style={styles.contentVideo} resizeMode="cover" />;
      }
    }
  };
  return (
    <DraxView
      style={[styles.centeredContent, styles.draggableBox]}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      hoverDraggingStyle={styles.hoverDragging}
      dragPayload={id} 
      longPressDelay={0}
    >
      {renderContent(Content, Description, id)}
    </DraxView>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  draggableBox: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    border:1
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: "green",
    borderWidth: 2,
  },
  contentImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  contentVideo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContent: {
    color: "black",
    textAlign: "center",
  },
});

export default DraggableAssets;
