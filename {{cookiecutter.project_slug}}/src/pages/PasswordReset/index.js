import React from 'react';
import { View, Image, TextInput, Text, Linking } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppContext, Button } from 'app/components';
import { AuthController } from 'app/services';
import { alert, success } from 'app/utils/Alert';

import styles from './style';
import LogoIcon from 'app/assets/images/logo.png';

const emailRegEx =
  // eslint-disable-next-line max-len
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class PasswordResetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  inputChanged = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  reset = async () => {
    if (!emailRegEx.test(this.state.email)) {
      alert('Email is not valid!');
      return;
    }
    try {
      this.context.showLoading();
      await AuthController.forgotPassword(this.state.email);
      this.context.hideLoading();
      success('Password Reset email is sent!');
      this.props.navigation.goBack();
    } catch (error) {
      alert(error.message);
      this.context.hideLoading();
    }
  };

  goToLogin = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Email *"
              value={this.state.email}
              autoCapitalize="none"
              onChangeText={(value) => this.inputChanged('email', value)}
            />
            <Button
              containerStyle={styles.resetBtn}
              textStyle={styles.reset}
              text="Reset password"
              onPress={this.reset}
            />
            <View style={styles.loginContainer}>
              <Text style={styles.description}>Already have an account? </Text>
              <Button
                textStyle={styles.login}
                text="Log In"
                onPress={this.goToLogin}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

PasswordResetScreen.contextType = AppContext;

PasswordResetScreen.propTypes = {
  navigation: PropTypes.object
};

export default PasswordResetScreen;
