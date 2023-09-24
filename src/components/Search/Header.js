import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Searchbar, Button, Modal, Portal, TextInput , Title} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Slider} from  "react-native-elements"

const Header = () => {

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onApply = () => {
    // You can do something with the selected min and max prices here
  
    hideModal();
  };
  const [Mapvisible, setMapVisible] = useState(false);
  const showMap = () => setMapVisible(true);
  const hideMap = () => setMapVisible(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
    <Appbar.Header >
             <Appbar.Action icon="filter" onPress={showModal} />
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
    </Appbar.Header>
    <Appbar >
      
      <Button icon="trending-up" mode="outlined" style={{fontsize : "2px"}} onPress={() => console.log('Recommended!')}>
       
      </Button>
      <Button icon="heart-outline"  mode="outlined" onPress={() => console.log('Hot topics!')}>
      Hot
      </Button>
      <Button icon="map-outline"  mode="outlined" small onPress={showMap}>
        Nearby
      </Button>
    </Appbar>
<Portal>
<Modal visible={visible} onDismiss={hideModal}>
 <View style={styles.modalContainer}>
 <Slider
    style={styles.slider}
    minimumValue={0}
    maximumValue={100}
    value={minPrice}
    onValueChange={(value) => setMinPrice(value)}
    thumbStyle={styles.thumbStyle}
        thumbTintColor='#ffffff'
        minimumTrackTintColor='#0000ff'
        maximumTrackTintColor='#cccccc'
  />

  <TextInput
    style={styles.textInput}
    label="Min Price"
    value={String(minPrice)}
    keyboardType="numeric"
    onChangeText={(text) => setMinPrice(Number(text))}
  />
  <Slider
    style={styles.slider}
    minimumValue={0}
    maximumValue={100}
    value={maxPrice}
    onValueChange={(value) => setMaxPrice(value)}
    thumbStyle={styles.thumbStyle}
        thumbTintColor='#ffffff'
        minimumTrackTintColor='#0000ff'
        maximumTrackTintColor='#cccccc'
        
  />
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
  Appbar:{
    backgroundColor:"white"
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderRadius: 20,
  },
  textInput: {
    marginBottom: 10,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0000ff',
    borderWidth: 2,
    borderColor: '#ffffff',}
});


export default Header;