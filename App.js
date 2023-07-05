import React, { useState } from 'react';
import { View, TextInput, Button, Image,StyleSheet } from 'react-native';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageSelection = () => {
    // Code to handle image selection using a library like react-native-image-picker
  };

  const handleCreatePost = () => {
    // Code to create a post using the entered values
    // You can make an API call, use a database, or any other suitable method
    // For simplicity, we will just log the values for now
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Image:', image);
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" value={content} onChangeText={setContent} />
      <Button title="Select Image" onPress={handleImageSelection} />
      {image && <Image source={{ uri: image }}  />}
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

export default CreatePostForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    top:60
  },
});