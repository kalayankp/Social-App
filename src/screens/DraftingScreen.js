import React ,{ useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput, Text, TouchableOpacity, Image, View, FlatList ,StyleSheet } from 'react-native';
import Clause from '../components/Signing/Clauses';


// import useSupabase from '../utils/useSupabase.js';



const DraftingScreen = () => {
  const myImage = require('../asset/Assets/Icons/editButton.png');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Drafting');
  const navigation = useNavigation();
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  // const supabase = useSupabase(); // <-- use the useSupabase hook to get the Supabase client object

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
    // Here you can handle the logic to save the changes made to the contract
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  // Define an array of clauses
  const clauses = [
    {
      text: 'This is clause 1',
      index: 0,
    },
    {
      text: 'This is clause 2',
      index: 1,
    },
    {
      text: 'This is clause 3',
      index: 2,
    },
  ];

  const renderClause = ({item}) => (
    <Clause
      clause={item.text}
      index={item.index}
      isEditing={isEditing}
      handleEdit={handleEdit}
      handleSave={handleSave}
    />
  );

  // useEffect(() => {
  //   const fetchContracts = async () => {
  //     let { data: contracts, error } = await supabase
  //       .from('contracts')
  //       .select('id');
  //     console.log(contracts);
  //   };

  //   fetchContracts();
  // }, [supabase]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {isEditing ? (
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}

        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={handleTitleSave}>
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Image style={styles.editButtonText} source={myImage} />
          </TouchableOpacity>
        )}
      </View>

      {/* Render the list of clauses using FlatList */}
      <FlatList
        data={clauses}
        renderItem={renderClause}
        keyExtractor={item => item.index.toString()}
      />
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
    fontWeight: '400',
    fontSize: 30,
    color: '#525266',
    borderBottomColor: '#525266',
    width: '80%',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    color: '#FFA500',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  clause: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clauseText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18,
    color: '#525266',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default DraftingScreen;
