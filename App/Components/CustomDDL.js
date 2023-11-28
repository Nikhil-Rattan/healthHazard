import React, { Component } from 'react';

import { View, Text } from 'react-native';

import { PropTypes } from 'prop-types';
import { Colors } from 'App/Theme';

export default class CustomDDL extends Component {
  render() {
    return (
      <View style={this.props.componentStyle}>
        <Text style={this.props.inputBoxLableStyle}>
          {this.props.value ? this.props.inputLabl : null}
        </Text>
        <View style={this.props.containerStyle}>
          <Dropdown
            baseColor={Colors.purple}
            containerStyle={{ marginLeft: 30, marginBottom: 20, width: '100%' }}
            value={this.props.value}
            data={this.props.source}
            onChangeText={this.props.onDDLValueChanged}
            inputContainerStyle={{ borderBottomColor: 'transparent' }}
          />
        </View>
      </View>
    );
  }
}

CustomDDL.propTypes = {
  containerStyle: PropTypes.array,
  onDDLValueChanged: PropTypes.func,
  value: PropTypes.string,
  inputLable: PropTypes.string,
  componentStyle: PropTypes.array,
  inputBoxLableStyle: PropTypes.array,
};

CustomDDL.defaultProps = {
  inputLable: '',
};
