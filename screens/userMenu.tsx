import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import app from '../firebaseconfig';

const MenuScreen = () => {
  const [userName, setUserName] = useState(''); 
  const [profilePic, setProfilePic] = useState(''); 
  const navigation = useNavigation<any>();
  const auth = getAuth(app);
  const db = getFirestore(app);
  
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

  // Slide-in animation
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        transform: [{ translateX: slideAnim }],
      }}
    >
      {/* Profile Section */}
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Image
          source={{
            uri: profilePic || 'https://via.placeholder.com/100',
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginBottom: 10,
          }}
        />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          { userName || 'User Name'}
          
        </Text>
      </View>

      {/* Menu Options */}
      {[
        'Your Connections',
        'Playlists',
        'Settings',
        'Help & Support',
        'Logout',
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item === 'Logout' ? handleLogout : () => {}}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              item === 'Logout' && { color: '#FF5C5C' },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = {
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e2e',
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
};

export default MenuScreen;
