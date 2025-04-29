import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Question from '../components/Question';
import { Colors } from '../constants/Colors';
import styles from '../styles/PrefereneStyles';

const vibeOptions = ['Chill AF 🤘', 'Party Animal 🥳', 'Hopeless Romantic 🔥', 'Filmy & Dramatic 🎬', 'Meme Lord 😂', 'Rizzy 😍'];
const musicOptions = ['Bollywood', 'Indie', 'Hip-Hop/Rap', 'LO-FI', 'Pop', 'Rock', 'Sufi', 'Classical'];
const connectionVibes = ['Deep conversations', 'Fun and Flirty', 'Just vibing with music', 'Travel buddy', 'Serious relationship', 'Chill friendships'];
const musicLanguages = ['Hindi', 'English', 'Punjabi', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Other'];
const openToDifferentTaste = ['Hell yes!', 'Maybe, if we vibe otherwise', 'Nah, music taste is everything'];

const CompleteProfile = ({ route, navigation }: any) => {
  const userId = route.params?.uid;
  const db = getFirestore();
  const storage = getStorage();

  const [currentPage, setCurrentPage] = useState(0);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [currentVibe, setCurrentVibe] = useState('');
  const [birthday, setBirthday] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [vibe, setVibe] = useState('');
  const [musicTaste, setMusicTaste] = useState<string[]>([]);
  const [idealConnection, setIdealConnection] = useState('');
  const [musicLangPref, setMusicLangPref] = useState<string[]>([]);
  const [openToDifferentMusic, setOpenToDifferentMusic] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  const pages = [
    // Screen 1
    () => (
      <View>
        <Question
          title="'Upload your vibe pic 📸'"
          type="image"
          selectedValues={profilePic}
          onPickImage={pickImage}
        />
        <Question
          title='Write a short and fun bio ✍️'
          type='text'
          selectedValues={bio}
          onSelect={setBio}
        />

        <Question
          title='Your current vibe is... 🎯'
          type='text'
          selectedValues={currentVibe}
          onSelect={setCurrentVibe}
        />

        <Question
          title='When’s your birthday? 🎂'
          type='date'
          selectedValues={birthday}
          onSelect={setBirthday}
        />

        <Question
          title='Relationship status 💞'
          type='text'
          selectedValues={relationshipStatus}
          onSelect={setRelationshipStatus}
        />
        <Question
          title="Your pronouns are... 🏳️‍🌈"
          type="text"
          selectedValues={pronouns}
          onSelect={setPronouns}
        />
      </View>
    ),
    // Screen 2
    () => (
      <Question
        title="Pick one that screams *you* 🌟"
        type="chip"
        options={vibeOptions}
        selectedValues={vibe}
        onSelect={setVibe}
      />
    ),
    // Screen 3
    () => (
      <Question
        title="Your playlist vibes with...? 🎵"
        type="chip"
        options={musicOptions}
        selectedValues={musicTaste}
        onSelect={(item: string) => toggleSelection(item, musicTaste, setMusicTaste)}
      />
    ),
    // Screen 4
    () => (
      <Question
        title="What kind of connection are you really vibing with? 💛"
        type="chip"
        options={connectionVibes}
        selectedValues={idealConnection}
        onSelect={setIdealConnection}
      />
    ),
    // Screen 5
    () => (
      <>
        <Question
          title="Languages you groove to 🔊"
          type="chip"
          options={musicLanguages}
          selectedValues={musicLangPref}
          onSelect={(item: string) => toggleSelection(item, musicLangPref, setMusicLangPref)}
        />
        <Question
          title="Would you connect with someone who loves different music? 🎶"
          type="chip"
          options={openToDifferentTaste}
          selectedValues={openToDifferentMusic}
          onSelect={setOpenToDifferentMusic}
        />
      </>
    ),
  ];

  const toggleSelection = (item: string, list: string[], setter: Function) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleSubmit = async () => {
    try {
      let photoURL = '';
      if (profilePic) {
        const response = await fetch(profilePic);
        const blob = await response.blob();

        const photoRef = ref(storage, `user_photos/${userId}.jpg`);
        await uploadBytes(photoRef, blob);
        photoURL = await getDownloadURL(photoRef);
      }

      await setDoc(doc(db, 'user_preferences', userId), {
        profilePic: photoURL,
        bio,
        currentVibe,
        birthday,
        pronouns,
        relationshipStatus,
        vibe,
        musicTaste,
        idealConnection,
        musicLangPref,
        openToDifferentMusic,
      });

      navigation.dispatch(
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      {pages[currentPage]()}

      {currentPage > 0 && (
        <TouchableOpacity style={styles.navButton} onPress={() => setCurrentPage(currentPage - 1)}>
          <Ionicons name="arrow-back" size={24} color={Colors.icon} />
        </TouchableOpacity>
      )}

      {currentPage < pages.length - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={() => setCurrentPage(currentPage + 1)}>
          <Ionicons name="arrow-forward" size={24} color={Colors.icon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default CompleteProfile;
