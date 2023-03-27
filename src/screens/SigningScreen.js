import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";


const SigningScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [loaded] = useFonts();
    
    if (!loaded) {
        return <AppLoading />;
    }
    
    return (
        <View
        style={{
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: insets.top,
        }}
        >
        <View style={styles.container}>
            <View style={styles.header}>
            <View style={styles.headerContent}>
                
                <Text style={styles.name}>John Doe</Text>
            </View>
            </View>
    
            <View style={styles.body}>
            <View style={styles.bodyContent}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.info}>UX Designer / Mobile developer</Text>
                <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe eripuit invenire eu vim, eam
                an brute veritus. Ei eum quodsi veritus, adhuc facete ut cum. Ei
                eum quodsi veritus, adhuc facete ut cum.
                </Text>
    
                <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </View>
    );
    }


export default SigningScreen;