import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../../styles/Colors';
import { verify } from '../../services/verifyuser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, stopLoading } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
import { useCustomToast } from '../../toastmessage';
import { Asignedshift } from '../../services/getuserasignedshift';
import { GetClockIn } from '../../services/getshiftclockin';

const ShiftPin = () => {
    const { showToast } = useCustomToast();
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isShiftDropdownVisible, setShiftDropdownVisible] = useState(false);
    const [selectedShift, setSelectedShift] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [listdata, setListData] = useState([]);
    const [agencyData, setAgencyData] = useState('');
    const [shiftId, setShiftId] = useState('');
    const navigation = useNavigation();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: "2-digit", day: "2-digit", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "pm" : "am";
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return `${formattedDate} ${formattedTime}`;
    }

    const LoginSchema = Yup.object().shape({
        username: Yup.string()
            .test(
                'username-or-shiftPin',
                'Please enter your username or PIN, not both',
                function (value) {
                    const { password, shiftPin } = this.parent;
                    if (shiftPin) return true;
                    return value ? true : this.createError({ message: 'Please enter your username' });
                }
            ),
        password: Yup.string()
            .test(
                'password-or-shiftPin',
                'Password is required unless PIN is entered',
                function (value) {
                    const { username, shiftPin } = this.parent;
                    if (shiftPin) return true;
                    return username && value ? true : this.createError({ message: 'Password is required' });
                }
            ),
        shiftPin: Yup.string()
            .test(
                'shiftPin-or-email-password',
                'PIN is required unless email and password are entered',
                function (value) {
                    const { email, password } = this.parent;
                    if (email && password) return true;
                    return value ? true : this.createError({ message: 'Please enter your PIN' });
                }
            ),
    });



    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const toggleShiftDropdown = () => {
        setShiftDropdownVisible(!isShiftDropdownVisible);
    };

    const selectShift = async (shift, setFieldValue) => {
        try {
            const shiftDisplay = `${shift.positions} (${formatDate(shift.created_at)})`;
            setSelectedShift(shiftDisplay);
            setFieldValue('selectedShift', shift.id.toString());
            setFieldValue('shiftDetails', shiftDisplay);

            setShiftId(shift.shift_id)
            await getAsignedshitUser(shift.shift_id);

            setShiftDropdownVisible(false);
        } catch (error) {
            console.error('Error selecting shift:', error);
            showToast('danger', 'Failed to select shift');
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        // navigation.navigate('Home');
    };

    const getShiftClockIn = async () => {
        dispatch(startLoading());

        try {
            const response = await GetClockIn(shiftId, agencyData);
            // console.log(agencyData, "agencuDatata=========????????????")
            AsyncStorage.setItem('shift_id', shiftId);
            AsyncStorage.setItem('agency_id', agencyData);
            // console.log(response, "responseClockIn======>>>>>>>>>")
            if (response.err == false) {
                navigation.navigate("ClockInVerification")
                showToast('success', response.msg);
            }
            else {
                showToast('danger', response.msg)
            }

        } catch (error) {
            console.log(error)
        } finally {
            dispatch(stopLoading());
        }
    };


    const getAsignedshitUser = async (shiftId) => {
        // console.log(shiftId, "shiftid.........")
        dispatch(startLoading());

        try {
            const response = await Asignedshift(shiftId);
            // const agencies = response.body.map((data) => data.aggency_id);
            // setAgencyData(agencies);
            response.body.forEach((data, index) => {
                console.log(data.aggency_id, "agencytDatatatatat=========>>>")
                setAgencyData(data.aggency_id);
            });
        } catch (error) {
            console.error('Error getting assigned shift:', error);
        } finally {
            dispatch(stopLoading());
        }
    };

    const handleLogin = async (values) => {
        dispatch(startLoading());
        try {

            const user_id = await AsyncStorage.getItem('user_id');

            let data;
            if (values.username && values.password) {
                data = {
                    username: values.username,
                    password: values.password,
                    shift_key: values.shiftPin,
                    community_id: user_id,
                };
            } else {
                data = {
                    shift_key: values.shiftPin,
                    community_id: user_id,
                };
            }

            const response = await verify(data);
            console.log(response, "finaallllyyyyy======>>>>>>>>")
            // console.log(response.body.agAssignedShift, "asignedshiftresponse====>")
            setListData(response.body.agAssignedShift);

            if (response.error === true) {
                setModalVisible(true);
                // showToast('success', response.msg);
                // navigation.navigate("ShiftPin");
            } else {
                showToast('danger', response.msg);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(stopLoading());
        }
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    shiftPin: '',
                    selectedShift: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => handleLogin(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    setFieldValue
                }) => (
                    <View style={styles.content}>
                        <Icons.logo width={150} height={150} style={styles.logo} />
                        <Text style={styles.title}>
                            Welcome to <Text style={styles.link}>bloomtrak</Text>
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter Your User Name</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your user name"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    placeholderTextColor="#808080"
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    disabled={values.shiftPin ? true : false}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <HelperText style={styles.errorMessage} type="error">
                                    {errors.username}
                                </HelperText>
                            )}

                            <Text style={styles.label}>Enter Your Password</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={secureTextEntry}
                                    placeholderTextColor="#808080"
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    disabled={((values.shiftPin)) ? true : false}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIconContainer}
                                    onPress={togglePasswordVisibility}
                                >
                                    <Icon
                                        name={secureTextEntry ? 'visibility-off' : 'visibility'}
                                        size={24}
                                        color="#808080"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && touched.password && (
                                <HelperText style={styles.errorMessage} type="error">
                                    {errors.password}
                                </HelperText>
                            )}
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.line} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.line} />
                        </View>
                        {/* {  <> */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Enter Your Shift Pin</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your pin"
                                    value={values.shiftPin}
                                    onChangeText={handleChange('shiftPin')}
                                    onBlur={handleBlur('shiftPin')}
                                    placeholderTextColor="#808080"
                                    keyboardType="numeric"
                                    underlineColor="transparent"
                                    activeUnderlineColor="transparent"
                                    disabled={((values.email) || (values.password)) ? true : false}
                                />
                                {/* </>
                       
                          } */}
                            </View>
                            {errors.shiftPin && touched.shiftPin && (
                                <HelperText style={styles.errorMessage} type="error">
                                    {errors.shiftPin}
                                </HelperText>
                            )}
                            <Text style={styles.subtitle}>
                                Note: You will only see your shifts that start within 1 hour. Check your
                                bloomtrak portal for a list of your assigned shifts.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleSubmit(values)}
                            >
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Refresh</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Modal for Shift Selection */}
                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            animationType="slide"
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <View style={styles.header}>
                                        <Text style={styles.modalTitle}>Shift Details</Text>
                                        <TouchableOpacity onPress={closeModal}>
                                            <Icon
                                                name="close"
                                                size={25}
                                                color={Colors.globalorange}
                                                style={styles.crossicon}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.label}>Select Your Shift</Text>
                                    <TouchableOpacity onPress={toggleShiftDropdown}>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Select your shift"
                                                value={values.shiftDetails}
                                                editable={false}
                                                underlineColor="transparent"
                                                activeUnderlineColor="transparent"
                                                placeholderTextColor="#808080"
                                            />

                                            <Icon name="keyboard-arrow-down" size={26} color="#808080" />
                                        </View>
                                    </TouchableOpacity>

                                    {isShiftDropdownVisible && (
                                        <View style={styles.dropdownContainer}>
                                            {listdata ? (
                                                <FlatList
                                                    data={listdata}
                                                    renderItem={({ item }) => (
                                                        <TouchableOpacity
                                                            style={styles.dropdownItem}
                                                            onPress={() => selectShift(item, setFieldValue)}
                                                        >
                                                            <Text style={styles.dropdownItemText}>
                                                                {`${item.positions} (${formatDate(item.created_at)})`}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    keyExtractor={(item) => item.id.toString()}
                                                />
                                            ) : (
                                                <Text style={styles.noDataText}>No data found</Text>
                                            )}
                                        </View>
                                    )}


                                    <TouchableOpacity
                                        style={[styles.button, { opacity: values.selectedShift ? 1 : 0.5 }]}
                                        onPress={() => {
                                            closeModal();
                                            getShiftClockIn();
                                            // navigation.navigate('ClockInVerification');
                                        }}
                                        disabled={!values.selectedShift}
                                    >
                                        <Text style={styles.buttonText}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.globalbackground,
    },
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
    link: {
        color: Colors.globalorange,
        fontSize: 26,
        fontWeight: '700',
    },
    inputContainer: {
        width: '100%',
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        color: Colors.label,
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 45,
        borderColor: Colors.bordercolor,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: '100%',
        // width: 100,
        fontSize: 15,
        backgroundColor: 'transparent',
    },
    eyeIconContainer: {
        paddingRight: 15,
    },
    button: {
        backgroundColor: Colors.globalorange,
        paddingVertical: 12,
        borderRadius: 8,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    buttonText: {
        color: Colors.buttonText,
        fontSize: 18,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.bordercolor,
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 14,
        color: '#000',
    },
    subtitle: {
        fontSize: 15,
        color: Colors.subtitle,
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.globalorange,
    },
    errorMessage: {
        color: Colors.error,
        marginTop: -15
    },
    crossicon: {
        borderRadius: 40,
        height: 25,
        width: 25,
        backgroundColor: Colors.cross,
    },
    dropdownContainer: {
        maxHeight: 200,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: Colors.bordercolor,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginTop: -20,
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#333",
    },
    noDataText: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        padding: 10,
    },
});

export default ShiftPin;
