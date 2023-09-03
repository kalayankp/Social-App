import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../utils/supabase"
import ContractForm from './ContractForm';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import { fetchContracts, getContract } from '../../actions/contractAction';

export default function DynamicDropdown({ handleSelectContract }) {

  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContractFormOpen, setContractFormOpen] = useState(false);

  const dispatch = useDispatch()
  const options = useSelector((store) => {
    return store.contractReducer.options
  })



//  LOG  [{"label": null, "value": "9a9f17b0-7873-49cc-8aca-4658d6960f8e"}, {"label": null, "value": "68cc953f-4087-4b93-b1da-e360df934238"}, {"label": null, "value": "13a71c66-116c-464c-a0a5-2525fddfd288"}, {"label": null, "value": "bbd5c83f-92d2-4aee-b9fc-aea9a9088329"}, {"label": null, "value": "4841c9aa-00fe-4e9c-bba1-721e5587f511"}, {"label": null, "value": "86684650-80b5-48d7-bbcb-0d1070d7e60d"}, {"label": "TITLE", "value": "419fed41-ee12-490c-88c5-382b8833e056"}, {"label": "Create New", "value": "createNew"}, null] options
//  LOG  [{"label": null, "value": "9a9f17b0-7873-49cc-8aca-4658d6960f8e"}, {"label": null, "value": "68cc953f-4087-4b93-b1da-e360df934238"}, {"label": null, "value": "13a71c66-116c-464c-a0a5-2525fddfd288"}, {"label": null, "value": "bbd5c83f-92d2-4aee-b9fc-aea9a9088329"}, {"label": null, "value": "4841c9aa-00fe-4e9c-bba1-721e5587f511"}, {"label": null, "value": "86684650-80b5-48d7-bbcb-0d1070d7e60d"}, {"label": "TITLE", "value": "419fed41-ee12-490c-88c5-382b8833e056"}, {"label": "Create New", "value": "createNew"}] options

  useEffect(() => {
    dispatch(fetchContracts())
  
   
  }, [toggleModal]);


  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option.value);
    console.log('option.value', option);
    handleSelectContract(option);
    toggleModal();
  };

  const handleCreateNew = () => {
    setContractFormOpen(true);
    console.log('Create New');
  };
 
  const handleAddContract = async ( title, clauses ) => {
    console.log(title,"titleforomhandleadd")
  
    try {
    
    dispatch(getContract(setContractFormOpen, clauses, title));

    } catch (error) {
      console.error('Error fetching contract: 120', error);
      setContractFormOpen(false);
      alert("Error fetching contract");
    }
  };

  const renderOption = ({ item }) => (
   
    <TouchableOpacity
      style={[
        styles.optionItem,
        item?.value === 'createNew' && styles.createNewOption,
      ]}
      onPress={() => {
        if (item?.value === 'createNew') {
          handleCreateNew();
        } else {
          selectOption(item);
        }
      }}
    >
      <Text style={styles.optionText}>{item?.label}</Text>
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
              onPress={() => {
                setSelectedOption('')
                handleSelectContract(null);
                toggleModal()
              }}
            />
            <FlatList
              data={options}
              renderItem={renderOption}
              keyExtractor={(options) => options?.id || options?.value}
            />
          </View>
        </View>
      </Modal>

      {isContractFormOpen && <Modal
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
    padding: 10,
    marginLeft: 10,
    paddingLeft: 20
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