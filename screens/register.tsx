import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebaseconfig.js';
import { getFirestore, collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Colors } from '../constants/Colors'; // Import your Colors.ts

const RegisterScreen = ({ navigation }: any) => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const themeColors = Colors.dark; // Force dark mode

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!userId || !username || !email || !phone || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const db = getFirestore();
      const userIdQuery = query(collection(db, 'users'), where('userId', '==', userId));
      const userIdSnapshot = await getDocs(userIdQuery);

      if (!userIdSnapshot.empty) {
        Alert.alert('Error', 'User ID already taken. Please choose another.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(collection(db, 'users'), userCredential.user.uid), {
        userId: userId,
        username: username,
        email: email,
        phone: phone,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.header, { color: Colors.PRIMARY }]}>Create an Account</Text>

      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="User ID (Unique)"
        placeholderTextColor={themeColors.icon}
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Full Name"
        placeholderTextColor={themeColors.icon}
        value={username}
        onChangeText={setUsername}
      />
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
        placeholder="Phone"
        placeholderTextColor={themeColors.icon}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Password"
        placeholderTextColor={themeColors.icon}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, { borderColor: Colors.PRIMARY, color: themeColors.text }]}
        placeholder="Confirm Password"
        placeholderTextColor={themeColors.icon}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.buttonWrapper}>
        <Button title="Register" onPress={handleRegister} color={Colors.PRIMARY} />
      </View>

      <Text style={[styles.link, { color: Colors.PRIMARY }]} onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

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
    backgroundColor: '#222326', // Bluish-dark input bg
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
