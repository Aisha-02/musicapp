import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ForgetPassword from '../screens/forgetpassword';
import TabLayout from './(tabs)/TabLayout'; // Tab navigator
import MenuScreen from '@/screens/userMenu';

const Stack = createNativeStackNavigator();

const AppLayout = () => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Forget" component={ForgetPassword} />
        <Stack.Screen name="Home" component={TabLayout} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
  );
}
export default AppLayout;





