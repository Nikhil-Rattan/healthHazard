import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  View,
  SafeAreaView,
  Animated,
} from 'react-native';
import NavigationService from 'App/Services/NavigationService';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import CustomHeader from 'App/Components/CustomHeader';
import CustomMultiButtons from 'App/Components/CustomMultiButtons';
import RBSheet from 'react-native-raw-bottom-sheet';
import RejectedKit from 'App/Components/RejectedKit';
import CustomInputBox from 'App/Components/CustomInputBox';
import ApprovedKit from 'App/Components/ApprovedKit';
import HeaderProgress from 'App/Components/HeaderProgress';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Helpers,
  ApplicationStyles,
} from 'App/Theme';
import { ValidationService } from 'App/Services/ValidationService';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';
class PatientKitScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      IsMessageShow: false,
      animation: new Animated.Value(30),
      Message: '',
      IsSuccess: false,
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
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  componentDidMount() {
    this.animationInterval = setInterval(() => {
      this.startAnimation();
    }, 2000);
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('test--------------------');
      this.resetScaner();
    });
  }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
    this.props.closePatientProfileLoading();
    clearInterval(this.animationInterval);

    this._unsubscribe();
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

  resetScaner() {
    let self = this;

    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate();
      }
    }, 2500);
  }

  onSuccess = (e) => {
    this.props.resetPatientInfoByKitNo();
    this.setState({ kitNo: e.data });

    this.props.getPatientInfoByKitNo({
      kitNo: e.data,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      DecryptColumns: ['FirstName', 'LastName', 'Address'],
    });
    // this.resetScaner()
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.getPatientInfoErrorMessage != null &&
      prevProps.getPatientInfoErrorMessage !=
      this.props.getPatientInfoErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.getPatientInfoErrorMessage
      ];

      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    }
    if (
      this.props.getPatientInfoSuccessMessage != null &&
      prevProps.getPatientInfoSuccessMessage !=
      this.props.getPatientInfoSuccessMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.getPatientInfoSuccessMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }
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
      //this.props.resetPatientInfoByKitNo()
      this.setState({ kitNo: event.nativeEvent.text });
      // this.props.getPatientInfoByKitNo({kitNo:event.nativeEvent.text,FacilityUserId:this.props.authenticatedUser?.FacilityUserId,"DecryptColumns":["FirstName","LastName","Address"]})
      //this.resetScaner()
    }
  }

  _onEnterCodeSubmit() {
    if (!this.renderError('kitNo')) {
      this.props.resetPatientInfoByKitNo();
      let kitno = this.state.inputs['kitNo'].value;

      this.setState({ kitNo: kitno });
      this.props.getPatientInfoByKitNo({
        kitNo: kitno,
        FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
        DecryptColumns: ['FirstName', 'LastName', 'Address'],
      });
      //this.resetScaner()
    }
  }

  _onSignUpPressButton() {
    this.setState({ IsTextMode: false });
  }
  _onRightButtonClick() {
    this.setState({ IsTextMode: true });
  }
  _goBackscreen() {
    NavigationService.popScreen();
  }
  renderTextModeBackUp() {
    return (
      <View style={{}}>
        <View
          style={{
            height: 75,
            width: '100%',
            position: 'relative',
            backgroundColor: Colors.facilityColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this._goBackscreen.bind(this)}
            style={{
              width: 55,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Image
              style={{ height: 20, width: 20, marginLeft: 17 }}
              source={Images.CrossIcon}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <HeaderProgress
                rowStyle={[
                  {
                    backgroundColor: 'transparent',
                    width: '75%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  },
                ]}
                progressStyle={[Helpers.headerLeftRow]}
                progressCount={60}
                rightColor="#FFFFFF"
                leftColor="#6bb9b0"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 18,
                  color: Colors.white,
                  textAlign: 'left',
                  marginRight: 20,
                },
              ]}></Text>
          </View>
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
              Helpers.bold,
              {
                fontSize: 26,
                color: '#FFFFFF',
                textAlign: 'center',
                width: '100%',
                marginTop: 20,
              },
            ]}>
            {this.props.selectedMessage['SearchFacility-EnterTestKitQRCode']}
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
            {
              this.props.selectedMessage[
              'SearchFacility-TypeTheCodeOnTheBackOfTheTestKit'
              ]
            }
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
              // inputLabl={this.props.selectedMessage["NewTester-TypeQRCode"]}
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
          <View
            style={{
              height: 75,
              width: '100%',
              position: 'relative',
              backgroundColor: Colors.facilityColor,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={this._goBackscreen.bind(this)}
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: 55,
              }}>
              <Image
                style={{ height: 20, width: 20, marginLeft: 17 }}
                source={Images.CrossIcon}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <HeaderProgress
                  rowStyle={[
                    {
                      backgroundColor: 'transparent',
                      width: '75%',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    },
                  ]}
                  progressStyle={[Helpers.headerLeftRow]}
                  progressCount={60}
                  rightColor="#FFFFFF"
                  leftColor="#6bb9b0"
                />
              </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text
                style={[
                  Helpers.mediumFont,
                  {
                    fontSize: 18,
                    color: Colors.white,
                    textAlign: 'left',
                    marginRight: 20,
                  },
                ]}></Text>
            </View>
          </View>
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
                    {this.props.selectedMessage['NewTester-ScanQRCode']}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <Text style={[styles.text, Helpers.bold]}>
                    {
                      this.props.selectedMessage[
                      'SearchFacility-ScanTheQRCodeOnTheBackOfTheTestKit'
                      ]
                    }
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

  resetQRCode() {
    const { inputs } = this.state;
    const updatedkitNoTouch = { ...inputs['kitNo'], touched: false, value: '' };
    let input = {
      ...inputs,
      kitNo: updatedkitNoTouch,
    };

    this.setState({ inputs: input, IsTextMode: false });
    this.resetScaner();
  }

  renderTextMode() {
    return (
      <View style={{ backgroundColor: 'white', marginTop: 85 }}>
        {/* <CustomHeader  
    onPressBackButton={this._goToDashboard.bind(this)}
    HasImage={false} 
    HeaderColor={{
      backgroundColor:'white'
    }}
    /> */}

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
              {this.props.selectedMessage['TestResult-Cancel']}
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
            {this.props.selectedMessage['SearchFacility-EnterTestKitQRCode']}
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
            {
              this.props.selectedMessage[
              'SearchFacility-TypeTheCodeOnTheBackOfTheTestKit'
              ]
            }
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
                {this.props.selectedMessage['SearchFacility-EnterCodeNew']}
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
                  {/* <Text style={{ fontSize: 30, color: "white" }}>
                QR CODE SCANNER
              </Text> */}
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
                  fontSize: 20,
                  color: '#28998D',
                  textAlign: 'center',
                  height: 60,
                  marginBottom: 15,
                  width: '100%',
                },
                Helpers.mediumFont,
              ]}>
              {this.props.selectedMessage['NewTester-ScanTestKitQRCode']}
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
              {
                this.props.selectedMessage[
                'SearchFacility-ScanTheQRCodeOnTheBackOfTheTestKit'
                ]
              }
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
                {this.props.selectedMessage['NewTester-ScanQRCode']}
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
                {this.props.selectedMessage['NewTester-TypeQRCode']}
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
                {this.props.selectedMessage['TestResult-Cancel']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      this.props.currentPatient
        ? NavigationService.navigate('KitSacanIntiateScreenWithQRCode')
        : alert(' ');
    } else {
      this.resetScaner();
    }
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
          visible={this.props.isPatientProfileLoading}>
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

        {/* <CustomMultiButtons
 mutliButtonContainer={[ Helpers.bottomView,Helpers.multiButtonContainer,{backgroundColor:'white',borderRadius:50,marginBottom:10,}]}
 leftButtonContainer={
   this.state.IsTextMode?
   [Helpers.buttonContainer,{width:'40%',borderRadius:30,backgroundColor:Colors.white,borderWidth:1,borderColor:Colors.facilityColor}
  ]:
   [
     Helpers.buttonContainer,Helpers.buttonContainerWithoutBackground,{borderRadius:30,borderWidth:0,backgroundColor:Colors.facilityColor}
  
  ]
}
 rightButtonContainer={
  this.state.IsTextMode?[
    Helpers.buttonContainer,Helpers.buttonContainerWithoutBackground,{borderRadius:30,borderWidth:0,backgroundColor:Colors.facilityColor}
 
 ]:
   [Helpers.buttonContainer,{width:'40%',borderRadius:30,backgroundColor:Colors.white,borderWidth:1,borderColor:Colors.facilityColor}
  ]
}
 leftButtonTextStyle={

  this.state.IsTextMode?
  [Helpers.btnText,Helpers.bold,{ fontSize:14,color:Colors.facilityColor}]
  : [Helpers.btnText,Helpers.buttonTextWithoutBackgroundContainer,Helpers.bold,{ color:Colors.white}]
  }
 rightButtonTextStyle={
  this.state.IsTextMode?
  [Helpers.btnText,Helpers.buttonTextWithoutBackgroundContainer,{color:Colors.white, },Helpers.bold]
   :   [Helpers.btnText,Helpers.bold,{fontSize:14,color:Colors.facilityColor}]

  }
  leftButtonText={this.props.selectedMessage["NewTester-ScanQRCode"]}
  rightButtonText={this.props.selectedMessage["NewTester-TypeQRCode"]}     
 onLeftPress={this._onSignUpPressButton.bind(this)}
 onRightPress={this._onRightButtonClick.bind(this)}
></CustomMultiButtons> */}
      </SafeAreaView>
    );
  }
}

PatientKitScannerScreen.propTypes = {
  currentPatient: PropTypes.any,
  getPatientInfoErrorMessage: PropTypes.any,
  getPatientInfoSuccessMessage: PropTypes.any,
  isPatientProfileLoading: PropTypes.any,
  authenticatedUser: PropTypes.any,
  getPatientInfoByKitNo: PropTypes.func,
  resetPatientInfoByKitNo: PropTypes.func,
  resetPatientInfoMessageByKitNo: PropTypes.func,
  selectedMessage: PropTypes.any,
  closePatientProfileLoading: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentPatient: state.patientProfile.currentPatient,
  getPatientInfoErrorMessage: state.patientProfile.getPatientInfoErrorMessage,
  getPatientInfoSuccessMessage:
    state.patientProfile.getPatientInfoSuccessMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  getPatientInfoByKitNo: (data) =>
    dispatch(PatientProfileActions.getPatientInfoByKitNo(data)),
  resetPatientInfoByKitNo: () =>
    dispatch(PatientProfileActions.resetPatientInfoByKitNo()),
  resetPatientInfoMessageByKitNo: () =>
    dispatch(PatientProfileActions.resetPatientInfoMessageByKitNo()),

  closePatientProfileLoading: () =>
    dispatch(PatientProfileActions.closePatientProfileLoading()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientKitScannerScreen);
const styles = StyleSheet.create({
  centerText: {
    //   fontFamily:'gothamrounded-bold',
    fontSize: 26,
    padding: 26,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '100%',
  },
  text: {
    // fontFamily:'gothamrounded-medium',
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
