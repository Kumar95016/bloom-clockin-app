import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
} from 'react-native';
import Colors from '../../styles/Colors'; // Ensure this file is correctly configured
import Icons from '../../../assets/icons'; // Ensure the logo is exported properly
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../../redux/slice/loadingSlice';
import { ShiftClockIn } from '../../services/shiftclockin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClockInVerification = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
    const dispatch = useDispatch();

    const sendClockInData = async (data) => {
        dispatch(startLoading());
        try {
            const response = await ShiftClockIn(data);
            console.log(`Step ${step} response:`, response);
        } catch (error) {
            console.error("Error in ShiftClock:", error);
        } finally {
            dispatch(stopLoading());
        }
    };

    const handleAgree = async () => {
        const agencyId = await AsyncStorage.getItem('agency_id');
        const shiftId = await AsyncStorage.getItem('shift_id');

        if (step === 1) {
            await sendClockInData({
                agency_id: agencyId,
                shift_id: shiftId,
                clockIn_delay: 1,
                is_agree: false,
                is_for: 'agency',
            });
        } else if (step === 2) {
            await sendClockInData({
                agency_id: agencyId,
                shift_id: shiftId,
                clockIn_responsibilities: 1,
                is_agree: false,
                is_for: 'agency',
            });
        } else if (step === 3) {
            await sendClockInData({
                agency_id: agencyId,
                shift_id: shiftId,
                clockIn_training: 1,
                is_agree: false,
                is_for: 'agency',
            });
            navigation.navigate('ClockInProcess');
        }

        if (step < 3) {
            setStep(step + 1); // Move to the next step
        }
    };

    const handleDisagree = async () => {
        const agencyId = await AsyncStorage.getItem('agency_id');
        const shiftId = await AsyncStorage.getItem('shift_id');

        await sendClockInData({
            agency_id: agencyId,
            shift_id: shiftId,
            clockIn_delay: '0',
            for_clockIn_delay: true,
            is_agree: true,
            is_for: 'agency',
        });

        setModalVisible(true); // Show the modal after API call
    };

    // Content based on the current step
    const getContent = () => {
        switch (step) {
            case 1:
                return {
                    title:
                        "I understand and agree that a break will be automatically deducted from my time for any shift that is over the Community’s designated shift length for automatic break deductions unless bloomtrak’s Agency Variance Form is filled out and signed by the appropriate community personnel. I understand and agree that it is my responsibility to take this break and that no exceptions shall be made without a completed form being uploaded.",
                };
            case 2:
                return {
                    title:
                        "I understand and agree that it is my responsibility to notify my Agency and the supervisor on duty immediately if I do not have the resources I need to complete my job. I will not wait until the end of my shift to communicate this information.",
                };
            case 3:
                return {
                    title:
                        "I have completed all requested paperwork and any additional end of shift reporting that the community has requested.",
                };
            default:
                return { title: "", subtitle: "" };
        }
    };

    const { title } = getContent();

    return (
        <View style={styles.content}>
            <Icons.logo width={150} height={150} style={styles.logo} />
            <Text style={styles.title}>
                Welcome to <Text style={styles.link}>bloomtrak</Text>
            </Text>
            <Text style={styles.subtitle}>{title}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAgree}
                    accessibilityLabel="Agree Button"
                >
                    <Text style={styles.buttonText}>I Agree</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleDisagree}
                    accessibilityLabel="Disagree Button"
                >
                    <Text style={styles.buttonText}>I don't Agree</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Component */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Do Not Agree Statement</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to select "Do Not Agree" to this statement? By doing so, you are not eligible to work
                            the shift and you should contact your Agency immediately to inform them that you are not eligible to work at this community.
                        </Text>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Pressable
                                style={styles.closeButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('ShiftPin');
                                }}
                            >
                                <Text style={styles.closeButtonText}>Yes, I Do not Agree</Text>
                            </Pressable>
                            <Pressable
                                style={styles.closeButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    // navigation.navigate('ShiftPin');
                                }}
                            >
                                <Text style={styles.closeButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    button: {
        backgroundColor: Colors.globalorange,
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: Colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
    },
    link: {
        color: Colors.globalorange,
        fontSize: 26,
        fontWeight: '700',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: Colors.globalorange,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ClockInVerification;
