import React, { Component } from 'react';
import {
    View,
    Text,
    Image, TouchableOpacity
} from 'react-native';
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme';
import TextInputMask from 'react-native-text-input-mask';

export default class CustomPhoneInput extends Component {
    render() {
        return (

            <View style={this.props.componentStyle}>
                <Text style={this.props.inputBoxLableStyle}>
                    {this.props.countryCode}
                </Text>
                <View style={this.props.containerStyle} >
                    <TextInputMask
                        returnKeyType={this.props.returnKeyType}
                        keyboardType={this.props.keyboardType}
                        mask={this.props.mask}
                        maxLength={this.props.maxLength}
                        secureTextEntry={this.props.secureTextEntry}
                        onFocus={this.props.OnFocus}
                        style={[this.props.inputBoxstyle, this.props.value ? Helpers.txtBoxFont : Helpers.placeholderFont]}
                        editable={this.props.editable}
                        value={this.props.value}
                        onChangeText={(formatted, extracted) => this.props.onChangeText(formatted, extracted)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        autoFocus={this.props.autoFocus}
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

CustomPhoneInput.propTypes = {
    OnFocus: PropTypes.func,
    containerStyle: PropTypes.array,
    inputBoxstyle: PropTypes.array,
    returnKeyType: PropTypes.string,
    autoFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    mask: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
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


CustomPhoneInput.defaultProps = {
    keyboardType: 'default',
    returnKeyType: 'done',
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