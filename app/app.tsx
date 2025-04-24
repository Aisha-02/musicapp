import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Layout from '../app/_layout';
//mport { GoogleSignin } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId: '814924696691-li0q9bhp5biqr04183filtevf7pi8bn0.apps.googleusercontent.com', // very important
// });

export default function App() {
  return (
    <>
    <NavigationContainer>
      <Layout />
    </NavigationContainer>
    </>
  );
}
