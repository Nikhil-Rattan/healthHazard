import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Helpers } from 'App/Theme'

import PropTypes from 'prop-types';

class ButtonWithTextandImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={Helpers.bottomView}>

        <TouchableOpacity style={[styles.buttonCss, { backgroundColor: this.props.BackGroundColor }]}
          onPress={this.props.onPressBackButton}
        >
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 50 }}>
            <Text style={[styles.TiTleCss, { color: 'white', marginLeft: 20, }, Helpers.lightBook]}>{this.props.ButtonText}</Text>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', height: 50 }}>
            <Image style={{ height: 20, width: 20, marginRight: 20 }} source={this.props.ButtonImage} />
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}
const styles = StyleSheet.create({

  TiTleCss: {

    fontSize: 18,

    textAlign: 'left',
    width: '100%'
  },

  buttonCss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#614698',
    height: 60,
    padding: 5,
    width: '90%',
    borderRadius: 13,
  }
});


const PropType = PropTypes

ButtonWithTextandImage.propTypes = {
  onPressBackButton: PropType.func,
  ButtonText: PropType.string,
  ButtonImage: PropType.string,
  BackGroundColor: PropType.string
};
export default ButtonWithTextandImage;