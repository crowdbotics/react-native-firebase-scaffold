import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { containerStyle, text, textStyle, disabled, onPress } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[containerStyle, styles.btnContainer]}
        onPress={onPress}
      >
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  containerStyle: PropTypes.object,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Button;
