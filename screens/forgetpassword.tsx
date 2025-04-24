import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../firebaseconfig.js';
import { Colors } from '../constants/Colors';
import styles from '../styles/AuthStyles';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';

const ForgetPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleForgetPassword = async () => {
    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'Please enter your email address.',
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: 'success',
        text1: 'Success 🎉',
        text2: 'Password reset email sent!',
      });
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reset Your Password</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your registered email"
          placeholderTextColor={Colors.dark.icon}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Ionicons name="mail-outline" size={24} color="#888" style={styles.inputIcon} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleForgetPassword}>
        <Text style={styles.loginButtonText}>Send Reset Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.registerText}>
          Back to <Text style={styles.registerLink}>Login</Text>
        </Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default ForgetPasswordScreen;
