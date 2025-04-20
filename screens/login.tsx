import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword , GoogleAuthProvider , signInWithCredential} from 'firebase/auth';
import auth from '../firebaseconfig.js'; // Adjust the path to your firebase config 
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth , email, password);
      Alert.alert('Success', 'Login successful');
      // Navigate to home or next screen
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(response.data?.idToken);
      await  signInWithCredential(auth , googleCredential);
      Alert.alert('Success', 'Google Login successful');
      // Navigate to home or next screen
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google login');
      } else {
        console.error(error);
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword'); // Navigate to the Forget Password screen
  };

  const handleRegister = () => {
    navigation.navigate('Register'); // Navigate to the Register screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {/* <Button title="Login with Google" onPress={handleGoogleLogin} /> */}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>Don't have an account? Register</Text>
      <Text style={styles.link} onPress={handleForgetPassword}>Forgot Password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
