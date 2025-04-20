import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';

const SplashScreen = () => {
  const navigation = useNavigation();
  const video = useRef(null);

  const handleContinue = () => {
    navigation.navigate('Login' as never);  // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require('../assets/videos/splash.mp4')}  // your splash video here
        shouldPlay
        resizeMode={ResizeMode.COVER}
        isLooping
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: { flex: 1 },
  button: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
