import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types';

class Telehealthexpertlist extends React.Component {
  render() {
    return (

      <View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
        <TouchableOpacity onPress={this.props.IconClick} style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: this.props.backgroundColorContainer, width: '95%', borderRadius: 10 }}>

            <View style={{ flexDirection: 'column', backgroundColor: 'transparent', justifyContent: 'flex-start', marginTop: 10, marginBottom: 10, width: '80%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                <Text style={[Helpers.bold, { marginLeft: 10, fontSize: 20, color: this.props.TitleColor, textAlign: 'left', width: '90%', }]}>
                  {this.props.TitleText}
                </Text>
              </View>
              <View>
                <Text style={[Helpers.lightBook, { marginLeft: 10, fontSize: 16, color: this.props.DiscriptionColor, textAlign: 'left', width: '90%', }]}>
                  {this.props.DescriptionText}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '20%', }}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginRight: 0 }}>
                <View>
                  <Image style={{ width: 25, height: 25, marginTop: 20 }} resizeMode='cover'
                    source={this.props.ListRightImage}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({


});


const PropType = PropTypes

Telehealthexpertlist.propTypes = {
  onPressBackButton: PropType.func,
  IconClick: PropType.func,
  HeaderTitle: PropType.string,
  ListRightImage: PropType.string,
  DiscriptionColor: PropType.any,
  TitleColor: PropType.string,
  TitleText: PropType.string,
  DescriptionText: PropType.string,
  backgroundColorContainer: PropType.string,
};



export default Telehealthexpertlist;