import React, { useState } from 'react';
// import { Searchbar } from 'react-native-paper';
import { StyleSheet, View ,TouchableOpacity} from 'react-native';
import { Appbar, Searchbar, Button, Modal, Portal, TextInput ,IconButton} from 'react-native-paper';
import metrics from '../../contents/metrics';
import { Slider } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
const ReelSearchBar = () => {
  const [Mapvisible, setMapVisible] = useState(false);
  const showMap = () => setMapVisible(true);
  const hideMap = () => setMapVisible(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const onApply = () => {
    // You can do something with the selected min and max prices here
    console.log('Selected Min Price:', minPrice);
    console.log('Selected Max Price:', maxPrice);
    hideModal();
  };
  return (
    <>
    <View  style={{
      flex: 1,
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1000,
      elevation: 1000,
      marginTop: metrics.width / 10,
      marginLeft: metrics.width /2,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'white',
      padding: 1,
    }}>
      
   
    <Appbar.Action icon="trending-up" color='black' onPress={() => console.log('Recommended!')} />
    </View>
    
    <View  style={{
      flex: 1,
      // justifyContent: 'center',
      position: 'absolute',
      zIndex: 1000,
      elevation: 1000,
      marginTop: metrics.width / 10,
      marginLeft: metrics.width /1.5,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'white',
      padding: 1,
    }}>
     <Appbar.Action color='black' icon="filter" onPress={showModal} />
    
    </View>
    
    <View  style={{
      flex: 2,
    
      position: 'absolute',
      zIndex: 1000,
      elevation: 1000,
      marginTop: metrics.width / 10,
      marginLeft: metrics.width /1.2,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'white',
      // padding: 5,
    }}>
      
      <Appbar.Action
  icon="magnify"
  color="black"
  onPress={() => setSearchVisible(!searchVisible)}
/>
{/* <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    /> */}

    </View>
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
    ,
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    topView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      height: 100, // or any desired height
      justifyContent: 'center',
      alignItems: 'center',
    },
});


export default ReelSearchBar;