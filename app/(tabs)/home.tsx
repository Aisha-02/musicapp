import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons'; // for chat icon
import app from '../../firebaseconfig';
import { useNavigation } from '@react-navigation/native';
import MenuScreen from '@/screens/userMenu';


const Home = () => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.username || 'User');
          setProfilePic(data.profilePic || 'https://i.imgur.com/placeholder.png');
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: profilePic }} style={styles.avatar} />
          <Text style={styles.greeting}>Hi, {userName}</Text>
        </View>
        <TouchableOpacity style={styles.chatIcon}>
        {/* <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" /> */}
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
        </TouchableOpacity>        
          {/* Hamburger Icon */}
          <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
      </View>

      {/* Scrollable content goes here */}
      <View style={styles.content}>
        <Text style={styles.text}>scrollable content </Text>
      </View>

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  chatIcon: {
    padding: 4,
  },
  content: {
    paddingVertical: 20,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
  },
});
