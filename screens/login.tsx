import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebaseconfig.js'; 
import { Colors } from '../constants/Colors'; // Import your color theme

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const themeColors = Colors.dark; // FORCE dark theme

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login successful');
      navigation.navigate('Home');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('Forget');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.header, { color: Colors.PRIMARY }]}>Welcome Back 👋</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Email"
        placeholderTextColor={themeColors.icon}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Password"
        placeholderTextColor={themeColors.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} color={Colors.PRIMARY} />
      </View>

      <Text style={[styles.link, { color: Colors.PRIMARY }]} onPress={handleRegister}>
        Don't have an account? <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>Register</Text>
      </Text>

      <Text style={[styles.link, { color: Colors.PRIMARY }]} onPress={handleForgetPassword}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#222326', // Slight bluish-black shade to contrast
  },
  buttonWrapper: {
    marginVertical: 20,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
