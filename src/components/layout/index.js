// Layout.js
import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import CommonHeader from '../commonheader';
import CommonFooter from '../commonfooter';

const Layout = ({ children }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <CommonHeader />

            <View style={styles.content}>
                {children}
            </View>

            <CommonFooter />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
});

export default Layout;