import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from '../../../assets/icons';

const Splash = () => {
    return (
        <View style={styles.container}>

            <View style={styles.logo}>
                <Icons.logo width={300} height={300} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#FF6633',
        paddingVertical: '3%',
        paddingHorizontal: '35%',
        borderRadius: 8,
        // marginBottom: "40%"
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    logo: {
        marginBottom: 100,
    }
});

export default Splash;
