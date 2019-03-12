import { Dimensions, StyleSheet } from 'react-native';

let dm = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  tabContainer: {
    marginHorizontal: 10,
    height: 40
  },
  list: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  item: {
    width: dm.width / 2 - 15,
    marginHorizontal: 5,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#81A8D2',
    marginBottom: 10
  },
  item_name: {
    fontSize: 20,
    fontWeight: '600'
  },
  item_logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10
  },
  item_point: {
    marginTop: 10,
    fontSize: 18
  },
  item_button: {
    marginTop: 20,
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#81A8D2'
  },
  item_buttontext: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});
