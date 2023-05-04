import React, { useState } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";




const SignedClause = (props) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.clause}>
                <Text style={styles.clauseText}>
                    {props.text}
                </Text>
            </View>
            <View style={styles.sign}>
                {props.isSigned ? <View
                        style={[
                            styles.circle,
                            styles.clickedCirclegreen
                        ]}
                    />:<TouchableOpacity onPress={() => {
                    setIsClicked(!isClicked)
                    props.sign(!isClicked)
                    console.log(isClicked)
                }}>
                    <View
                        style={[
                            styles.circle,
                            isClicked ? styles.clickedCircle : null,
                        ]}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    clause: {
        width: '80%'
    },
    clauseText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',

    },
    sign: {
        width: '20%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signButton: {
        width: 50,
        height: 50,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
    },
    clickedCircle: {
        backgroundColor: 'red',
        borderColor: 'white',
        borderWidth: 4,
    },
    clickedCirclegreen: {
        backgroundColor: 'green',
        borderColor: 'white',
        borderWidth: 4,
    }

});

export default SignedClause;
