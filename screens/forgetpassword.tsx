import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import auth from '../firebaseconfig.js';
import { Colors } from '../constants/Colors'; // Import your Colors.ts

const ForgetPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const themeColors = Colors.dark; // Force dark mode

  const handleForgetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset email sent! Please check your inbox.');
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.header, { color: Colors.PRIMARY }]}>Reset Your Password</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Enter your registered email"
        placeholderTextColor={themeColors.icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.buttonWrapper}>
        <Button title="Send Reset Email" onPress={handleForgetPassword} color={Colors.PRIMARY} />
      </View>

      <Text style={[styles.link, { color: Colors.PRIMARY }]} onPress={() => navigation.goBack()}>
        Back to Login
      </Text>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#222326', // Bluish-dark input background
  },
  buttonWrapper: {
    marginVertical: 20,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
