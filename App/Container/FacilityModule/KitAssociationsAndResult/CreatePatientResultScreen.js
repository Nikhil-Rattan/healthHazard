import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';

import NavigationService from 'App/Services/NavigationService';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import CustomHeader from 'App/Components/CustomHeader';
import CustomInputBox from 'App/Components/CustomInputBox';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';

import { ValidationService } from 'App/Services/ValidationService';
import { ScanEnum } from 'App/Enums';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class CreatePatientResultScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      animation: new Animated.Value(30),
      Message: '',
      inputs: {
        kitNo: {
          type: 'kitQrCode',
          value: '',
        },
      },
      IsTextMode: false,
      IsAlertVisible: false,
      kitNo: '',
      AlertMessage: '',
      successHeight: 550,
      errorHeight: 430,
      successColor: Colors.facilityColor,
      rejectColor: '#f92a2a',
      IsPatientQRCodeScannedAlready: true,
      PatientId: 0,
      UserKey: '',
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.props.resetScanQrCodeAndAddResult();
    this.animationInterval = setInterval(() => {
      this.startAnimation();
    }, 2000);
  }

  onSuccess = (e) => {
    this.props.resetScanQrCodeAndAddResult();
    this.setState({ kitNo: e.data });
    this.scanQRCode(e.data);
  };

  scanQRCode(QrCode) {
    let payload = null;
    let { IsPatientQRCodeScannedAlready, PatientId, UserKey } = this.state;
    if (IsPatientQRCodeScannedAlready) {
      payload = {
        QRCode: QrCode,
        FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
        PatientId: PatientId,
        IsPatientQRCodeScannedAlready: true,
        DecryptColumns: ['PatientFirstName', 'PatientLastName'],
        UserKey: UserKey,
        LoginUserId: this.props.authenticatedUser?.UserId,
      };
    } else {
      payload = {
        QRCode: QrCode,
        FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
        IsPatientQRCodeScannedAlready: false,
        DecryptColumns: ['PatientFirstName', 'PatientLastName'],
        LoginUserId: this.props.authenticatedUser?.UserId,
      };
    }

    this.props.scanQrCodeAndAddResult(payload);
  }
  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
    this.props.closeFacilityProfileLoading();
    clearInterval(this.animationInterval);
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 220,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(30);
      //If you remove above line then it will stop the animation at toValue point
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.scanQRCodeSuccessMessage != null &&
      prevProps.scanQRCodeSuccessMessage != this.props.scanQRCodeSuccessMessage
    ) {
      console.log(this.props.scanQRCodeSuccessResonse?.StatusCode);
      switch (this.props.scanQRCodeSuccessResonse?.StatusCode) {
        case ScanEnum.ValidPatient:
          if (this.state.IsPatientQRCodeScannedAlready) {
            let PatientInvalidMessage = this.props.selectedMessage[
              'InitTest-InvalidQRCode'
            ];
            this.setState({
              IsMessageShow: true,
              Message: PatientInvalidMessage,
            });
          } else {
            this.setState({
              IsPatientQRCodeScannedAlready: true,
              PatientId: this.props.scanQRCodeSuccessResonse?.PatientId,
              UserKey: this.props.scanQRCodeSuccessResonse?.UserKey,
            });
            this.onInputChange({ id: 'kitNo', value: '' });
            this.resetScaner();
          }
          break;
        case ScanEnum.ValidTestKit:
          if (!this.state.IsPatientQRCodeScannedAlready) {
            this.setState({ IsPatientQRCodeScannedAlready: true });
          }
          break;
        case ScanEnum.ResultNotSubmitted:
          let ResultMessage = this.props.selectedMessage[
            'InitTest-ThisKitHasAlreadyUsed'
          ];
          this.setState({ IsMessageShow: true, Message: ResultMessage });
          break;
        case ScanEnum.ResultAlreadySubmitted:
          let ResultAlreadySubmitted = this.props.selectedMessage[
            'InitTest-ThisKitHasAlreadyUsed'
          ];
          this.setState({ IsMessageShow: true, Message: ResultAlreadySubmitted });
          break;
        case ScanEnum.KitAssociated:
          NavigationService.navigate('KitScanMessageScreen');
          break;
      }
    } else if (
      this.props.scanQRCodeErrorMessage != null &&
      prevProps.scanQRCodeErrorMessage != this.props.scanQRCodeErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.scanQRCodeErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message });
    }
  }

  _goToDashboard() {
    NavigationService.popScreen();
  }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _onKitInputBlur(event) {
    if (!this.renderError('kitNo')) {
      this.props.resetScanQrCodeAndAddResult();

      this.setState({ kitNo: event.nativeEvent.text });
    }
  }

  _onEnterCodeSubmit() {
    if (!this.renderError('kitNo')) {
      this.props.resetScanQrCodeAndAddResult();
      let kitno = this.state.inputs['kitNo'].value;

      this.setState({ kitNo: kitno });
      this.scanQRCode(kitno);
    }
  }

  resetScaner() {
    let self = this;

    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate();
      }
    }, 3500);
  }

  resetQRCode() {
    const { inputs } = this.state;
    const updatedkitNoTouch = { ...inputs['kitNo'], touched: false, value: '' };
    let input = {
      ...inputs,
      kitNo: updatedkitNoTouch,
    };

    this.setState({ inputs: input, IsTextMode: false });
  }

  _OnClickCrossButton() {
    NavigationService.popScreen();
  }
  _onSignUpPressButton() {
    this.setState({ IsTextMode: false });
  }
  _onRightButtonClick() {
    this.setState({ IsTextMode: true });
  }

  renderTextModeBackUp() {
    return (
      <View style={{}}>
        <CustomHeader
          HeaderColor={{ backgroundColor: Colors.facilityColor }}
          onPressBackButton={this._goToDashboard.bind(this)}
          LeftImage={Images.CrossIcon}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={[
              Helpers.bold,
              {
                fontSize: 26,
                color: '#FFFFFF',
                textAlign: 'center',
                width: '100%',
                marginTop: 20,
              },
            ]}>
            {this.state.IsPatientQRCodeScannedAlready
              ? this.props.selectedMessage['SearchFacility-EnterTestKitQRCode']
              : this.props.selectedMessage['NewTester-EnterPatientQRCode']}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 15,
                color: '#FFFFFF',
                textAlign: 'center',
                width: '60%',
                marginTop: 20,
              },
            ]}>
            {this.state.IsPatientQRCodeScannedAlready
              ? this.props.selectedMessage[
              'SearchFacility-TypeTheCodeOnTheBackOfTheTestKit'
              ]
              : ''}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            height: 70,
            marginTop: 25,
          }}>
          <View
            style={{ width: '90%', borderRadius: 40, backgroundColor: 'white' }}>
            <CustomInputBox
              containerStyle={[
                Helpers.txtRoundInputContainer,
                { borderWidth: 0 },
                this.renderError('kitNo') ? { borderColor: Colors.error } : {},
              ]}
              inputBoxstyle={[
                Helpers.txtRoundInputs,
                { color: Colors.facilityColor },
              ]}
              placeholder={this.props.selectedMessage['NewTester-TypeQRCode']}
              onChangeText={(value) => this.onInputChange({ id: 'kitNo', value })}
              onEndEditing={this._onKitInputBlur.bind(this)}
              value={this.state.inputs.kitNo.value}
              componentStyle={[
                Helpers.column,
                Helpers.crossStart,
                { height: 50, marginLeft: 15, marginBottom: 10 },
              ]}
              inputBoxLableStyle={[
                Helpers.inputBoxLable,
                { marginLeft: 15, color: Colors.facilityColor },
              ]}
              rightIconStyle={[Helpers.rightIconStyle, { marginRight: 20 }]}
              hasEvent={false}
              hasRightIcon={true}
              maxLength={50}
              rightIcon={
                this.state.inputs['kitNo'].touched
                  ? this.renderError('kitNo')
                    ? Images.InValid
                    : Images.ValidGreen
                  : null
              }></CustomInputBox>
          </View>
        </View>
      </View>
    );
  }

  renderScanModeBackUp() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.15,
            backgroundColor: '#808080',
            flexDirection: 'row',
          }}>
          <CustomHeader
            HeaderColor={{ backgroundColor: Colors.facilityColor }}
            onPressBackButton={this._OnClickCrossButton.bind(this)}
            LeftImage={Images.CrossIcon}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            backgroundColor: '#808080',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <QRCodeScanner
            onRead={this.onSuccess}
            showMarker={true}
            ref={(node) => {
              this.scanner = node;
            }}
            containerStyle={{ width: '100%', alignItems: 'center' }}
            cameraStyle={{ width: 200, height: 200, marginTop: 20 }}
            topContent={
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Text style={[styles.centerText, Helpers.bold]}>
                    {this.state.IsPatientQRCodeScannedAlready
                      ? this.props.selectedMessage[
                      'NewTester-ScanTestKitQRCode'
                      ]
                      : this.props.selectedMessage[
                      'NewTester-ScanPatientQRCode'
                      ]}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Text style={styles.text}>
                    {this.state.IsPatientQRCodeScannedAlready
                      ? this.props.selectedMessage[
                      'SearchFacility-ScanTheQRCodeOnTheBackOfTheTestKit'
                      ]
                      : ''}
                  </Text>
                </View>
              </View>
            }
          />
        </View>

        <View style={{ flex: 0.15, backgroundColor: '#808080' }}></View>
      </View>
    );
  }

  renderTextMode() {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 85 }}>
        <View
          style={{
            backgroundColor: 'transparent',
            height: 50,
            width: 80,
            marginBottom: 80,
            marginLeft: 20,
          }}>
          <TouchableOpacity
            style={{ height: 80, width: 50 }}
            onPress={this.resetQRCode.bind(this)}>
            <Text
              style={[
                Helpers.mediumFont,
                { fontSize: 15, color: '#152C52', width: 80, textAlign: 'left' },
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 28,
                color: '#28998D',
                textAlign: 'center',
                width: '100%',
                marginTop: 20,
              },
            ]}>
            {this.state.IsPatientQRCodeScannedAlready
              ? this.props.selectedMessage['SearchFacility-EnterTestKitQRCode']
              : this.props.selectedMessage['NewTester-EnterPatientQRCode']}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={[
              Helpers.mediumFont,
              {
                fontSize: 18,
                color: '#152C52',
                textAlign: 'center',
                width: 300,
                marginTop: 20,
              },
            ]}>
            {this.state.IsPatientQRCodeScannedAlready
              ? this.props.selectedMessage[
              'SearchFacility-TypeTheCodeOnTheBackOfTheTestKit'
              ]
              : ''}
          </Text>
        </View>

        <View style={{ width: '100%', borderRadius: 40, paddingRight: 20 }}>
          <CustomInputBox
            containerStyle={[
              Helpers.txtRoundInputContainer, ,
              this.renderError('kitNo')
                ? { borderColor: Colors.error }
                : { borderColor: '#28998D' },
            ]}
            inputBoxstyle={[Helpers.txtRoundInputs, { color: '#28998D' }]}
            placeholder={
              this.props.selectedMessage['SearchFacility-TypeQRCode']
            }
            placeholderTextColor="#8492A6"
            onChangeText={(value) => this.onInputChange({ id: 'kitNo', value })}
            onEndEditing={this._onKitInputBlur.bind(this)}
            value={this.state.inputs.kitNo.value}
            inputLabl={''}
            componentStyle={[
              Helpers.column,
              Helpers.crossStart,
              { height: 50, marginLeft: 15, marginBottom: 10 },
            ]}
            inputBoxLableStyle={[
              Helpers.inputBoxLable,
              { marginLeft: 15 },
              { color: '#28998D' },
            ]}
            rightIconStyle={[Helpers.rightIconStyle, { marginRight: 20 }]}
            hasEvent={false}
            hasRightIcon={true}
            maxLength={50}
            rightIcon={
              this.state.inputs['kitNo'].touched
                ? this.renderError('kitNo')
                  ? Images.InValid
                  : Images.ValidGreen
                : null
            }></CustomInputBox>
        </View>

        {this.renderError('kitNo') ? null : this.state.inputs['kitNo']
          .touched ? (
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 20,
              marginTop: 30,
              paddingLeft: 15,
            }}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: '#28998D',
                  borderColor: '#28998D',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 8,
                },
              ]}
              onPress={this._onEnterCodeSubmit.bind(this)}>
              <Text style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
                Enter Code
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  renderScanMode(transformStyle) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 0.6,
            backgroundColor: '#808080',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <QRCodeScanner
            onRead={this.onSuccess}
            showMarker={true}
            ref={(node) => {
              this.scanner = node;
            }}
            cameraStyle={{ height: '100%' }}
            customMarker={
              <View>
                <Animated.View
                  style={[
                    {
                      width: 335,
                      height: 3,
                      backgroundColor: '#00FF0A',
                    },
                    transformStyle,
                  ]}
                />
                <View
                  style={{
                    alignSelf: 'center',
                    height: 228,
                    width: 195,
                    borderColor: 'white',
                    borderWidth: 4,
                    borderStyle: 'dashed',
                    borderRadius: 1,
                  }}>
                </View>
              </View>
            }
          />
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={[
                {
                  fontSize: 22,
                  color: '#28998D',
                  textAlign: 'center',
                  height: 30,
                  lineHeight: 28,
                  marginBottom: 15,
                },
                Helpers.mediumFont,
              ]}>
              {this.state.IsPatientQRCodeScannedAlready
                ? this.props.selectedMessage['NewTester-ScanTestKitQRCode']
                : this.props.selectedMessage['NewTester-ScanPatientQRCode']}
            </Text>
            <Text
              style={[
                {
                  fontSize: 18,
                  color: '#152C52',
                  textAlign: 'center',
                  width: 300,
                  height: 50,
                  lineHeight: 20,
                },
                Helpers.mediumFont,
              ]}>
              {' '}
              {this.state.IsPatientQRCodeScannedAlready
                ? this.props.selectedMessage[
                'SearchFacility-ScanTheQRCodeOnTheBackOfTheTestKit'
                ]
                : ''}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  width: 100,
                  backgroundColor: '#C2CEDB',
                  height: 50,
                  width: '47%',
                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                this.setState({ IsTextMode: false });
              }}>
              <Text style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
                Scan QR Code
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: '#28998D',
                  height: 50,
                  width: '47%',
                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                this.setState({ IsTextMode: true });
              }}>
              <Text style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
                Type QR Code
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={[
                Helpers.btn,
                {
                  backgroundColor: 'transparent',
                  borderColor: '#28998D',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                NavigationService.popScreen();
              }}>
              <Text style={[Helpers.btnText, { color: '#28998D', fontSize: 15 }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _CloseAlert() {
    this.setState({ IsMessageShow: false });
    this.resetScaner();
  }

  render() {
    const transformStyle = {
      transform: [
        {
          translateY: this.state.animation,
        },
      ],
    };
    const { successHeight, errorHeight, successColor, rejectColor } = this.state;
    return (
      <SafeAreaView
        style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsMessageShow: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsMessageShow}
          PopUpContainerStyle={{
            backgroundColor: Colors.facilityColor,
            alignItems: 'center',
          }}
          HeaderTitle=""
          HeadTitleColor="#FFFFFF"
          SingleButtonText={this.props.selectedMessage['Register-Close']}
          SigleButtonBackground="#FFFFFF"
          MessageColor="#FFFFFF"
          SingleButtonTextColor={Colors.facilityColor}
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={Colors.facilityColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.state.Message}
          _onRightButtonPress={this._CloseAlert.bind(this)}
          hasSingleButton={true}
        />
        <Dialog
          dialogStyle={{ backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          visible={this.props.isFacilityProfileLoading}>
          <DialogContent style={{ backgroundColor: 'transparent' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Image
                source={Images.Loaderimg}
                style={{
                  alignItems: 'center',
                  resizeMode: 'center',
                  marginTop: 17,
                }}
              />
            </View>
          </DialogContent>
        </Dialog>

        {this.state.IsTextMode
          ? this.renderTextMode()
          : this.renderScanMode(transformStyle)}
      </SafeAreaView>
    );
  }
}

CreatePatientResultScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  associateValidateKitWithPatientSuccessMessage: PropTypes.string,
  associateValidateKitWithPatientFailureMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  associateValidateKitWithPatient: PropTypes.func,
  resetAssociateKitStates: PropTypes.func,
  setScanKitPayload: PropTypes.func,
  kitScanResponse: PropTypes.any,

  scanQRCodeSuccessMessage: PropTypes.any,
  scanQRCodeSuccessResonse: PropTypes.any,
  scanQRCodeErrorMessage: PropTypes.any,
  isFacilityProfileLoading: PropTypes.bool,
  selectedMessage: PropTypes.any,

  closeFacilityProfileLoading: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  associateValidateKitWithPatientSuccessMessage:
    state.patientProfile.associateValidateKitWithPatientSuccessMessage,
  associateValidateKitWithPatientFailureMessage:
    state.patientProfile.associateValidateKitWithPatientFailureMessage,
  authenticatedUser: state.authenticate.authenticatedUser,

  scanQRCodeSuccessMessage: state.facilityProfile.scanQRCodeSuccessMessage,
  scanQRCodeSuccessResonse: state.facilityProfile.scanQRCodeSuccessResonse,
  scanQRCodeErrorMessage: state.facilityProfile.scanQRCodeErrorMessage,
  kitScanResponse: state.patientProfile.kitScanResponse,
  isFacilityProfileLoading: state.facilityProfile.isFacilityProfileLoading,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  setScanKitPayload: (data) =>
    dispatch(FacilityProfileActions.setScanKitPayload(data)),
  scanQrCodeAndAddResult: (data) =>
    dispatch(FacilityProfileActions.scanQrCodeAndAddResult(data)),
  resetScanQrCodeAndAddResult: () =>
    dispatch(FacilityProfileActions.resetScanQrCodeAndAddResult()),
  closeFacilityProfileLoading: () =>
    dispatch(FacilityProfileActions.closeFacilityProfileLoading()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePatientResultScreen);
const styles = StyleSheet.create({
  centerText: {
    fontSize: 22,
    padding: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 17,
    marginBottom: 40,
    textAlign: 'center',
    width: '60%',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
