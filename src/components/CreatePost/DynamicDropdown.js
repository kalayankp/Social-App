import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContractForm from './ContractForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContracts, AddNewContract } from '../../actions/contractAction';
const { width, height } = Dimensions.get('window');


export default function DynamicDropdown({ handleSelectContract }) {

  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isContractFormOpen, setContractFormOpen] = useState(false);

  const dispatch = useDispatch()
  const options = useSelector((store) => {
    return store.contractReducer.options
  })

  useEffect(() => {
    dispatch(fetchContracts())
    
  }, [toggleModal,options]);


  

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const selectOption = (option) => {
    setSelectedOption(option.value);
   
    handleSelectContract(option);
    toggleModal();
  };


  const handleCreateNew = () => {
    setContractFormOpen(true);
   
  };
 
  const handleAddContract = async ( title, clauses ) => {
    
  try {
    
  dispatch (AddNewContract(setContractFormOpen, clauses, title));

    } catch (error) {
      console.error('Error fetching contract 51', error);
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