import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingBottom: 50,
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
  },

  /** ------------ MENU SCREEN RELATED ------------- */

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent black overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  drawerContainer: {
    width: width * 0.75,
    backgroundColor: '#333',
    position: 'absolute',
    top: 20,
    left: 0,
    height: '100%', // make sure the menu is the full height of the screen
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 999,
    elevation: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  cancelIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: Colors.inputBackground,
  },
  userName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  menuContent: {
    marginTop: 70, // Push down content so it's below the cancel icon
    flex: 1,
    paddingBottom: 50, // Space at the bottom for scrollable menu
  },
  menuItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuText: {
    color: Colors.text,
    fontSize: 17,
  },
  logoutText: {
    color: '#FF5C5C',
  },
});

export default styles;