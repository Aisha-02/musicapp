import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 50, // Adjusted padding to ensure space at the bottom for the button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.chipUnselected,
    marginRight: 8,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: Colors.chipSelected,
  },
  chipText: {
    fontSize: 14,
    color: Colors.chipTextUnselected,
  },
  chipTextSelected: {
    color: Colors.chipTextSelected,
  },
  nextButton: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    color: Colors.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: Colors.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  
  uploadText: {
    color: Colors.subText,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  }
});

export default styles;
