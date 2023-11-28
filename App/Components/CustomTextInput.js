import React, { Component } from 'react';
import {
  View,
  TextInput
} from 'react-native';
import { PropTypes } from 'prop-types'

export default class CustomTextInput extends Component {
  render() {
    return (
      <View style={[this.props.containerStyle]} >
        <TextInput
          secureTextEntry={this.props.secureTextEntry}
          style={[this.props.style]}
          editable={this.props.editable}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          autoFocus={this.props.autoFocus}
          keyboardType={this.props.keyboardType}
        />
      </View >
    )

  }
}

CustomTextInput.propTypes = {
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  editbale: PropTypes.bool,
  textColor: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholderTextColor: PropTypes.string,

}
CustomTextInput.defaultProps = {
  keyboardType: 'default',
  placeholderTextColor: "#595959",
  secureTextEntry: false,
  autoFocus: false,
  editbale: true,
}