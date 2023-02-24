import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Button, Modal, Portal, TextInput ,Slider} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = () => {

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onApply = () => {
    // You can do something with the selected min and max prices here
    console.log('Selected Min Price:', minPrice);
    console.log('Selected Max Price:', maxPrice);
    hideModal();
  };
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
    <Appbar.Header backgroundColor="#FFFFFF">
             <Appbar.Action icon="filter" onPress={showModal} />

         {/* <Appbar.Action icon={() => <MaterialCommunityIcons name="filter" size={24} />} onPress={() => <PriceFilter/>} /> */}
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      {/* <PriceFilter /> */}
    </Appbar.Header>
<Portal>
<Modal visible={visible} onDismiss={hideModal}>
 <View style={styles.modalContainer}>
 {/* <Slider
    style={styles.slider}
    minimumValue={0}
    maximumValue={100}
    value={minPrice}
    onValueChange={(value) => setMinPrice(value)}
  /> */}
  <TextInput
    style={styles.textInput}
    label="Min Price"
    value={String(minPrice)}
    keyboardType="numeric"
    onChangeText={(text) => setMinPrice(Number(text))}
  />
  {/* <Slider
    style={styles.slider}
    minimumValue={0}
    maximumValue={100}
    value={maxPrice}
    onValueChange={(value) => setMaxPrice(value)}
  /> */}
  <TextInput
    style={styles.textInput}
    label="Max Price"
    value={String(maxPrice)}
    keyboardType="numeric"
    onChangeText={(text) => setMaxPrice(Number(text))}
  />
  <Button mode="contained" onPress={onApply}>
    Apply
  </Button>
</View> 
</Modal>
</Portal>
</>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10,
  },
});

export default Header;