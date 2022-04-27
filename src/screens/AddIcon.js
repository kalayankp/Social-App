import React from 'react';
import FIcon from 'react-native-vector-icons/Feather';
import {StyleSheet, View} from 'react-native';

export const AddIcon = () => {
  return (
    <View style={styles.addIcon}>
      <FIcon name="plus" size={40} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#f5f5f5',
    backgroundColor: '#5851bc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
