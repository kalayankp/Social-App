import { supabase } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const userInfo =async(id)=>{
    let {data  ,  error} =  await supabase
    .from('UserInfo')
    .select('*')
    .eq('id' ,  id)
    .single()
    if (error) {
        console.log('error in screen/api/data api call' ,error)
        alert("error in screen/api/data api call" ,error)
        return null
    }
    // console.log(data)
    return data
}
export const getLoggedInUser = async()=>{
    const user = await AsyncStorage.getItem('user_info');
    const {email , id } = JSON.parse(user);
    console.log('IdentityUUID',id);
    console.log('email', email);
    return id;
}


export const getTradeData = async (table, trader) => {
    const user =  trader == 'Trader1' ? 'Trader2' : 'Trader1'
    try {
      const identityID = await getLoggedInUser();
      const { data, error } = await supabase
        .from(table)
        .select(`*, UserInfo:${user}(*)`)
        .eq(trader, identityID);
      
      if (error) {
        console.error('Error in getTradeData:', error);
        // Handle the error appropriately (e.g., return an error object).
        return [];
      }
      console.log('data from api call ==>',data )
      return data || [];

    } catch (error) {
      console.error('Error in getTradeData:', error);
      // Handle the error appropriately (e.g., return an error object).
      return [];
    }
  };