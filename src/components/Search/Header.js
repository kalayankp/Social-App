import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Button, Modal, Portal, TextInput ,Slider , Title} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
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
  const [Mapvisible, setMapVisible] = useState(false);
  const showMap = () => setMapVisible(true);
  const hideMap = () => setMapVisible(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
    <Appbar.Header backgroundColor="#FFFFFF">
             <Appbar.Action icon="filter" onPress={showModal} />
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
    </Appbar.Header>
    <Appbar >
      
      <Button icon="thumb-up-outline" mode="outlined" style={{fontsize : "2px"}} onPress={() => console.log('Recommended!')}>
        Recommend
      </Button>
      <Button icon="heart-outline"  mode="outlined" onPress={() => console.log('Hot topics!')}>
        Hot
      </Button>
      <Button icon="map-outline"  mode="outlined" small onPress={showMap}>
        nearby
      </Button>
    </Appbar>
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


<Portal>
<Modal visible={Mapvisible} onDismiss={hideMap}>
 <View style={styles.modalContainer}>
 <View style={{flex: 1, marginTop: 20}}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
          style={styles.mapStyle}
          zoomEnabled={true}
          initialRegion={{
            latitude: 22.258,
            longitude: 71.19,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
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