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
    paddingTop: 100
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
  resetBtn: {
    marginTop: 50,
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.ButtonColor
  },
  reset: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  description: {
    fontSize: 16
  },
  login: {
    fontSize: 18,
    fontWeight: '600'
  }
});
