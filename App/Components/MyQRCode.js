import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Helpers, Images } from 'App/Theme';

class MyQRCode extends Component {
  leftRender(label, isFocused) {
    return (
      <TouchableOpacity
        key={label}
        style={{ height: 30, width: 30, backgroundColor: 'white' }}>
        <Image
          style={{ height: 25, width: 25 }}
          resizeMode="contain"
          source={isFocused ? Images.rightTabIcon : Images.leftTabIcon}
        />
      </TouchableOpacity>
    );
  }

  centerRender(label, isFocused) {
    return (
      <TouchableOpacity
        key={label}
        onPress={this.props.onPressCenter.bind(this)}
        style={{ height: 70, width: 50, backgroundColor: 'white' }}>
        <Image
          style={{ height: 70, width: 50 }}
          resizeMode="contain"
          source={isFocused ? Images.rightTabIcon : Images.centerTabIcon}
        />
      </TouchableOpacity>
    );
  }

  rightRender(label, isFocused) {
    return (
      <TouchableOpacity
        style={{ height: 35, width: 35 }}
        key={label}
      >
        <Image
          style={{ height: 30, width: 30 }}
          resizeMode="contain"
          source={isFocused ? Images.leftTabIcon : Images.rightTabIcon}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={this.props.Container}>
        <Text style={this.props.qrCodeTextStyle}>
          {this.props.qrCodeHeaderText}
        </Text>
        <View style={this.props.qrCodeContainer}>
          <QRCode
            value={this.props.authenticatedUser?.QRCode}
            logoSize={100}
            logoBackgroundColor="transparent"
          />
        </View>
        <Text style={this.props.qrCodeParagraphTextStyle}>
          {this.props.qrCodeParagraphText}
        </Text>

        <View style={[Helpers.tabContainer, { marginBottom: 20 }]}>
          <TouchableOpacity
            key={'left'}
            style={{ height: 30, width: 30, backgroundColor: 'white' }}>
            <Image
              style={{ height: 25, width: 25 }}
              resizeMode="contain"
              source={Images.inActiveLeftIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            key={'Center'}
            onPress={this.props.onPressCenter.bind(this)}
            style={{ height: 70, width: 50, backgroundColor: 'white' }}>
            <Image
              style={{ height: 70, width: 50 }}
              resizeMode="contain"
              source={Images.inActiveCenterIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ height: 35, width: 35 }}
            key={'right'}
          >
            <Image
              style={{ height: 30, width: 30 }}
              resizeMode="contain"
              source={Images.inActiveRightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MyQRCode.propTypes = {
  Container: PropTypes.array,
  qrCodeContainer: PropTypes.array,
  qrCodeTextStyle: PropTypes.array,
  qrCodeValue: PropTypes.string,
  qrCodeParagraphTextStyle: PropTypes.array,

  qrCodeHeaderText: PropTypes.string,
  qrCodeParagraphText: PropTypes.string,

  qrCodeHeaderText: PropTypes.string,
  qrCodeParagraphText: PropTypes.string,
  onPressCenter: PropTypes.func,

  authenticatedUser: PropTypes.any,
};

MyQRCode.defaultProps = {
  qrCodeHeaderText: 'test',
  qrCodeParagraphText: 'test',
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticate.authenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MyQRCode);
