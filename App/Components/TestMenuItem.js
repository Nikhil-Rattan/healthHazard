import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { Helpers } from 'App/Theme';

export default class TestMenuItem extends Component {
  render() {
    return (
      <TouchableOpacity
        key={this.props.key}
        style={this.props.itemContainerStyle}
        onPress={this.props.onPressCard.bind(this)}>
        <View style={this.props.imageContainerStyle}>
          {this.props.hasImage ? (
            <Image
              style={{ height: 47, width: 48 }}
              resizeMode="contain"
              source={this.props.leftImage}
            />
          ) : (
            <View>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.lightFont,
                  {
                    color: this.props.digitdatecolor,
                    fontSize: 18,
                    textAlign: 'center',
                    lineHeight: 22,
                  },
                ]}>
                {this.props.dateNo}
              </Text>
              <Text
                style={[
                  Helpers.btnText,
                  Helpers.mediumFont,
                  {
                    color: this.props.digitdatecolor,
                    fontSize: 10,
                    textAlign: 'center',
                    marginBottom: 2,
                    lineHeight: 13,
                  },
                ]}>
                {this.props.dateMonth}
              </Text>
            </View>
          )}
        </View>
        <View style={this.props.textContainerStyle}>
          <Text style={this.props.headerTextStyle}>
            {this.props.headerText}
          </Text>
          <Text style={this.props.parahgraphTextStyle}>
            {this.props.parahgraphText}
          </Text>
        </View>
        <View style={this.props.iconContainerStyle}>
          <Image
            style={{
              height: 23,
              width: 23,
              marginRight: 10,
              transform: [{ rotate: '180deg' }],
            }}
            resizeMode="contain"
            source={this.props.rightImage}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

TestMenuItem.propTypes = {
  itemContainerStyle: PropTypes.array,
  imageContainerStyle: PropTypes.array,
  leftImage: PropTypes.string,
  textContainerStyle: PropTypes.array,
  headerTextStyle: PropTypes.array,
  parahgraphTextStyle: PropTypes.array,

  headerText: PropTypes.string,
  parahgraphText: PropTypes.string,
  iconContainerStyle: PropTypes.array,
  rightImage: PropTypes.string,
  hasImage: PropTypes.bool,
  onPressCard: PropTypes.func,
  dateNo: PropTypes.string,
  dateMonth: PropTypes.string,
  digitdatecolor: PropTypes.string,
  key: PropTypes.number,
};

TestMenuItem.defaultProps = {
  hasImage: true,
  onPressCard: () => { },
  dateNo: '',
  dateMonth: '',
};
