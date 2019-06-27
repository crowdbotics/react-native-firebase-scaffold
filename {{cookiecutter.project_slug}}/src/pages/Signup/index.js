import React from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  Linking,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AppContext, Button } from 'app/components';
import { AuthController } from 'app/services';
import { alert, success } from 'app/utils/Alert';

import styles from './style';
import LogoIcon from 'app/assets/images/logo.png';
import { ToS_URL } from '../../constant';

const emailRegEx =
  // eslint-disable-next-line max-len
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmpswd: '',
      agreeTerms: false,
      allowResendEmail: true,
      step: 1
    };
  }

  inputChanged = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  agreeTerms = () => {
    this.setState({
      agreeTerms: !this.state.agreeTerms
    });
  };

  validate = () => {
    let { name, email, password, confirmpswd, agreeTerms } = this.state;
    if (!name) {
      alert("Name can't be empty!");
      return false;
    }
    if (!email) {
      alert("Email can't be empty!");
      return false;
    }
    if (!emailRegEx.test(email)) {
      alert('Email is not valid!');
      return false;
    }
    if (!password || !confirmpswd) {
      alert("Password can't be empty!");
      return false;
    }
    if (password !== confirmpswd) {
      alert("Password doesn't match!");
      return false;
    }
    if (password.length < 6) {
      alert('Password should be longer than 6 letters!');
      return false;
    }
    if (!agreeTerms) {
      alert('To register, you have to agree our Terms of Conditions.');
      return false;
    }
    return true;
  };

  signup = async () => {
    // fields validation
    if (!this.validate()) {
      return;
    }
    let { name, email, password } = this.state;
    try {
      this.context.showLoading();
      let user = await AuthController.signup({
        name,
        email,
        password
      });
      this.context.hideLoading();
      await this.setState({
        step: 2,
        allowResendEmail: false
      });
      setTimeout(() => {
        this.setState({ allowResendEmail: true });
      }, 30000);
    } catch (error) {
      this.context.hideLoading();
      alert(error.message);
    }
  };

  goToLogin = () => {
    this.props.navigation.goBack();
  };

  resendVerification = async () => {
    try {
      this.context.showLoading();
      await AuthController.sendEmailVerification();
      success(`Verification email was resent to ${this.state.email}`);
      this.context.hideLoading();
      await this.setState({ allowResendEmail: false });
      setTimeout(() => {
        this.setState({ allowResendEmail: true });
      }, 30000);
    } catch (error) {
      this.context.hideLoading();
      alert(error.message);
    }
  };

  termsPressed = () => {
    Linking.canOpenURL(ToS_URL)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + ToS_URL);
        } else {
          return Linking.openURL(ToS_URL);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  renderSignup = () => {
    return (
      <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
            <View style={styles.content}>
              <TextInput
                style={styles.input}
                placeholder="Name *"
                value={this.state.name}
                autoCapitalize="none"
                onChangeText={(value) => this.inputChanged('name', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email *"
                value={this.state.email}
                autoCapitalize="none"
                onChangeText={(value) => this.inputChanged('email', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password *"
                value={this.state.password}
                autoCapitalize="none"
                onChangeText={(value) => this.inputChanged('password', value)}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password *"
                value={this.state.confirmpswd}
                autoCapitalize="none"
                onChangeText={(value) =>
                  this.inputChanged('confirmpswd', value)
                }
                secureTextEntry={true}
              />
              <View style={styles.termsContainer}>
                <CheckBox
                  containerStyle={styles.checkbox}
                  checked={this.state.agreeTerms}
                  onIconPress={this.agreeTerms}
                />
                <Text style={styles.terms}>{'Agree to '}</Text>
                <Button
                  textStyle={styles.termsBtnText}
                  text="Terms and Conditions"
                  onPress={this.termsPressed}
                />
              </View>
              <Button
                // disabled={!this.state.agreeTerms}
                containerStyle={styles.signupBtn}
                textStyle={styles.signup}
                text="Register Me"
                onPress={this.signup}
              />
              <View style={styles.loginContainer}>
                <Text style={styles.description}>
                  Already have an account?{' '}
                </Text>
                <Button
                  textStyle={styles.login}
                  text="Log In"
                  onPress={this.goToLogin}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  };

  renderVerifcation = () => {
    return (
      <View style={styles.container}>
        <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}> We sent verification email.</Text>
        <Button
          disabled={!this.state.allowResendEmail}
          containerStyle={styles.resendBtn}
          textStyle={
            this.state.allowResendEmail
              ? styles.resendActive
              : styles.resendInactive
          }
          text="Resend verification email"
          onPress={this.resendVerification}
        />
        <Button
          containerStyle={styles.signupBtn}
          textStyle={styles.signup}
          text="Log In"
          onPress={this.goToLogin}
        />
      </View>
    );
  };

  render() {
    if (this.state.step === 1) {
      return this.renderSignup();
    } else {
      return this.renderVerifcation();
    }
  }
}

SignupScreen.contextType = AppContext;

SignupScreen.propTypes = {
  navigation: PropTypes.object
};

export default SignupScreen;
