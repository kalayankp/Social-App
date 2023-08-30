import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';

const DropArea = ({ asset }) => {
  return (
    <View style={styles.container}>
      <DraxView
        style={styles.receiver}
        receivingStyle={styles.receiving}
        onReceiveDragDrop={(event) => {
          console.log("dragged", event.dragged.payload);
        }}
      >
        <Image
          source={{ uri: asset.Content[0].url }}  
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </DraxView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  receiver: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
  },
  receiving: {
    borderColor: 'purple',
  },
});

export default DropArea;
