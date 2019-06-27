import { Alert } from 'react-native';

export const alert = (text) => {
  Alert.alert('Error', text, [{ text: 'OK' }], { cancelable: false });
};

export const success = (text) => {
  Alert.alert('Success', text, [{ text: 'OK' }], { cancelable: false });
};
