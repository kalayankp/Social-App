import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from "react-native";


const Clause = ({ clause, index, isEditing, handleEdit, handleSave }) => {
    const myImage = require('../../asset/Assets/Icons/editButton.png');
    const [isEditingClause, setIsEditingClause] = React.useState(false);
    const [clauseText, setClauseText] = React.useState(clause);
    
    const handleEditClause = () => {
        setIsEditingClause(true);
    };
    
    const handleSaveClause = () => {
        setIsEditingClause(false);
        // Here you can handle the logic to save the changes made to the clause
    };
    
    return (
        <View style={styles.container}>
        <View style={styles.titleContainer}>
            {isEditingClause ? (
            <TextInput
                style={styles.titleInput}
                value={clauseText}
                onChangeText={(text) => setClauseText(text)}
            />
            ) : (
            <Text style={styles.title}>{clauseText}</Text>
            )}
    
            {isEditingClause ? (
            <TouchableOpacity style={styles.editButton} onPress={handleSaveClause}>
                <Text style={styles.editButtonText}>Save</Text>
            </TouchableOpacity>
            ) : (
            <TouchableOpacity style={styles.editButton} onPress={handleEditClause}>
                {/* <Text style={styles.editButtonText}>Edit</Text> */}
                <Image style={styles.editButtonText} source={myImage} />
            </TouchableOpacity>
            )}
        </View>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    title: {

        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },

    titleInput: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        width: "80%",
    },

    editButton: {
        color:'#FF6666',
        padding: 10,
        borderRadius: 5,
    },
    editButtonText:{
        color: "#FF6666",
        padding: 10,
    }
});

export default Clause;
