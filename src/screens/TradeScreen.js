import React, { useEffect   , useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image ,ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DraxProvider, DraxView } from 'react-native-drax';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../utils/supabase';
import DropArea from '../components/TradeComponents/DropArea';
import DraggableAssets from '../components/TradeComponents/DragableAssets';
function TradeScreen() {
  const route = useRoute();
  const { id } = route.params;



  const [Assets1, setAssets1] = useState([]);
  const [Assets2, setAssets2] = useState([]);




  const [bundle, setBundle] = useState([]); //loged in user cards




  const [trader1, settrader1] = useState(); //loged in user id
  const [trader2, settrader2] = useState(); // whose card is selected



  const [isLoading, setIsLoading] = useState(true);



const getTrader1 = async () => {
    try {
      const user = await AsyncStorage.getItem('user_info');
      const { id } = JSON.parse(user);
      settrader2(id);

      const { data, error } = await supabase
        .from('Post')
        .select('*')
        .eq('IdentityUUID', id)

      if (error) throw error;
      console.log('bundel ==>',data);
      setBundle(data);
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
  }, [id]);


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
          
          {Assets1.Content && Assets1.Content.length > 0 && (
             <DropArea asset = {Assets1}/>
          )}
        </View>
        <View style={styles.verticalCardContainer}>
          <Text style={styles.cardText}> + </Text>
        </View>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.horizontalScroll}>

      {bundle.map(item => (
       <View style={styles.smallCardContainer} key={item.id}>
        <DraggableAssets  data={item}/>
     </View>
        ))}
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
    // borderWidth: 1,
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
