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
import {Picker} from '@react-native-picker/picker'
import InputBox from '../components/CreateReel/InputBox';
import ImagePicker from 'react-native-image-crop-picker';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import MediaDisplay from '../components/CreateReel/MediaDisplay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ContractForm from '../components/CreatePost/ContractForm';
import { set } from 'react-native-reanimated';
const CreatePost = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    getLocation();
   async function  getContract(){
    const user = await AsyncStorage.getItem('user_info');
          const {email , id } = JSON.parse(user);
          console.log(typeof(id))
          try {
            let { data: Contract, error } = await supabase
              .from('Contract')
              .select('*')
              .eq('owner_id', id)
              .order('created_at', { ascending: false })
            console.log('Contract:', Contract);
            console.log('Error:', error);
            if (Contract && Contract.length > 0) {
              setOptions(Contract)
            } else {
              console.log('No contracts found for this owner_id');
            }
          } catch (error) {
            console.error('Error fetching contract:', error);
          }
        }
   getContract()
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
        contract: selectedOption,
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


  const handleAddContract = (contract) => {
    console.log('Added Contract:', contract);
    async function  getContract(){
      const user = await AsyncStorage.getItem('user_info');
            const {email , id } = JSON.parse(user);
            console.log(typeof(id))
            try {
              // create a new contract
              const { data, error } = await supabase.from('Contract').insert([
                {
                  title: contract.title,
                  owner_id: id,
                },
              ]);
            
        
              let { data: Contract, error:call } = await supabase
              .from('Contract')
              .select('*')
              .eq('owner_id', id)
              .order('created_at', { ascending: false })
            console.log('Contract:', Contract);
            console.log('Error:', call);
            if (Contract && Contract.length > 0) {
              setOptions(Contract)
              setModalOpen(false);
            } else {
              console.log('No contracts found for this owner_id');
            }
            } catch (error) {
              console.error('Error creating contract:', error);
              setModalOpen(false);
              alert("Error creating contract")
            }
          }
      getContract()
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     <MediaDisplay selectedMedia={selectedMedia} openMediaPicker={openMediaPicker} />
       <InputBox onInputChange={handleInputChange} />
       <View style={styles.pickerContainer}>
       <View style={styles.pickerLabelContainer}>
          <Text style={styles.pickerLabelText}>Select a Contract:</Text>
          <AntDesign
            name="addfile"
            size={25}
            color="orange"
            style={styles.icon}
            onPress={() => {
              console.log('Create contract');
              setModalOpen(true);
            }}
          />
        </View>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => {
            setSelectedOption(itemValue)
            console.log(itemValue)
          }}
          style={styles.picker}
      
        >

          
          {options.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.title}
              value={option.id}
            />
          ))}
        </Picker>
        <Modal
        isVisible={isModalOpen}
        // onBackdropPress={() => setModalOpen(false)} 
        backdropOpacity={0.7} 
        animationIn="slideInUp" 
        animationOut="slideOutDown" 
      >
        <ContractForm
          onClose={() => setModalOpen(false)}
          onAddContract={handleAddContract}
        />
      </Modal>
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