import React, { Component } from 'react';

import { Text, TouchableOpacity } from 'react-native';

import { PropTypes } from 'prop-types';
export default class CustomButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.buttonContainer}
        onPress={this.props.onPress.bind(this)}>
        <Text style={this.props.buttonTextStyle}>{this.props.buttonText} </Text>
      </TouchableOpacity>
    );
  }
}

CustomButton.propTypes = {
  buttonContainer: PropTypes.array,
  buttonTextStyle: PropTypes.array,
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
};

CustomButton.defaultProps = {
  buttonText: '',
};
