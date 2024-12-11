import React from 'react';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

// Custom hook for displaying toast
export const useCustomToast = () => {
  const toast = useToast();

  const showToast = (type, message) => {
    toast.show(message, {
      type: type,
      placement: 'top',
      animationType: 'zoom-in',
      swipeEnabled: true,
      duration: 3000,
      style: [
        styles.toastContainer,
        type === 'success' ? styles.successToast : styles.errorToast,
      ],
      textStyle: styles.text,
      successIcon: (
        <Icon
          name={type === 'success' ? 'check-circle' : 'error'}
          size={24}
          color="white"
        />
      ),
      onPress: () => {
        toast.hide();
      },
    });
  };

  return { showToast };
};

const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 8,
    left: 70,
    width: 220,
  },
  successToast: {
    backgroundColor: '#28a745',
  },
  errorToast: {
    backgroundColor: '#dc3545',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
