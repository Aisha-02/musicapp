import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebaseconfig';
import { Colors } from '../constants/Colors';
import Toast from 'react-native-toast-message';
import styles from '../styles/AuthStyles'; // 👈 Importing shared styles
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'Please enter both email and password.',
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Login Successful 🎉',
        text2: 'Welcome back!',
      });
      navigation.dispatch(
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid credentials. Please try again.',
      });
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google Sign-in logic if needed
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgetPassword = () => {
    navigation.navigate('Forget');
  };

  return (
    <View style={styles.container}>
      
      <Image 
        source={require('../assets/images/logo.png')} // Replace with your logo
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email or Phone No"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={25} color="#888" style={styles.inputIcon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <Ionicons name="lock-closed-outline" size={24} color="#888" style={styles.inputIcon} />
        <Ionicons
          name={!isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={24}
          color="#888"
          style={[styles.inputIcon, { right: 16, left: 'auto', position: 'absolute' }]}
          onPress={() => setPasswordVisible(prev => !prev)}
        />
      </View>

      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.forgetPassword}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image 
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} // Replace with your Google logo
          resizeMode="contain"
          style={styles.googleLogo}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>
          New User? <Text style={styles.registerLink}>Register Here</Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default LoginScreen;
