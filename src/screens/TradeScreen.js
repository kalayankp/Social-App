import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DraxProvider } from 'react-native-drax';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import DropArea from '../components/TradeComponents/DropArea';
import DraggableAssets from '../components/TradeComponents/DragableAssets';
import { set } from 'react-native-reanimated';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

function TradeScreen() {
  const route = useRoute();
  const { id } = route.params;

  const [bundle, setBundle] = useState([]); // logged-in user bundle
  const [othersBundle, setOthersBundle] = useState([]); // other user's bundle
  const [isLoading, setIsLoading] = useState(true);
  const [trade, setTrade] = useState(null); // Initialize trade state as null

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);



  const [Assets1, setAssets1] = useState([]);
  const [Assets2, setAssets2] = useState([]);



  const getasset = async (postID) => {
    try {
      const { data, error } = await supabase
        .from('Post')
        .select('*')
        .eq('id', postID)
        .single();
      console.log('getasset data:', data); // Add this line to log the data
      return data;
    } catch (error) {
      console.error('Error fetching asset:', error);
      return null; // Return null in case of an error
    }
  };

  const fetchBundles = async (userId, setBundles) => {
    try {
      const { data, error } = await supabase
        .from('Post')
        .select('*')
        .eq('IdentityUUID', userId); // Query for user-specific bundles here

      if (error) {
        console.error(`Error fetching bundles for user ${userId}:`, error);
      } else {
        setBundles(data);
      }
    } catch (error) {
      console.error(`Error fetching bundles for user ${userId}:`, error);
    }
  };

  const fetchTrade = async (tradeId) => {
    try {
      const { data, error } = await supabase
        .from('Trade')
        .select('*')
        .eq('id', tradeId)
        .single();
      if (error) {
        console.error('Error fetching trade:', error);
        alert('Error fetching trade data. Please try again.');
      } else {
        setTrade(data);
        // Fetch bundles for Trader1 and Trader2 here
        await fetchBundles(data.Trader2, setBundle);
        await fetchBundles(data.Trader1, setOthersBundle);
        // Use Promise.all to fetch all assets1 in parallel if there are any
        if (data.Assets1 && data.Assets1.length > 0) {
          const asset1Promises = data.Assets1.map((assetId) => getasset(assetId));
          const asset1Data = await Promise.all(asset1Promises);
          setAssets1(asset1Data);
        } else {
          setAssets1([]); // Set an empty array when there are no assets
        }
  
        // Use Promise.all to fetch all assets2 in parallel if there are any
        if (data.Assets2 && data.Assets2.length > 0) {
          const asset2Promises = data.Assets2.map((assetId) => getasset(assetId));
          const asset2Data = await Promise.all(asset2Promises);
          setAssets2(asset2Data);
        } else {
          setAssets2([]); // Set an empty array when there are no assets
        }
  
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching trade:', error);
    }
  };
  
  




  supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'Trade' },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()


  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTrade(id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  
  }, [id]);


  const updateTrade = async (asset, id) => {
    try {
      if (asset === 'Assets2') {
        let filteredAssets2 ;
        if (trade.Assets2 ==  null){
          filteredAssets2 = [id]
        }else{
         filteredAssets2 = trade.Assets2.filter((itemId) => itemId !== id);
        }
        const { data, error } = await supabase
          .from('Trade') 
          .update({
            Assets2: filteredAssets2, // Update the field in the Trade table
          })
          .eq('id', trade.id)
          .single();
        console.log("data from trade update ==>", data);
      } else {
        let filteredAssets1;
        if(trade.Assets1 ==  null ){
          filteredAssets1 = [id]
        }else{
          filteredAssets1 = trade.Assets1.filter((itemId) => itemId !== id);
        }
     
        const { data, error } = await supabase
          .from('Trade') // Use the correct table name
          .update({
            Assets1: filteredAssets1, // Update the field in the Trade table
          })
          .eq('id', trade.id)
          .single();
        console.log("data from trade update ==>", data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addCardToTrade = (payload) => {
    console.log(`Received payload in parent component: ${JSON.stringify(payload)}`);
  
    if (payload.IdentityUUID === trade.Trader2) {
      console.log('trade2');
      const filteredAssets2 = Assets2.filter((item) => item.Id !== payload.Id);
      setAssets2([payload, ...filteredAssets2]);
      updateTrade('Assets2',payload.id);
    } 
    if (payload.IdentityUUID === trade.Trader1) {
      console.log('trade1');
      const filteredAssets1 = Assets1.filter((item) => item.Id !== payload.Id);
      setAssets1([payload, ...filteredAssets1]);
      updateTrade('Assets1',payload.id);
    }
  };


  return (
    <DraxProvider>
      {isLoading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="black" />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Information</Text>
          <View style={styles.topContainer}>
            <View style={!isEnabled ? styles.verticalCardContainer : styles.blurredCardContainer}>
              {/* asset 2  : from trader2   who started the trade*/}
              <DropArea asset={Assets2} addCardToTrade={addCardToTrade} isEnabled={!isEnabled} />
            </View>
            <View style={isEnabled ? styles.verticalCardContainer : styles.blurredCardContainer} >
              {/* assets1 :  trader1  who posted the selling card */}
              <DropArea asset={Assets1} addCardToTrade={addCardToTrade} isEnabled={isEnabled} />
            </View>
          </View>
          <View style={styles.toggleButtonContainer}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <TouchableOpacity
              style={styles.acceptTradeButton}
              onPress={() => {
                // Handle the "Accept Trade" button click event here
                console.log('Accept Trade button clicked!');
              }}
            >
              <Text style={styles.acceptTradeButtonText}>Accept Trade</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scrollViewContainer}>
            <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>


              {/* isEnables  ===  True than show bundel of loged in user */}
              {isEnabled ? (
                othersBundle.map((item) => (
                  <View style={styles.smallCardContainer} key={item.id}>
                    <DraggableAssets data={item} />
                  </View>
                ))
              ) : (
                bundle.map((item) => (
                  <View style={styles.smallCardContainer} key={item.id}>
                    <DraggableAssets data={item} />
                  </View>
                ))
              )}
            </ScrollView>
          </View>
          <View style={styles.additionalContainer}></View>
        </View>
      )}
    </DraxProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  verticalCardContainer: {
    borderColor: 'black',
    padding: 10,
    width: ScreenWidth / 2 - 10,
    height: ScreenHeight / 2 + 100,
    margin: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  smallCardContainer: {
    padding: 5,
    marginHorizontal: 5,
    width: ScreenWidth / 3,
    height: ScreenHeight / 5,
  },
  horizontalScroll: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 40
  },
  loadingIndicator: {
    marginTop: 20,
  },
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  receiver: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  blurredCardContainer: {
    borderColor: 'black',
    padding: 10,
    width: ScreenWidth / 2 - 10,
    height: ScreenHeight / 2 + 100,
    margin: 5,
    opacity: 0.5, // Adjust the opacity value as needed for your desired level of blur
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  acceptTradeButton: {
    backgroundColor: 'orange', // Change the background color as desired
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  acceptTradeButtonText: {
    color: 'white', // Change the text color as desired
    fontWeight: 'bold',
  },
});

export default TradeScreen;
