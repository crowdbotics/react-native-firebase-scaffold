import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/Colors';

const dm = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 50,
    width: dm.width * 0.6,
    height: dm.width * 0.6
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: dm.width * 0.8,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20
  },
  loginBtn: {
    marginTop: 50,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.ButtonColor
  },
  login: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  forgotpswdBtn: {
    marginTop: 25
  },
  forgotpswd: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  description: {
    fontSize: 16
  },
  signup: {
    fontSize: 18,
    fontWeight: '600'
  }
});
