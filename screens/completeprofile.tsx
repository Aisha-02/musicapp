import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Question from '../components/Question';  // Import the reusable Question component
import { Colors } from '../constants/Colors';
import styles from '../styles/PrefereneStyles';

const vibeOptions = ['Chill AF 🤘', 'Party Animal 🥳', 'Hopeless Romantic 🔥', 'Filmy & Dramatic 🎬', 'Meme Lord 😂', 'Rizzy 😍'];
const musicOptions = ['Bollywood', 'Indie', 'Hip-Hop/Rap', 'LO-FI', 'Pop', 'Rock', 'Sufi', 'Classical'];

const CompleteProfile = ({ route, navigation }: any) => {
  const userId = route.params?.uid;
  const db = getFirestore();
  const storage = getStorage();

  const [currentPage, setCurrentPage] = useState(0);
  const [vibes, setVibes] = useState<string[]>([]);
  const [musicTaste, setMusicTaste] = useState<string[]>([]);
  const [profilePic, setProfilePic] = useState<string | null>(null);

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

  const questions = [
    {
      title: "Upload a Profile Picture",
      type: 'image',
      selectedValues: profilePic,
      onSelect: null,
      onPickImage: pickImage,
    },
    {
      title: "What’s your vibe like?",
      type: 'chip',
      options: vibeOptions,
      selectedValues: vibes,
      onSelect: (vibe: string) => toggleSelection(vibe, vibes, setVibes),
      onPickImage: null,
    },
    {
      title: "What’s your music taste?",
      type: 'chip',
      options: musicOptions,
      selectedValues: musicTaste,
      onSelect: (music: string) => toggleSelection(music, musicTaste, setMusicTaste),
      onPickImage: null,
    },
  ];

  // Group questions in pairs (2 questions per page)
  const groupedQuestions = [];
  for (let i = 0; i < questions.length; i += 2) {
    groupedQuestions.push(questions.slice(i, i + 2));
  }

  const toggleSelection = (item: string, list: string[], setter: Function) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleNext = () => {
    if (currentPage < groupedQuestions.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      let photoURL = null;
      if (profilePic) {
        const response = await fetch(profilePic);
        const blob = await response.blob();

        const photoRef = ref(storage, `user_photos/${userId}.jpg`);
        await uploadBytes(photoRef, blob);
        photoURL = await getDownloadURL(photoRef);
      }

      // Create a new collection 'user_preferences'
      await setDoc(doc(db, 'user_preferences', userId), {
        vibes,
        musicTaste,
        profilePic: photoURL || '',
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
      {/* Render two questions per page */}
      {groupedQuestions[currentPage].map((question, index) => (
        <Question
          key={index}
          title={question.title}
          type={question.type}
          options={question.options}
          selectedValues={question.selectedValues}
          onSelect={question.onSelect}
          onPickImage={question.onPickImage}
        />
      ))}

      {/* Back Button (only visible on middle pages) */}
      {currentPage > 0 && currentPage < groupedQuestions.length - 1 ? (
        <TouchableOpacity style={styles.navButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.icon} />
        </TouchableOpacity>
      ) : null}

      {/* Next Button */}
      {currentPage < groupedQuestions.length - 1 ? (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
