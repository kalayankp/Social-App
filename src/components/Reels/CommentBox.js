// import React, { useState } from 'react';
// import EmojiSelector from 'react-native-emoji-selector';
// import DocumentPicker from 'react-native-document-picker';
// import MentionsTextInput from 'react-native-mentions';
// import Hyperlink from 'react-native-hyperlink';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
// } from 'react-native';
// import ClickableTextButton from './ClickableTextButton';

// const CommentBox = () => {
//   const people = [
//     {
//       id: '1',
//       name: 'Shivam',
//     }
//   ];
//   const [comment, setComment] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const handlePostComment = () => {
//     console.log('Posting comment', comment);
//     setComment('');
//   };


//   const onEmojiSelected = (emoji) => {
//     setComment(comment + emoji);
//   };

//   const onFileSelected = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       console.log(result.uri);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled the picker');
//       } else {
//         console.log(err);
//       }
//     }
//   };

//   const renderEmojiPicker = () => {
//     return (
//       <View style={styles.emojiContainer}>
//         <EmojiSelector onEmojiSelected={onEmojiSelected} />
//       </View>
//     );
//   };

//   const renderAttachments = () => {
//     return (
//       <TouchableOpacity style={styles.attachmentContainer} onPress={onFileSelected}>
//         <Image source={require('../../asset/Assets/user.jpeg')} style={styles.attachmentIcon} />
//         <Text style={styles.attachmentText}>Attach Files</Text>
//       </TouchableOpacity>
//     );
//   };

//   const renderCommentInput = (people) => {
//     return (
//       <MentionsTextInput
//         style={styles.commentInput}
//         value={comment}
//         onChangeText={(text) => setComment(text)}
//         placeholder={'Write a comment...'}
//         underlineColorAndroid={'transparent'}
//         inputContainerStyle={{backgroundColor: '#fff'}}
//         placeholderTextColor={'#ccc'}
//         autoCapitalize={'none'}
//         autoCorrect={true}
//         multiline={false}
//         returnKeyType={'done'}
//         onContentSizeChange={() => {}}
//         textInputStyle={{fontSize: 16, color: '#000'}}
//         trigger={'$'}
//         triggerLocation={'anywhere'}
//         renderSuggestions={(people) => (
//           <View style={styles.suggestionsContainer}>
//             {people.map((person) => (
//               <TouchableOpacity
//                 style={styles.suggestion}
//                 key={person.id}
//                 onPress={() => console.log(`mentioning ${person.name}`)}>
//                 <Text style={styles.suggestionText}>{person.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
        
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {showEmojiPicker && renderEmojiPicker()}
//       {renderAttachments()}
//       {renderCommentInput(people)}
//        <TouchableOpacity style={styles.postButton} onPress={() =>handlePostComment()}>
//         <Text style={styles.postButtonText}>Post</Text>
//       </TouchableOpacity>
//       <ClickableTextButton/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginHorizontal: 20,
//     marginVertical: 10,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   commentInput: {
//     minHeight: 80,
//     maxHeight: 200,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     paddingBottom: 20,
//     backgroundColor: '#fff',
//   },
//   suggestionsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginTop: 5,
//   },
//   suggestion: {
//     padding: 5,
//   },
//   suggestionText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   emojiContainer: {
//     position: 'absolute',
//     bottom: 70,
//     right: 10,
//     zIndex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   attachmentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   attachmentIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   attachmentText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   postButton: {
//     backgroundColor: '#0066CC',
//     borderRadius: 5,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     alignSelf: 'flex-end',
//   },
//   postButtonText: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });


// export default CommentBox;


import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {supabase} from '../../../superbase/superbase';  

const CommentBox = ({ IdentityID, ItemID }) => {
  const [comment, setComment] = useState('');

  const postComment = async () => {
    const args = { Body: comment, IdentityID : "00000000-0000-0000-0000-000000000000", ItemID :"00000000-0000-0000-0000-000000000000" , ItemType: 2 };
    const { data, error } = await supabase  .from('Comment').insert(args);
    console.log('POSTCOMMENT', data, error);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Leave a comment"
        multiline
      />
      <Button title="Post" onPress={postComment} color="#FFA500" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    height: 80,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color : "black"
  },
});

export default CommentBox;
