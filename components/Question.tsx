import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import styles from '../styles/PrefereneStyles';

// Reusable Question Component
const Question = ({ title, type, options, selectedValues, onSelect, onPickImage }: any) => {
  const renderOptions = () => {
    if (type === 'image') {
      // Image Picker (e.g., profile photo)
      return (
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={onPickImage}>
            {selectedValues ? (
              <Image source={{ uri: selectedValues }} style={styles.image} />
            ) : (
              <Ionicons name="camera" size={32} color={Colors.icon} />
            )}
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload a profile picture</Text>
        </View>
      );
    } else if (type === 'chip') {
      // Options as Chips (e.g., vibes or music)
      return (
        <View style={styles.chipContainer}>
          {options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect && onSelect(option)}
              style={[
                styles.chip,
                selectedValues.includes(option) && styles.chipSelected,
              ]}
            >
              <Text style={styles.chipText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {renderOptions()}
    </View>
  );
};

export default Question;
