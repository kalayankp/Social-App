import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';

const DropArea = () => {
  return (
    <DraxView
      draggable
      payload="IMAGE"
      style={styles.dropArea}
    >
      <View style={styles.rectangle}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1564910443496-5fd2d76b47fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </DraxView>
  );
};

const styles = StyleSheet.create({
  dropArea: {
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default DropArea;