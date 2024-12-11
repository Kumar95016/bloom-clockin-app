import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput, HelperText } from 'react-native-paper';
import Colors from '../../styles/Colors';
import { useDispatch } from 'react-redux';
import { useCustomToast } from '../../toastmessage';
import { startLoading, stopLoading } from '../../redux/slice/loadingSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/login';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { showToast } = useCustomToast();

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleLogin = async (values) => {
    dispatch(startLoading());

    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      const response = await login(data);

      console.log("API Response:", response);

      await AsyncStorage.setItem('user_id', response.body.id);
      await AsyncStorage.setItem('token', response.body.token);

      if (response.error === false) {
        showToast('success', response.msg);
        navigation.navigate("ShiftPin");
      } else {
        showToast('danger', response.msg);
      }
    } catch (error) {
      console.error("Error in handleLogin:", error);
      showToast('danger', 'An error occurred during login');
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <View style={styles.content}>
            <Icons.logo width={150} height={150} style={styles.logo} />
            <Text style={styles.title}>Please sign in to your account</Text>
            <Text style={styles.privacy}>
              By continuing, you agree to bloomtrak's{' '}
              <Text style={styles.link}>Terms & Conditions</Text> and{' '}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>

            <View style={styles.inputContainer}>
              {/* Username Input */}
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholderTextColor="#808080"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
              />
              {touched.username && errors.username && (
                <HelperText style={styles.errorText} type="error" visible>
                  {errors.username}
                </HelperText>
              )}

              {/* Password Input */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={secureTextEntry}
                  placeholderTextColor="#808080"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
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
              {touched.password && errors.password && (
                <HelperText
                  style={styles.passwordtext}
                  type="error"
                  visible
                >
                  {errors.password}
                </HelperText>
              )}
            </View>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.globalbackground,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -60,
  },
  title: {
    fontSize: 26,
    color: Colors.title,
    textAlign: 'center',
    marginBottom: 10,
  },
  privacy: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.subtitle,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 25,
  },
  link: {
    color: Colors.globalorange,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.label,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: Colors.bordercolor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderColor: Colors.bordercolor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  eyeIconContainer: {
    paddingRight: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.globalorange,
    paddingVertical: 12,
    width: '90%',
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginBottom: 10,
  },
  passwordtext: {
    fontSize: 12,
    color: Colors.error,
    marginTop: -15,
  }
});

export default Login;