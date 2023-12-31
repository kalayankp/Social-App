import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput, Text, TouchableOpacity, Image, View, FlatList, StyleSheet } from 'react-native';
import Clause from '../components/Signing/Clauses';

const DraftingScreen = () => {
  const myImage = require('../asset/Assets/Icons/editButton.png');
  const [isEditing, setIsEditing] = useState(false);
  const [button, setButton] = useState(true)
  const [title, setTitle] = useState('Contract Title');
  const [clauses, setClauses] = useState([
    {
      index: 0,
      text: 'This is the first clause',
      isEditing: false,
    },
    {
      index: 1,
      text: 'This is the second clause',
      isEditing: false,
    },
    {
      index: 2,

      text: 'This is the third clause',
      isEditing: false,
    },
  ]);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
// title 
const handleTitleSave = () => {
  setIsEditing(false);
  setButton(true)
};
  const handleEdit = () => {
    setIsEditing(true);
    setButton(false)
  };


  const saveClause = (index, text, isEditing) => {
    const newClauses = clauses.map((clause) => {
      if (clause.index === index) {
        return {
          ...clause,
          text,
          isEditing,
        };
      }
      return clause;
    });
    setClauses(newClauses);
    setButton(true)
  };

  const editClause = (index, text, isEditing) => {
    const newClauses = clauses.map((clause) => {
      if (clause.index === index) {
        return {
          ...clause,
          text,
          isEditing,
        };
      }
      return clause;
    });
    setClauses(newClauses);
   
   
    setButton(false)
  };
  

  const renderClause = ({ item }) => (
    <Clause
      clause={item.text}
      index={item.index}
      saveClause={saveClause}
      editClause={editClause}
      isEditing={isEditing}
      
    />
  );
  const ClauseCount = clauses.length;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>

        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        ) : (
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.numberOfClauses}>{ClauseCount} Clauses Total</Text>
          </View>
        )}

        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={handleTitleSave}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Image source={myImage} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={styles.clause}
        data={clauses}
        renderItem={renderClause}
        keyExtractor={(item) => item.index.toString()}
      />
      {/* Add the back button */}
      {button ? (<View><TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        <TouchableOpacity
          style={styles.sign}
          onPress={() => { console.log('Save') }}
        >
          <Text style={styles.signText}>Save</Text>
        </TouchableOpacity></View>) : <View></View>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  title: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 25,
    color: '#525266',
  },
  titleInput: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 25,
    color: '#525266',
    width: '70%',
    marginLeft: 10,
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bodyInput: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#525266',
    minHeight: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#32A05F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#E60023',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    color: '#FFFFFF',
  },
  editButtonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    color: '#FF6666',
  },

  backButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: 'black',  // black
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  sign: {
    backgroundColor: '#EC4D36',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  signText: {
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  numberOfClauses: {
    fontFamily: 'Inter',
    fontWeight: 'normal',
    fontSize: 10,
    color: '#525266',
  },
});

export default DraftingScreen;
