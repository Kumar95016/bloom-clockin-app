import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../../styles/Colors';
import Icons from '../../../assets/icons';

const ClockInDetails = () => {

    return (
        <View style={styles.content}>
            <Icons.logo width={150} height={150} style={styles.logo} />
            <Text style={styles.title}>
                Welcome to <Text style={styles.link}>bloomtrak</Text>
            </Text>
            <View style={styles.textcontainer}>
                <Text style={styles.subtitle}>{"Start Shift : (11-14-2024 01:29pm)"}</Text>
                <Text style={styles.endshift}>{"End Shift : (11-14-2024 01:30pm)"}</Text>
                <Text style={styles.helpus}>{"Thank you for helping us bloom!"}</Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                // onPress={handleDisagree}
                accessibilityLabel="Disagree Button"
            >
                <Text style={styles.buttonText}>Go to home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    logo: {
        marginBottom: -20,
    },
    textcontainer: {

    },
    endshift: {
        fontSize: 15,
        color: Colors.label,
        padding: 10,
        // textAlign: 'center',
        justifyContent: "flex-start",
        marginBottom: -20
    },
    helpus: {
        fontSize: 15,
        color: Colors.label,
        padding: 10,
        // textAlign: 'center',
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 26,
        color: Colors.title,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.label,
        padding: 10,
        // textAlign: 'center',
        justifyContent: "flex-start",
        marginBottom: -20
    },
    helpingtext: {
        fontSize: 15,
        color: Colors.label,
        padding: 10,
        justifyContent: "flex-start",
        marginTop: -15
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 40,
        gap: 10
    },
    button: {
        backgroundColor: Colors.globalorange,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: Colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    link: {
        color: Colors.globalorange,
        fontSize: 26,
        fontWeight: '700',
    },
});

export default ClockInDetails;
