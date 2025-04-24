import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // pure black
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 150,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#222326',
    paddingLeft: 50,
    paddingRight: 16,
    fontSize: 16,
    color: '#fff',
  },
  inputIcon: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 15,
    left: 16,
    tintColor: '#888',
  },
  forgetPassword: {
    color: '#9CA3AF',
    textAlign: 'right',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#7F00FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9CA3AF',
  },
  orText: {
    marginHorizontal: 10,
    color: '#9CA3AF',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#222326',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff',
  },

  googleButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
  },
  registerLink: {
    color: '#7F00FF',
    fontWeight: 'bold',
  },
});

export default styles;
