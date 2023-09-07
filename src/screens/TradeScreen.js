import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DraxProvider } from 'react-native-drax';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import DropArea from '../components/TradeComponents/DropArea';
import DraggableAssets from '../components/TradeComponents/DragableAssets';

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
    const { data, error } = await supabase
      .from('Post')
      .select('*')
      .eq('id', postID)
      .single()
    console.log(data)
    setAssets1([...Assets1, data])
  }
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
      } else {
        setTrade(data);
        // Fetch bundles for Trader1 and Trader2 here
        await fetchBundles(data.Trader2, setBundle);
        await fetchBundles(data.Trader1, setOthersBundle);
        await getasset(data.Assets1[0])
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching trade:', error);
    }
  };




  // const Trade = supabase.channel('custom-all-channel')
  //   .on(
  //     'postgres_changes',
  //     { event: '*', schema: 'public', table: 'Trade' },
  //     (payload) => {
  //       console.log('Change received!', payload)
  //     }
  //   )
  //   .subscribe()

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
  const addCardToTrade = (payload) => {
    console.log(`Received payload in parent component: ${JSON.stringify(payload)}`);
    
    if (payload.IdentityUUID === trade.Trader2) {
      const filteredAssets2 = Assets2.filter((item) => item.Id == payload.Id);
      setAssets2([payload, ...filteredAssets2]);
      console.log("Assets2:", Assets2);
    } 
    if ( (payload.IdentityUUID === trade.Trader1) ) {
      const filteredAssets1 = Assets1.filter((item) => item.Id == payload.Id);
      setAssets1([payload, ...filteredAssets1]);
      console.log("Assets1:", Assets1);
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
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
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
});

export default TradeScreen;
