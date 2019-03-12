import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { AuthController } from 'app/services';
import { alert } from 'app/utils/Alert';
import Colors from '../../theme/Colors';
class DrawerMenu extends Component {
  menuItemPressed = (index) => async () => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('profile');
        break;
      
      default:
        try {
          await AuthController.logout();
          this.props.navigation.navigate('auth');
        } catch (error) {
          alert(error.message);
        }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={this.menuItemPressed(0)}
        >
          <Text style={styles.menuText}> Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={this.menuItemPressed(2)}
        >
          <Text style={styles.menuText}> Log Out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    backgroundColor: Colors.DrawerColor
  },
  menuItem: {
    marginBottom: 20
  },
  menuText: {
    fontSize: 18,
    color: Colors.MenuColor
  }
});

DrawerMenu.propTypes = {
  navigation: PropTypes.object,
  currentScreen: PropTypes.string
};

export default DrawerMenu;
