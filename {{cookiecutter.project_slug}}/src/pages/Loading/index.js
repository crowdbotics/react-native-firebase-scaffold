import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';

import { AppContext } from 'app/components';

import styles from './style';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;
  }

  componentDidMount() {
    this.context.showLoading();
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.context.hideLoading();
      if (user) {
        this.props.navigation.navigate('main');
      } else {
        this.props.navigation.navigate('auth');
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return <View style={styles.container} />;
  }
}

LoadingScreen.contextType = AppContext;

LoadingScreen.propTypes = {
  navigation: PropTypes.object
};

export default LoadingScreen;
