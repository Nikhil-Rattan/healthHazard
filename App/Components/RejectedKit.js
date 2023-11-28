import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { PropTypes } from 'prop-types';
import CustomButton from 'App/Components/CustomButton';

export default class RejectedKit extends Component {
  render() {
    return (
      <View style={this.props.containerStyle}>
        <ImageBackground
          resizeMode="cover"
          source={this.props.bgImage}
          style={this.props.bgImageContainerStyle}>
          <View style={this.props.imageContainerStyle}>
            <Text style={this.props.rejectKitTopHeaderStyle}>
              {this.props.rejectKitTopHeader}
            </Text>
            <Text style={this.props.rejectKitHeaderStyle}>
              {this.props.rejectKitHeader}
            </Text>
          </View>
        </ImageBackground>

        <View style={this.props.txtConatinerStyle}>
          <Text style={this.props.rejectKitParagraphStyle}>
            {this.props.rejectKitParagraph}
          </Text>

          <CustomButton
            buttonContainer={this.props.rejectedKitButtonContainerStyle}
            buttonTextStyle={this.props.rejectedKitButtonTextStyle}
            buttonText={this.props.rejectKitbtnText}
            onPress={this.props.onPress.bind(this)}></CustomButton>
          <CustomButton
            buttonContainer={this.props.rejectKitCanelButtonContainerStyle}
            buttonTextStyle={this.props.rejectKitCanelButtonTextStyle}
            buttonText={this.props.rejectKitbtnCanelText}
            onPress={this.props.onCancelPress.bind(this)}></CustomButton>
        </View>
      </View>
    );
  }
}

RejectedKit.propTypes = {
  containerStyle: PropTypes.array,
  bgImageContainerStyle: PropTypes.array,
  bgImage: PropTypes.string,
  imageContainerStyle: PropTypes.array,
  rejectKitTopHeaderStyle: PropTypes.array,
  rejectKitTopHeader: PropTypes.string,
  rejectKitHeaderStyle: PropTypes.array,
  rejectKitHeader: PropTypes.string,
  txtConatinerStyle: PropTypes.array,
  rejectKitParagraphStyle: PropTypes.array,
  rejectKitParagraph: PropTypes.string,

  rejectedKitButtonContainerStyle: PropTypes.array,
  rejectedKitButtonTextStyle: PropTypes.array,
  rejectKitbtnText: PropTypes.string,

  rejectKitCanelButtonContainerStyle: PropTypes.array,
  rejectKitCanelButtonTextStyle: PropTypes.array,
  rejectKitbtnCanelText: PropTypes.string,

  onPress: PropTypes.func,
  onCancelPress: PropTypes.func,
};

RejectedKit.defaultProps = {
  rejectKitbtnText: 'test',
  rejectKitbtnCanelText: 'test',
};
