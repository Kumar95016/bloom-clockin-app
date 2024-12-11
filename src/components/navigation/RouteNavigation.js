import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../../screens/welcome';
import Login from '../../screens/login';
import ShiftPin from '../../screens/shiftpin';
import Layout from '../layout';
import ClockInVerification from '../../screens/clockinverification';
import ClockInProcess from '../../screens/clockinprocess';
import ClockInDetails from '../../screens/clockIndetails';

const Stack = createStackNavigator();

const RouteNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" >
          {(props) => (
            <Layout {...props}>
              <Welcome {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="Login" >
          {(props) => (
            <Layout {...props}>
              <Login {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="ShiftPin" >
          {(props) => (
            <Layout {...props}>
              <ShiftPin {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="ClockInVerification" >
          {(props) => (
            <Layout {...props}>
              <ClockInVerification {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="ClockInProcess" >
          {(props) => (
            <Layout {...props}>
              <ClockInProcess {...props} />
            </Layout>
          )}
        </Stack.Screen>
        <Stack.Screen name="ClockInDetails" >
          {(props) => (
            <Layout {...props}>
              <ClockInDetails {...props} />
            </Layout>
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
