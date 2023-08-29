import React, { useEffect   , useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image ,ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DraxProvider, DraxView } from 'react-native-drax';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import DropArea from '../components/TradeComponents/DropArea';
function TradeScreen() {
  const route = useRoute();
  const { id } = route.params;



  const [Assets1, setAssets1] = useState([]);
  const [Assets2, setAssets2] = useState([]);

  const [trader1, settrader1] = useState();
  const [trader2, settrader2] = useState();

  const [isLoading, setIsLoading] = useState(true);



const getTrader1 = async () => {
    try {
      const user = await AsyncStorage.getItem('user_info');
      const { id } = JSON.parse(user);
      // console.log("trader2 ======> ",id);
      settrader2(id);

    } catch (error) {
      alert(error.message);
    }
  };



  const getTrader2Assets = async (id) => {
    try {
      const { data, error } = await supabase
        .from('Post') 
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      console.log(data);
      settrader1(data.IdentityUUID);
      // console.log("trader1 ======> ", data.IdentityUUID);
      setAssets1(data);
    } catch (error) {
      alert(error.message);
    }
  };


  
  useEffect(() => {
    const fetchData = async () => {
      await getTrader2Assets(id);
      await getTrader1();
      setIsLoading(false);
    };
  
    fetchData();
  }, []);


  return (
    <DraxProvider>
      {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" color="black" />
        ) :(
    <View style={styles.container}>
    
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold' , color:"black"}}>Information </Text>
        </View>
       
      <View style={styles.topContainer}>
        <View style={styles.verticalCardContainer}>
          <Text style={styles.cardText}>Card 1</Text>
          {Assets1.Content && Assets1.Content.length > 0 && (
             <DraxView
             style={styles.receiver}
             receivingStyle={styles.receiving}
             onReceiveDragDrop={(event) => {
                console.log("dragged" , event.dragged.payload);
             }}
         >
            <Image
              source={{ uri: Assets1.Content[0].url }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            </DraxView>

       
          )}
        </View>
        <View style={styles.verticalCardContainer}>
          <Text style={styles.cardText}>Card 2</Text>
        </View>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>
        <View style={styles.smallCardContainer}>
        <DropArea />
        </View>
        <View style={styles.smallCardContainer}>
          <Text style={styles.smallCardText}>Small Card 2</Text>
        </View>
        <View style={styles.smallCardContainer}>
          <Text style={styles.smallCardText}>Small Card 2</Text>
        </View>
        <View style={styles.smallCardContainer}>
          <Text style={styles.smallCardText}>Small Card 2</Text>
        </View>
        {/* Add more small cards here */}
      </ScrollView>
      <View style={styles.container}>
    </View>
    </View>)}
    </DraxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row', 
    marginTop: 20,
  },
  verticalCardContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    width: ScreenWidth / 2 - 10,
    height: ScreenHeight / 2,
    margin: 5
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  smallCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    width: ScreenWidth/3,
    height: ScreenHeight / 5,
  },
  smallCardText: {
    fontSize: 14,
  },
  horizontalScroll: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
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
});

export default TradeScreen;
