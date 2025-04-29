import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import styles from '../styles/PrefereneStyles';

// Reusable Question Component
const Question = ({ title, type, options, selectedValues, onSelect, onPickImage, onChangeText }: any) => {
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
    } else if (type === 'text') {
      // Text input (e.g., bio, current vibe, pronouns)
      return (
        <TextInput
          style={styles.input}
          value={selectedValues}
          onChangeText={onSelect}
          placeholder="Type here..."
        />
      );
    } else if (type === 'date') {
      // Date input (e.g., birthday)
      return (
        <TextInput
          style={styles.input}
          value={selectedValues}
          onChangeText={onSelect}
          placeholder="Select a date"
        />
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
