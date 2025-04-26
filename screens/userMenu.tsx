import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import app from '../firebaseconfig';
import styles from '../styles/PrefereneStyles';

interface Props {
  onClose: () => void;
}

const MenuScreen: React.FC<Props> = ({ onClose }) => {
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const prefDoc = await getDoc(doc(db, 'user_preferences', user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.username || 'User');
        }

        if (prefDoc.exists()) {
          const prefData = prefDoc.data();
          setProfilePic(prefData.profilePic || 'https://via.placeholder.com/100');
        }
      }
    };

    fetchUserData();
  }, []);

  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    onClose(); // Close menu
  };

  const menuItems = [
    'Your Connections',
    'Playlists',
    'Settings',
    'Help & Support',
    'Logout',
  ];

  return (
    <Animated.View
      style={[
        styles.drawerContainer,
        { transform: [{ translateX: slideAnim }] },
      ]}
    >
      {/* Cancel Icon */}
      <TouchableOpacity style={styles.cancelIcon} onPress={onClose}>
        <Ionicons name="close" size={28} color="white" />
      </TouchableOpacity>

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Menu Options */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item === 'Logout' ? handleLogout : () => {}}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              item === 'Logout' && styles.logoutText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

export default MenuScreen;
