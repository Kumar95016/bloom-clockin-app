import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const Welcome = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.content}>
                    <Icons.logo width={300} height={300} style={styles.logo} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF6633',
        paddingVertical: 12,
        paddingHorizontal: 130,
        borderRadius: 8,
        marginBottom: 113
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
    },
});

export default Welcome;
