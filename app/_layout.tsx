import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import SplashScreen from '../screens/splash';
import ForgetPassword from '../screens/forgetpassword';
import { NavigationContainer } from '@react-navigation/native';
import TabLayout from './(tabs)/TabLayout'; // Tab navigator

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forget" component={ForgetPassword} />
        <Stack.Screen name="Home" component={TabLayout} />

      </Stack.Navigator>
  );
}
export default AppLayout;





