import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../utils/supabase"
import ContractForm from './ContractForm';
const { width, height } = Dimensions.get('window');


export default function DynamicDropdown({handelSelectContract}) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContractFormOpen, setContractFormOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await AsyncStorage.getItem('user_info');
        const { id } = JSON.parse(user);
  
        let { data: contractData, error } = await supabase
          .from('Contract')
          .select('*')
          .eq('owner_id', id)
          .order('created_at', { ascending: false });
        if (error) {
          console.error('Error fetching contract:', error);
          return;
        }
        if (contractData && contractData.length > 0) {
          const mappedContracts = contractData.map(contract => ({
            value: contract.id,
            label: contract.title,
          }));
          mappedContracts.push({ value: 'createNew', label: 'Create New' });
  
          setOptions(mappedContracts);
        } else {
          setOptions([{value: 'createNew', label: 'Create New'}])
          console.log('No contracts found for this owner_id');
        }
      } catch (error) {
        console.error('Error fetching contract:', error);
      }
    }
  
    fetchData();
  }, [toggleModal]);
  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option.value);
    console.log('option.value',option);
    handelSelectContract(option);
    toggleModal();
  };

  const handleCreateNew = () => {
    setContractFormOpen(true);
    console.log('Create New');
  };

  const handleAddContract =async ({title , clauses}) => {
    console.log('Added Contract:', title);
    console.log('clauses:', clauses);
    try {
    async function  getContract(){
      const user = await AsyncStorage.getItem('user_info');
            const {email , id } = JSON.parse(user);
            console.log(id)
            try {
              const { data, error } = await supabase.from('Contract').insert([
                {
                  title: title,
                  owner_id: id,
                },
              ])
              
              const {data :getbytitle  ,  error:titlerror  }= await supabase
              .from('Contract')
              .select('*')
              .eq('title', title)
              .single();

              if (error) {
                console.log('Error creating contract:', error);
                setContractFormOpen(false);
                alert("Error creating contract");
              } else {
                console.log('Contract created successfully:', data);
              }
              console.log('getbytitle',getbytitle);
              console.log('titlerror',titlerror);

              for(const element of clauses){
                const { data, error } = await supabase.from('Clauses').insert([
                  {
                    contract_id: getbytitle.id,
                    clause: element,
                  },
                ])
                if (error) {
                  console.log('Error creating clause:', error);
                  setContractFormOpen(false);
                  alert("Error creating clause");
                } else {
                  console.log('Clause created successfully:', data);
                }
              }
              const {data : refreshedContracts ,  error:refresheror }= await supabase
              .from('Contract')
              .select('*')
              .eq('owner_id', id)
              .order('created_at', { ascending: false });
              if (refreshedContracts && refreshedContracts.length > 0) {
                const mappedContracts = refreshedContracts.map(contract => ({
                  value: contract.id,
                  label: contract.title,
                }));
                mappedContracts.push({ value: 'createNew', label: 'Create New' });
                setOptions(mappedContracts);
              } else {
                console.log(refresheror);
                console.log('No contracts found for this owner_id');
              }
              setContractFormOpen(false);
            } catch (error) {
              console.error('Error creating contract:', error);
              setContractFormOpen(false);
              alert("Error creating contract");
            }
          }
          getContract();
    } catch (error) {
      console.error('Error fetching contract:', error);
      setContractFormOpen(false);
      alert("Error fetching contract");
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionItem,
        item.value === 'createNew' && styles.createNewOption,
      ]}
      onPress={() => {
        if (item.value === 'createNew') {
          handleCreateNew();
        } else {
          selectOption(item);
        }
      }}
    >
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectedOption} onPress={toggleModal}>
        <Text style={styles.selectedText}>
          {selectedOption ? options.find(opt => opt.value === selectedOption).label : 'Select a Contract'}
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.7}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={toggleModal}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AntDesign
              name='closecircleo'
              color='orange'
              size={24}
              style={styles.closeIcon}
              onPress={()=>{
                setSelectedOption('')
                handelSelectContract(null);
                toggleModal()
              }}
            />
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(item) => item.id || item.value}
            />
          </View>
        </View>
      </Modal>

      {   isContractFormOpen  && <Modal
         isVisible={isContractFormOpen}
        backdropOpacity={0.7} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
      >
        <ContractForm
          onClose={() => setContractFormOpen(false)} 
          onAddContract={handleAddContract}
        />
      </Modal>}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  selectedOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: width * 0.8,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    color: 'orange',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding : 10,
    marginLeft :10,
    paddingLeft : 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: width * 0.8,
    maxHeight: height * 0.6,
    paddingHorizontal: 10,
  },
  optionItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  createNewOption: {
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});