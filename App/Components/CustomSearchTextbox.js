import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, TextInput,
} from 'react-native';
import { Images, Helpers } from 'App/Theme'
import PropTypes from 'prop-types';

class CustomSearchTextbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsImage: false
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: 'red', flex: 0.9, borderRadius: 40 }}>
                <View style={[this.props.containerStyle, { alignItems: 'center' }]}>
                    <Image
                        style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15, tintColor: this.props.value ? "#000000" : "#D3DCE6" }]}
                        resizeMode='contain'
                        source={Images.SearchIcon} />
                    {/* {this.props.value ?
                        <Image
                            style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]}
                            resizeMode='contain'
                            source={Images.BlackSearchIcon} />
                        :
                        <Image
                            style={[Helpers.iconsmall, { marginLeft: 20, marginVertical: 15 }]}
                            resizeMode='contain'
                            source={Images.GraySearchIcon} />
                    } */}

                    <TextInput
                        style={[this.props.inputBoxstyle,
                        this.props.value ? { fontSize: 20, } :
                            { fontSize: 16, }, Helpers.light]}
                        editable={this.props.editable}
                        value={this.props.value}
                        onChangeText={value => this.props.onChangeText(value)}
                        placeholder={this.props.placeholder}
                        placeholderTextColor={this.props.placeholderTextColor}
                        autoFocus={this.props.autoFocus}
                        keyboardType={this.props.keyboardType}
                    />
                    <Text
                        style={[{
                            fontSize: 20, color: '#333333',
                            textAlign: 'left', marginLeft: 40,
                            marginTop: 10
                        }]}>
                        Cancel
                    </Text>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
});

const PropType = PropTypes
CustomSearchTextbox.propTypes = {
    onChangeText: PropType.func,
    autoFocus: PropType.func,
    value: PropType.string,
    placeholder: PropType.string,
    editable: PropType.string,
    placeholderTextColor: PropType.string,
    keyboardType: PropType.string,
};
export default CustomSearchTextbox;