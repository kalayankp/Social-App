import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import { supabase } from '../utils/supabase';

const CreatePost = () => {
  const [selectedMedia, setSelectedMedia] = useState([]);

  const openMediaPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    })
      .then((media) => {
        setSelectedMedia(media);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadMediaToSupabase = async () => {
    for (const media of selectedMedia) {
      console.log(media);
      const fileName = media.path.split('/').pop(); // Extract the file name from the path
    
      // Upload the file using the obtained file data
      const uploadedFile = await supabase.storage
        .from('hashx-reels')
        .upload(fileName, media.data);
    
      // Get the public URL of the uploaded file
      const publicURL = supabase.storage
        .from('hashx-reels')
        .getPublicUrl(fileName);
    
      console.log('File uploaded:', uploadedFile);
      console.log('Public URL:', publicURL);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedMedia.map((media, index) => (
        <View key={index}>
          {media.mime.startsWith('image/') ? (
            <>
              <Image
                source={{ uri: media.path }}
                style={{ width: 200, height: 200 }}
              />
              <Text>{media.mime}</Text>
            </>
          ) : (
            <>
              <Video
                source={{ uri: media.path }}
                style={{ width: 300, height: 200 }}
                controls
              />
              <Text>{media.mime}</Text>
            </>
          )}
        </View>
      ))}

      <Button title="Select Media" onPress={openMediaPicker} />
      <Button title="Upload to Supabase" onPress={uploadMediaToSupabase} />
    </View>
  );
};

export default CreatePost;