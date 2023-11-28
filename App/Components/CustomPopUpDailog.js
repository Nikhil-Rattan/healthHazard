import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Helpers } from 'App/Theme';
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from 'react-native-popup-dialog';

import PropTypes from 'prop-types';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import CustomButton from 'App/Components/CustomButton';

class CustomPopUpDailog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleAnimationDialogAlert: false,
    };
  }
  render() {
    return (
      <View style={{ position: 'relative', width: '100%' }}>
        <Dialog
          width={0.9}
          visible={this.props.scaleAnimationDialogAlert}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={this.props.onHardwareBackPress.bind(this)}>
          <DialogContent style={this.props.PopUpContainerStyle}>
            <Text
              style={{
                fontSize: 25,
                textAlign: 'center',
                marginTop: 20,
                color: this.props.HeadTitleColor,
              }}>
              {this.props.HeaderTitle}
            </Text>

            <Text
              style={{
                fontSize: 17,
                textAlign: 'center',
                marginTop: 10,
                color: this.props.MessageColor,
              }}>
              {this.props.AlertMessageTitle}
            </Text>

            <View
              style={{
                backgroundColor: 'transparent',
                height: 70,
                width: '100%',
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              {this.props.hasSingleButton ? (
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <CustomButton
                    buttonContainer={[
                      Helpers.buttonContainer,
                      Helpers.buttonContainerWithoutBackground, { width: '80%', marginTop: '6%', },
                      {
                        backgroundColor: this.props.SigleButtonBackground,
                        borderRadius: 13,
                        borderColor: this.props.leftbuttonbordercolor,
                      },
                    ]}
                    buttonTextStyle={[
                      Helpers.btnText,
                      { color: this.props.SingleButtonTextColor },
                    ]}
                    buttonText={this.props.SingleButtonText}
                    onPress={this.props._onRightButtonPress.bind(
                      this,
                    )}></CustomButton>
                </View>
              ) : (
                <CustomMultiButtons
                  mutliButtonContainer={[
                    Helpers.bottomView,
                    Helpers.multiButtonContainer,
                    { backgroundColor: 'transparent', borderRadius: 50 },
                  ]}
                  leftButtonContainer={[
                    Helpers.buttonContainer,
                    Helpers.buttonContainerWithoutBackground,
                    {
                      borderRadius: 13,
                      borderColor: this.props.leftbuttonbordercolor,
                    },
                  ]}
                  rightButtonContainer={[
                    Helpers.buttonContainer,
                    {
                      width: '40%',
                      borderRadius: 13,
                      backgroundColor: this.props.Rightbuttonbackgroundcolor,
                    },
                  ]}
                  leftButtonTextStyle={[
                    Helpers.btnText,
                    Helpers.buttonTextWithoutBackgroundContainer,
                    { color: this.props.leftbuttontextcolor },
                  ]}
                  rightButtonTextStyle={[
                    Helpers.btnText,
                    {
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: this.props.rightbuttontextcolor,
                    },
                  ]}
                  leftButtonText={this.props.LeftButtonText}
                  rightButtonText={this.props.RightButtonText}
                  onLeftPress={this.props._onLeftButtonPress.bind(this)}
                  onRightPress={this.props._onRightButtonPress.bind(
                    this,
                  )}></CustomMultiButtons>
              )}
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TiTleCss: {
    marginTop: 10,
    fontSize: 19,

    textAlign: 'left',

    width: '100%',
  },
});

const PropType = PropTypes;

CustomPopUpDailog.propTypes = {
  OnClickTouchOutside: PropType.func,
  onHardwareBackPress: PropType.func,
  _onLeftButtonPress: PropType.func,
  _onRightButtonPress: PropType.func,
  HeaderTitle: PropType.string,
  HeadTitleColor: PropType.string,
  MessageColor: PropType.string,
  leftbuttonbordercolor: PropType.string,
  leftbuttontextcolor: PropType.string,
  rightbuttontextcolor: PropType.string,
  Rightbuttonbackgroundcolor: PropType.string,
  AlertMessageTitle: PropType.string,
  PopUpContainerStyle: PropType.object,
  SingleButtonText: PropType.string,
  SigleButtonBackground: PropType.string,
  SingleButtonTextColor: PropType.string,
  scaleAnimationDialogAlert: PropType.bool,
  hasSingleButton: PropType.bool,
  LeftButtonText: PropType.string,
  RightButtonText: PropType.string,
};

CustomPopUpDailog.defaultProps = {
  hasSingleButton: false,
  LeftButtonText: 'Cancel',
  RightButtonText: 'Confirm',
  onHardwareBackPress: () => { },
};

export default CustomPopUpDailog;
