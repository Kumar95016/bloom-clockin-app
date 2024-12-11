import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View } from 'react-native';
import Splash from './screens/splash';
import RouteNavigator from './components/navigation/RouteNavigation';

const Main = () => {
    const [show, setshow] = useState(true);

    setTimeout(() => {
        setshow(false);
    }, 1000);

    return (

        show === true ?
            <Splash /> :
            <View style={{ flex: 1 }}>
                {/* <Loader> */}
                <RouteNavigator />
                {/* </Loader>  */}
            </View>
    );
}

export default Main;