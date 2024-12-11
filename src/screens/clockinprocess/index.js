import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../../styles/Colors';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';

const ClockInProcess = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(1); // Step state starts at 1

    const handleAgree = () => {
        if (step < 2) {
            setStep(step + 1); // Move to the next step
        } else {
            navigation.navigate("ClockInDetails")
            console.log("Final agree action"); // Add logic for final step here
        }
    };

    const handleDisagree = () => {
        if (step < 2) {
            setStep(step + 1); // Move to the next step
        } else {
            console.log("Final disagree action"); // Add logic for final step here
        }
    };

    // Content based on the current step
    const getContent = () => {
        switch (step) {
            case 1:
                return {
                    title: "Thank you for helping us bloom!"
                };
            case 2:
                return {
                    title: "Start Shift : (11-14-2024 01:29pm)",
                    subtitle: "Thank you for helping us bloom!"
                };
            default:
                return { title: "", subtitle: "" };
        }
    };

    const { title, subtitle } = getContent();

    return (
        <View style={styles.content}>
            <Icons.logo width={150} height={150} style={styles.logo} />
            <Text style={styles.title}>
                Welcome to <Text style={styles.link}>bloomtrak</Text>
            </Text>
            <Text style={styles.subtitle}>{title}</Text>
            {step == 2 ? <Text style={styles.helpingtext}>{subtitle}</Text> : ""}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAgree}
                    accessibilityLabel="Agree Button"
                >
                    <Text style={styles.buttonText}> {step == 1 ? "Clock In" : "Start the Clock-Out process"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleDisagree}
                    accessibilityLabel="Disagree Button"
                >
                    <Text style={styles.buttonText}>{step == 1 ? "Back to clock In-out" : "Go to home"}</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: "flex-start"
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

export default ClockInProcess;
