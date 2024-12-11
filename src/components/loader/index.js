import React from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../styles/Colors';

const Loader = () => {
  const { isLoading, message } = useSelector((state) => state.loader);

  if (!isLoading) return null;

  return (
    <Modal transparent={true} animationType="fade" visible={isLoading}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={40} color={Colors.globalorange}/>
          {/* {message ? <Text style={styles.message}>{message}</Text> : null} */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    width: 150,
    padding: 20,
    // backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Loader;
