import React, { Component } from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import CustomButton from 'App/Components/CustomButton';

export default class CustomMultiButtons extends Component {
  render() {
    return (
      <View style={this.props.mutliButtonContainer}>
        <CustomButton
          buttonContainer={this.props.leftButtonContainer}
          buttonTextStyle={this.props.leftButtonTextStyle}
          buttonText={this.props.leftButtonText}
          onPress={this.props.onLeftPress.bind(this)}></CustomButton>

        <CustomButton
          buttonContainer={this.props.rightButtonContainer}
          buttonTextStyle={this.props.rightButtonTextStyle}
          buttonText={this.props.rightButtonText}
          onPress={this.props.onRightPress.bind(this)}></CustomButton>
      </View>
    );
  }
}

CustomMultiButtons.propTypes = {
  SubmutliButtonContainer: PropTypes.array,
  mutliButtonContainer: PropTypes.array,
  leftButtonContainer: PropTypes.array,
  rightButtonContainer: PropTypes.array,
  leftButtonTextStyle: PropTypes.array,
  rightButtonTextStyle: PropTypes.array,
  leftButtonText: PropTypes.string,
  rightButtonText: PropTypes.string,
  onLeftPress: PropTypes.func,
  onRightPress: PropTypes.func,
};

CustomMultiButtons.defaultProps = {
  leftButtonText: 'Back',
  rightButtonText: 'Next',
};
