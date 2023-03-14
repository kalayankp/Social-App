// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { TextInput, Button, Checkbox } from 'react-native-paper';

// // Component for rendering the card information form
// const CardInformationForm = ({ cardName, setCardName, cardDescription, setCardDescription, cardImage, setCardImage }) => {
//   return (
//     <>
//       <Text style={styles.sectionTitle}>Card Information</Text>
//       <TextInput
//         label="Card Name"
//         value={cardName}
//         onChangeText={(text) => setCardName(text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Card Description"
//         value={cardDescription}
//         onChangeText={(text) => setCardDescription(text)}
//         style={styles.input}
//       />
//       <TextInput
//         label="Card Image"
//         value={cardImage}
//         onChangeText={(text) => setCardImage(text)}
//         style={styles.input}
//       />
//     </>
//   );
// };

// // Component for rendering the clause form
// const ClauseForm = ({ clauses, setClauses, newClause, setNewClause, handleAddClause }) => {
//   return (
//     <>
//       <Text style={styles.sectionTitle}>Clauses</Text>
//       <View style={styles.clauseForm}>
//         <Checkbox status="unchecked" onPress={() => {}} />
//         <TextInput
//           label="Enter new clause"
//           value={newClause}
//           onChangeText={(text) => setNewClause(text)}
//           style={styles.clauseInput}
//         />
//         <Button mode="contained" onPress={handleAddClause} style={styles.clauseButton}>
//           Add Clause
//         </Button>
//       </View>
//       {clauses.map((clause, index) => (
//         <View key={index} style={styles.clauseRow}>
//           <Checkbox status="unchecked" onPress={() => {}} />
//           <Text style={styles.clauseText}>{clause}</Text>
//         </View>
//       ))}
//     </>
//   );
// };

// // Component for rendering the action buttons
// const ActionButtons = ({ handleSaveAsDraft, handlePublish }) => {
//   return (
//     <View style={styles.actionButtons}>
//       <Button mode="contained" onPress={handleSaveAsDraft} style={styles.actionButton}>
//         Save as Draft
//       </Button>
//       <Button mode="contained" onPress={handlePublish} style={styles.actionButton}>
//         Publish
//       </Button>
//     </View>
//   );
// };





// const CreateCardScreen = () => {
//   const [cardTitle, setCardTitle] = useState('');
//   const [cardDescription, setCardDescription] = useState('');
//   const [clauses, setClauses] = useState([]);
//   const [isDraft, setIsDraft] = useState(true);

//   const handleAddClause = () => {
//     setClauses((prevClauses) => [
//       ...prevClauses,
//       { id: prevClauses.length + 1, text: '' },
//     ]);
//   };

//   const handleRemoveClause = (id) => {
//     setClauses((prevClauses) => prevClauses.filter((clause) => clause.id !== id));
//   };

//   const handleClauseTextChange = (id, text) => {
//     setClauses((prevClauses) =>
//       prevClauses.map((clause) => (clause.id === id ? { ...clause, text } : clause))
//     );
//   };

//   const handleSaveAsDraft = () => {
//     setIsDraft(true);
//     // code to save card as draft
//   };

//   const handlePublish = () => {
//     setIsDraft(false);
//     // code to publish card for trading
//   };

//   return (
//     <>
   
//       <View style={styles.container}>
//         <TextInput
//           label="Card Title"
//           value={cardTitle}
//           onChangeText={setCardTitle}
//           style={styles.input}
//         />
//         <TextInput
//           label="Card Description"
//           value={cardDescription}
//           onChangeText={setCardDescription}
//           multiline
//           style={styles.input}
//         />
//         <View style={styles.clausesContainer}>
//           {clauses.map((clause) => (
//             <View style={styles.clause} key={clause.id}>
//               <TextInput
//                 label={`Clause ${clause.id}`}
//                 value={clause.text}
//                 onChangeText={(text) => handleClauseTextChange(clause.id, text)}
//                 style={styles.clauseInput}
//               />
//               <Button icon="close" onPress={() => handleRemoveClause(clause.id)} />
//             </View>
//           ))}
//           <Button mode="contained" onPress={handleAddClause} style={styles.addClauseButton}>
//             Add Clause
//           </Button>
//         </View>
//         <ActionButtons handleSaveAsDraft={handleSaveAsDraft} handlePublish={handlePublish} />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     marginBottom: 16,
//   },
//   clausesContainer: {
//     marginBottom: 16,
//   },
//   clause: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   clauseInput: {
//     flex: 1,
//     marginRight: 8,
//   },
//   addClauseButton: {
//     width: '50%',
//     alignSelf: 'center',
//   },
// });

// export default CreateCardScreen;

// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { Appbar, Button, Checkbox } from 'react-native-paper';

// const MOCK_CARDS = [
//   { id: 1, title: 'Card 1', description: 'Description for Card 1' },
//   { id: 2, title: 'Card 2', description: 'Description for Card 2' },
//   { id: 3, title: 'Card 3', description: 'Description for Card 3' },
// ];

// const MOCK_CLAUSES = [
//   { id: 1, text: 'Clause 1' },
//   { id: 2, text: 'Clause 2' },
//   { id: 3, text: 'Clause 3' },
// ];

// const CreateTradeScreen = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [selectedClauses, setSelectedClauses] = useState([]);

//   const handleCardSelect = (card) => {
//     setSelectedCard(card);
//     setSelectedClauses([]);
//   };

//   const handleClauseSelect = (clause) => {
//     setSelectedClauses((prevSelectedClauses) => {
//       if (prevSelectedClauses.includes(clause)) {
//         return prevSelectedClauses.filter((selectedClause) => selectedClause.id !== clause.id);
//       } else {
//         return [...prevSelectedClauses, clause];
//       }
//     });
//   };

//   const handleTradeConfirm = () => {
//     // code to confirm trade and sign selected clauses
//   };

//   return (
//     <>
//       <Appbar.Header>
//         <Appbar.BackAction onPress={() => setSelectedCard(null)} />
//         <Appbar.Content title={selectedCard ? selectedCard.title : 'Trade Cards'} />
//       </Appbar.Header>
//       <ScrollView style={styles.container}>
//         {selectedCard ? (
//           <>
//             <View style={styles.cardDetails}>
//               <Button mode="contained" onPress={() => setSelectedCard(null)} style={styles.backButton}>
//                 Back to Cards
//               </Button>
//               <View style={styles.cardTitle}>
//                 <Button mode="outlined" onPress={() => setSelectedCard(null)}>
//                   {selectedCard.title}
//                 </Button>
//               </View>
//               <View style={styles.cardDescription}>
//                 <Button mode="outlined" onPress={() => setSelectedCard(null)}>
//                   {selectedCard.description}
//                 </Button>
//               </View>
//             </View>
//             <View style={styles.clausesContainer}>
//               <View style={styles.clausesHeader}>
//                 <Button mode="outlined">Select All</Button>
//                 <Button mode="outlined">Deselect All</Button>
//               </View>
//               {MOCK_CLAUSES.map((clause) => (
//                 <View style={styles.clause} key={clause.id}>
//                   <Checkbox
//                     status={selectedClauses.includes(clause) ? 'checked' : 'unchecked'}
//                     onPress={() => handleClauseSelect(clause)}
//                   />
//                   <Button mode="outlined" onPress={() => console.log('view clause')}>
//                     {clause.text}
//                   </Button>
//                 </View>
//               ))}
//             </View>
//             <Button mode="contained" onPress={handleTradeConfirm} style={styles.confirmButton}>
//               Confirm Trade
//             </Button>
//           </>
//         ) : (
//           <>
//             <View style={styles.cardsContainer}>
//               {MOCK_CARDS.map((card) => (
//                 <Button key={card.id} onPress={() => handleCardSelect(card)} style={styles.card}>
//                   {card.title}
//                 </Button>
//               ))}
//             </View>
//             <Button mode="contained" onPress={() => console.log('create new card')} style={styles.createButton}>
//                 Create New Card
//             </Button>
//             </>
//         )}
//         </ScrollView>
//     </>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//     flex: 1,
//     },
//     cardsContainer: {
//     padding: 16,
//     },
//     card: {
//     marginVertical: 8,
//     },
//     emptyState: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 32,
//     },
//     cardDetails: {
//     padding: 16,
//     },
//     backButton: {
//     marginBottom: 16,
//     },
//     cardTitle: {
//     marginBottom: 16,
//     },
//     cardDescription: {
//     marginBottom: 32,
//     },
//     clausesContainer: {
//     padding: 16,
//     },
//     clausesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     },
//     clause: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     },
//     confirmButton: {
//     margin: 16,
//     },
//     });

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView ,Modal ,Text} from 'react-native';
import { Appbar, Button, Checkbox  ,  TextInput} from 'react-native-paper';

const MOCK_CARDS = [
  { id: 1, title: 'Card 1', description: 'Description for Card 1' },
  { id: 2, title: 'Card 2', description: 'Description for Card 2' },
  { id: 3, title: 'Card 3', description: 'Description for Card 3' },
];

const MOCK_CLAUSES = [
  { id: 1, text: 'Clause 1' },
  { id: 2, text: 'Clause 2' },
  { id: 3, text: 'Clause 3' },
];

const CreateTradeScreen = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [selectAllClauses, setSelectAllClauses] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setSelectedClauses([]);
  };

  const handleClauseSelect = (clause) => {
    setSelectedClauses((prevSelectedClauses) => {
      if (prevSelectedClauses.includes(clause)) {
        return prevSelectedClauses.filter((selectedClause) => selectedClause.id !== clause.id);
      } else {
        return [...prevSelectedClauses, clause];
      }
    });
  };

  const handleSelectAllClauses = () => {
    setSelectAllClauses(true);
    setSelectedClauses([...MOCK_CLAUSES]);
  };

  const handleDeselectAllClauses = () => {
    setSelectAllClauses(false);
    setSelectedClauses([]);
  };

  const handleTradeConfirm = () => {
    setOpenModal(true);
    // code to confirm trade and sign selected clauses
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => setSelectedCard(null)} />
        <Appbar.Content title={selectedCard ? selectedCard.title : 'Trade Cards'} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {selectedCard ? (
          <>
            <View style={styles.cardDetails}>
              <Button mode="contained" onPress={() => setSelectedCard(null)} style={styles.backButton}>
                Back to Cards
              </Button>
              <View style={styles.cardTitle}>
                <Button mode="outlined" onPress={() => setSelectedCard(null)}>
                  {selectedCard.title}
                </Button>
              </View>
              <View style={styles.cardDescription}>
                <Button mode="outlined" onPress={() => setSelectedCard(null)}>
                  {selectedCard.description}
                </Button>
              </View>
            </View>
            <View style={styles.clausesContainer}>
              <View style={styles.clausesHeader}>
                <Button mode="outlined" onPress={handleSelectAllClauses}>
                  Select All
                </Button>
                <Button mode="outlined" onPress={handleDeselectAllClauses}>
                  Deselect All
                </Button>
              </View>
              {MOCK_CLAUSES.map((clause) => (
                <View style={styles.clause} key={clause.id}>
                  <Checkbox status={selectedClauses.includes(clause) ? 'checked' : 'unchecked'} onPress={() => handleClauseSelect(clause)} />
                  <Button mode="outlined" onPress={() => console.log('view clause')}>
                    {clause.text}
                  </Button>
                </View>
              ))}
            </View>
            <Button mode="contained" onPress={handleTradeConfirm} style={styles.confirmButton}>
              Confirm Trade
            </Button>
            {openModal && (
  <Modal animationType="slide" visible={openModal} onRequestClose={() => {setOpenModal(false);}} 
  style={{flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }}
 >
    <Text style={{
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: '#000',
    }}>Please enter the OTP to verify your number</Text>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginTop: 20,
    }}>
      <TextInput
        style={{
          borderBottomWidth: 1,
          width: 40,
          textAlign: 'center',
          fontSize: 20,
        }}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          width: 40,
          textAlign: 'center',
          fontSize: 20,
        }}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          width: 40,
          textAlign: 'center',
          fontSize: 20,
        }}
        keyboardType="number-pad"
        maxLength={1}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          width: 40,
          textAlign: 'center',
          fontSize: 20,
        }}
        keyboardType="number-pad"
        maxLength={1}
      />
    </View>
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginTop: 20,
    }}>
      <Text style={{
        fontSize: 16,
        color: '#000',
      }}>Resend OTP</Text>
      <Text style={{
        fontSize: 16,
        color: '#000',
      }}>Change Number</Text>
    </View>
    <Button

      onPress={() => setOpenModal(false)}
      style={{
        backgroundColor: '#000',
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      <Text style={{
        color: '#fff',
      }}>Verify</Text>
    </Button>

  </Modal>
)}
          </>
        ) : (
          <>

            <View style={styles.cardsContainer}>
              {MOCK_CARDS.map((card) => (
                <Button key={card.id} onPress={() => handleCardSelect(card)} style={styles.card}>
                  {card.title}
                </Button>
              ))}
            </View>
            <Button mode="contained" onPress={() => console.log('create new card')} style={styles.createButton}>
              Create New Card
            </Button>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },

  cardDetails: {
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  cardTitle: {

    marginBottom: 16,
  },
  cardDescription: {

    marginBottom: 32,
  },
  clausesContainer: {
    padding: 16,
  },
  clausesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clause: {

    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  confirmButton: {
    margin: 16,
  },
});




export default CreateTradeScreen;