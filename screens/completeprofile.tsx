import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import styles from '../styles/PrefereneStyles';

const vibeOptions = ['Chill AF 🤘', 'Party Animal 🥳', 'Hopeless Romantic 🔥', 'Filmy & Dramatic 🎬', 'Meme Lord 😂', 'Rizzy 😍'];
const musicOptions = ['Bollywood', 'Indie', 'Hip-Hop/Rap', 'LO-FI', 'Pop', 'Rock', 'Sufi', 'Classical'];

const UserPreferences = ({ route, navigation }: any) => {
    const userId = route.params?.uid;
    const db = getFirestore();
    const storage = getStorage();

    const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
    const [photo, setPhoto] = useState<string | null>(null);

    const toggleSelection = (item: string, list: string[], setter: Function) => {
        if (list.includes(item)) {
            setter(list.filter(i => i !== item));
        } else {
            setter([...list, item]);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        try {
            let photoURL = null;
            if (photo) {
                const response = await fetch(photo);
                const blob = await response.blob();

                const photoRef = ref(storage, `user_photos/${userId}.jpg`);
                await uploadBytes(photoRef, blob);
                photoURL = await getDownloadURL(photoRef);
            }

            // Create a new collection 'user_preferences'
            await setDoc(doc(db, 'user_preferences', userId), {
                vibes: selectedVibes,
                musicTaste: selectedMusic,
                profilePic: photoURL || '',
            });

            navigation.navigate('Home'); // or wherever next
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
            <Text style={styles.title}>Upload a Profile Picture</Text>
            <View style={styles.imagePickerContainer}>
                <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
                    {photo ? (
                        <Image source={{ uri: photo }} style={styles.image} />
                    ) : (
                        <Ionicons name="camera" size={32} color={Colors.icon} />
                    )}
                </TouchableOpacity>
                <Text style={styles.uploadText}>Upload a profile picture</Text>
            </View>

            <Text style={styles.title}>What’s your vibe like?</Text>
            <View style={styles.chipContainer}>
                {vibeOptions.map((vibe, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleSelection(vibe, selectedVibes, setSelectedVibes)}
                        style={[
                            styles.chip,
                            selectedVibes.includes(vibe) && styles.chipSelected,
                        ]}
                    >
                        <Text style={styles.chipText}>{vibe}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.title}>What’s your music taste?</Text>
            <View style={styles.chipContainer}>
                {musicOptions.map((music, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleSelection(music, selectedMusic, setSelectedMusic)}
                        style={[
                            styles.chip,
                            selectedMusic.includes(music) && styles.chipSelected,
                        ]}
                    >
                        <Text style={styles.chipText}>{music}</Text>
                    </TouchableOpacity>
                ))}
            </View>

                <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
                    <Text style={styles.nextButtonText}>Save Preferences</Text>
                </TouchableOpacity>
        </ScrollView>
    );
};

export default UserPreferences;
