import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Icons from '../../../assets/icons';

const CommonFooter = () => {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get('window');
      const newOrientation = width < height ? 'PORTRAIT' : 'LANDSCAPE';

      setOrientation(newOrientation);
    };

    const dimensionSubscription = Dimensions.addEventListener('change', updateOrientation);

    updateOrientation();

    return () => {
      dimensionSubscription.remove();
    };
  }, []); 

  return (
    <View style={{ height: orientation === 'PORTRAIT' ? 105 : 200  }}>
      <Icons.footer height={'100%'} width={'101%'} />
    </View>
  );
};

export default CommonFooter;
