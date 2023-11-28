import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Colors, Helpers } from 'App/Theme'

import PropTypes from 'prop-types';

class CustomHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
      <View style={{ position: 'relative', width: '100%' }}>
        <View style={[this.props.HeaderColor, { height: 80, flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }]}>
          <TouchableOpacity
            style={{ width: 70, height: 50, borderRadius: 50 / 2, marginLeft: 5, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}
            onPress={this.props.onPressBackButton}
          >
            {this.props.HasImage ?
              <Image style={{ height: 20, width: 20, }} source={this.props.LeftImage} /> :
              <Text style={[{
                color: '#F54949', textAlign: 'center', fontSize: 15
              }, Helpers.bold]}>Cancel</Text>}
          </TouchableOpacity>
          <Text style={[styles.TiTleCss, { color: this.props.CenterTitleColor, width: '70%', textAlign: 'center', marginTop: 0, marginLeft: 12 }, Helpers.bold]}>{this.props.HeaderTitle}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TiTleCss: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'left',
    width: '100%'
  },
});

const PropType = PropTypes

CustomHeader.propTypes = {
  onPressBackButton: PropType.func,
  HeaderTitle: PropType.string,
  CenterTitleColor: PropType.string,
  LeftImage: PropType.string,
  HeaderColor: PropType.any,
  HasImage: PropType.bool,
};
CustomHeader.defaultProps = {
  HeaderColor: {
    backgroundColor: Colors.patientColor
  },
  HasImage: true
}

export default CustomHeader;