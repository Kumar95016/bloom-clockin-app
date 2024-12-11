import React, { useEffect, useState } from 'react'
import { View, Dimensions } from 'react-native'
import Icons from '../../../assets/icons'

const CommonHeader = () => {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      const newOrientation = width < height ? 'PORTRAIT' : 'LANDSCAPE';

      setOrientation(newOrientation);
    };

    // Subscribe to dimension changes
    const dimensionSubscription = Dimensions.addEventListener('change', updateOrientation);

    // Initial orientation check
    updateOrientation();

    // Cleanup function
    return () => {
      // Remove the event listener
      dimensionSubscription.remove();
    };
  }, []); // Empty dependency array

  return (
    <View style={{ height: orientation === 'PORTRAIT' ? 110 : 200 }}>
      <Icons.header
        width={'100%'}
        height={'100%'}
      />
    </View>
  );
}

export default CommonHeader