import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

let dm = Dimensions.get('screen');

import { AppContext, Navbar } from 'app/components';

import styles from './style';

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    await this.context.showLoading();

    this.context.hideLoading();
  };

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-menu"
          leftHandler={this.leftHandler}
          title="Dashboard"
        />
      </View>
    );
  }
}

MainScreen.contextType = AppContext;

MainScreen.propTypes = {
  navigation: PropTypes.object
};

export default MainScreen;
