import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from 'App/Theme'
import PropTypes from 'prop-types';

class CustomHeaderNew extends React.Component {
  render() {
    return (
      <View style={{ position: 'relative', width: '100%' }}>
        <View style={[this.props.HeaderColor,
        this.props.Isshadow ?
          styles.shadowline : null,
        { height: 80, flexDirection: 'row', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }
        ]}>
          <TouchableOpacity
            style={{
              width: 46, height: 46,
              borderRadius: 46 / 2, marginLeft: 9,
              backgroundColor: this.props.buttonCircleColor,
              alignItems: 'center'
            }}
            onPress={this.props.onPressBackButton}
          >
            <Image style={{ height: 17, width: 17, marginTop: 16 }} source={this.props.LeftImage} />
          </TouchableOpacity>
          <Text style={[
            styles.TiTleCss,
            {
              color: this.props.textcolorHeader, textTransform: this.props.textTransform,
              width: '70%', textAlign: 'center',
              marginTop: 0,
              marginLeft: 20,
              fontFamily: 'gothamrounded-bold'
            }]}>
            {this.props.HeaderTitle}</Text>
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
  shadowline: {
    shadowOffset: { width: 1, height: 1, },
    shadowOpacity: 0.5,
    shadowColor: '#614698',
    elevation: 3,
  }
});

const PropType = PropTypes

CustomHeaderNew.propTypes = {
  onPressBackButton: PropType.func,
  HeaderTitle: PropType.string,
  LeftImage: PropType.string,
  HeaderColor: PropType.any,
  textcolorHeader: PropType.string,
  buttonCircleColor: PropType.string,
  Isshadow: PropType.string,
  textTransform: PropType.string,
};
CustomHeaderNew.defaultProps = {
  HeaderColor: {
    backgroundColor: Colors.patientColor
  },
  buttonCircleColor: "#f6f5fa"
}

export default CustomHeaderNew;