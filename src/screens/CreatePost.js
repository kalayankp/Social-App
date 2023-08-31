import React, { useState, useEffect  } from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import InputBox from '../components/CreateReel/InputBox';
import ImagePicker from 'react-native-image-crop-picker';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import MediaDisplay from '../components/CreateReel/MediaDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import  DynamicDropdown from '../components/CreatePost/DynamicDropdown';

const CreatePost = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    getLocation();
  }, []);
  const handleInputChange = (value) => {
    setDescription(value)
  };
  const openMediaPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then((media) => {
        setSelectedMedia(media);
        console.log(media);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadMediaToSupabase = async () => {
    setLoading(true);
    let uploadedImageUrls = [];
    let uploadedVideoUrls = [];

    for (let i = 0; i < selectedMedia.length; i++) {
      const media = selectedMedia[i];
      const fileName = media.path.split('/').pop();
      const fileExt = fileName.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const file = {
        uri: media.path,
        name: fileName,
        type: media.mime,
      };

      if (media.mime.startsWith('image/')) {
        // Upload images to the 'image' folder
        const { data, error } = await supabase.storage
          .from('hashx-reels/image')
          .upload(filePath, file);

        if (error) {
          console.log('Error uploading image:', error);
        } else {
          console.log('Image uploaded successfully:', data);
          const publicURL = supabase.storage.from('hashx-reels/image').getPublicUrl(filePath);
          uploadedImageUrls.push(publicURL.data.publicUrl);
          console.log('Public Image URL:', publicURL);
        }
      } else if (media.mime.startsWith('video/')) {
        // Upload videos to the 'video' folder
        const { data, error } = await supabase.storage
          .from('hashx-reels/video')
          .upload(filePath, file);

        if (error) {
          console.log('Error uploading video:', error);
        } else {
          console.log('Video uploaded successfully:', data);
          const publicURL = supabase.storage.from('hashx-reels/video').getPublicUrl(filePath);
          uploadedVideoUrls.push(publicURL.data.publicUrl);
          console.log('Public Video URL:', publicURL);
        }
      }
    }

    setLoading(false);
    setSelectedMedia([]);
    setDescription('');

    console.log('Uploaded Image URLs:', uploadedImageUrls);
    console.log('Uploaded Video URLs:', uploadedVideoUrls);
    uploadPost(uploadedImageUrls, uploadedVideoUrls);
  };
  
  const navigateToVideoScreen = (media) => {
    navigation.navigate('VideosScreen', { media });
  };

  const resetSelectedMedia = () => {
    setSelectedMedia([]);
  };

  const getLocation = () => {
    // Fetch location
  };

  const uploadPost = async (uploadedImageUrls, uploadedVideoUrls) => {
    const contentArray = [];
  
    // Add image objects to the contentArray
    for (const imageUrl of uploadedImageUrls) {
      contentArray.push({
        url: imageUrl,
        mimetype: 'img',
      });
    }
  
    // Add video objects to the contentArray
    for (const videoUrl of uploadedVideoUrls) {
      contentArray.push({
        url: videoUrl,
        mimetype: 'video',
      });
    }
  console.log('contentArray', contentArray);
    const contentJSON = contentArray;

    const user = await AsyncStorage.getItem('user_info');
    const {email , id } = JSON.parse(user);
    console.log('IdentityUUID',id);
    console.log('email', email);


    const { data, error } = await supabase.from('Post').insert([
      {
        IdentityUUID: id,
        Description: description,
        Content: contentJSON,
        Contract: selectedOption,
      },
    ])
  
    if (error) {
      console.log('Error creating post:', error);
    } else {
      console.log('Post created successfully:', data);
    }
  };

  const onSave = () => {
    if (selectedMedia.length === 0 ) {
      if(description ==""){
        alert("no media selected or or description")
        return;
      }else{
        uploadMediaToSupabase();
      }
     
    }
    uploadMediaToSupabase();
  };
  const handleSelectContract = (contract) => {
    console.log('value from the create post',contract);
    if(contract == null){
      setSelectedOption(null);
    }else{
      setSelectedOption(contract.value);
    }
  } 
  return (
    <ScrollView contentContainerStyle={styles.container}>
     <MediaDisplay selectedMedia={selectedMedia} openMediaPicker={openMediaPicker} />
       <InputBox onInputChange={handleInputChange} />
       
       <View style={styles.pickerContainer}>
       <View style={styles.pickerLabelContainer}>
          <Text style={styles.pickerLabelText}>Select a Contract:</Text>
        </View>
        < DynamicDropdown  handleSelectContract= {handleSelectContract} />
        </View>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  
  },
  saveButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-end',
    marginEnd : '5%'
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    alignSelf: 'stretch',
    marginHorizontal: '5%',
    marginTop: 20,
  },
  pickerLabelContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between items
    marginBottom: 5,
  },
  pickerLabel: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  pickerLabelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  picker: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color  : 'black'
    // backgroundColor: 'orange',
  },
});

export default CreatePost;