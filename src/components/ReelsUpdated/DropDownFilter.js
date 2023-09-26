import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function DropDownFilter({ onChangeFilter }) {
  const [selectedFilter, setSelectedFilter] = useState('Trending');

  const handleFilterChange = (itemValue) => {
    setSelectedFilter(itemValue);
    onChangeFilter(itemValue);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Filter by:</Text> */}
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedFilter}
          onValueChange={handleFilterChange}
        >
          <Picker.Item label="Trending" value="Trending" />
          <Picker.Item label="Latest" value="Latest" />
          <Picker.Item label="My Posts" value="MyPosts" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    // marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    // padding :10,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: 'white',
    overflow: 'hidden',

  },
  picker: {
    height: 10,
    // width: "50%" ,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default DropDownFilter;
