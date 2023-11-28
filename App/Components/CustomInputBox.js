import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Image, TouchableOpacity
} from 'react-native';
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme';
// import { TouchableOpacity } from 'react-native-gesture-handler';
export default class CustomInputBox extends Component {
  render() {
    return (

      <View style={this.props.componentStyle}>
        <Text style={this.props.inputBoxLableStyle}>
          {this.props.value ? this.props.inputLabl : null}
        </Text>
        <View style={this.props.containerStyle} >
          <TextInput
            returnKeyType="done"
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            secureTextEntry={this.props.secureTextEntry}
            onFocus={this.props.OnFocus}
            style={[this.props.inputBoxstyle, this.props.value ? Helpers.txtBoxFont : Helpers.placeholderFont]}
            editable={this.props.editable}
            value={this.props.value}
            onChangeText={value => this.props.onChangeText(value)}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.placeholderTextColor}
            // autoFocus={this.props.autoFocus}
            keyboardType={this.props.keyboardType}
            onEndEditing={this.props.onEndEditing.bind(this)}
          />

          {this.props.hasEvent ?
            <TouchableOpacity onPress={this.props.onPressRightIcon.bind(this)}>
              <Image style={[this.props.rightIconStyle]} resizeMode='contain' source={this.props.rightIcon} />
            </TouchableOpacity> :
            this.props.hasRightIcon ?
              <Image style={[this.props.rightIconStyle]} resizeMode='contain' source={this.props.rightIcon} />
              : null}
        </View>

      </View >
    )

  }
}

CustomInputBox.propTypes = {
  OnFocus: PropTypes.func,
  containerStyle: PropTypes.array,
  inputBoxstyle: PropTypes.array,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  editbale: PropTypes.bool,
  textColor: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  inputLable: PropTypes.string,
  keyboardType: PropTypes.string,
  componentStyle: PropTypes.array,
  inputBoxLableStyle: PropTypes.array,
  rightIconStyle: PropTypes.array,
  hasEvent: PropTypes.bool,
  hasRightIcon: PropTypes.bool,
  rightIcon: PropTypes.number,
  onPressRightIcon: PropTypes.func,
  maxLength: PropTypes.number,
  onEndEditing: PropTypes.func,
}


CustomInputBox.defaultProps = {
  keyboardType: 'default',
  placeholderTextColor: "#595959",
  secureTextEntry: false,
  autoFocus: false,
  editbale: true,
  inputLable: '',
  hasEvent: false,
  hasRightIcon: false,
  rightIcon: null,
  maxLength: 50,
  onEndEditing: () => { }
}