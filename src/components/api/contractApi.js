
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { supabase } from "../../utils/supabase"

// const getContract = async () => {
//   const user = await AsyncStorage.getItem('user_info');
//   const { id } = JSON.parse(user);

//   let { data: contractData, error } = await supabase
//     .from('Contract')
//     .select('*')
//     .eq('owner_id', id)
//     .order('created_at', { ascending: false });
//   if (error) {
//     console.error('Error fetching contract:', error);
//     return;
//   }
//   if (contractData && contractData.length > 0) {
//     const mappedContracts = contractData.map(contract => ({
//       value: contract.id,
//       label: contract.title,
//     }));
//     mappedContracts.push({ value: 'createNew', label: 'Create New' });
//     return mappedContracts;
//   }
//   return null;
// }

// export { getContract }