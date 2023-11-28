import React, { Component, useCallback } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  SafeAreaView,
  Image,
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
var _ = require('lodash');
class PatientQRCodeScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animation: new Animated.Value(30),
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
      successHeight: 575,
      errorHeight: 500,
      successColor: Colors.facilityColor,
      rejectColor: '#f92a2a',
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
    //this.startAnimation=this.startAnimation.bind(this)

    this.onScanDelay = _.debounce(this.onSuccess.bind(this), 2000);
  }

  componentDidMount() {
    this.props.resetAssociateKitStates();
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
    this.resetScaner();
  }

  componentWillUnmount() {
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

  onSuccess(e) {
    this.props.resetAssociateKitStates();
    this.setState({ kitNo: e.data });

    this.props.associateValidateKitWithPatient({
      kitNo: e.data,
      PatientQrCode: this.props.authenticatedUser?.QRCode,
      FacilityUserId: 0,
    });
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.associateValidateKitWithPatientFailureMessage != null) {
      this.RBErrorSheet.open();
      this.props.resetAssociateKitStates();
      //  this.props.patientScannedKit(this.state.kitNo)
      //NavigationService.navigate('InstructionFirstScreen')
      //alert(this.state.kitNo)
      //this.props.patientScannedKit(this.state.kitNo)
      //NavigationService.navigate('InstructionFirstScreen')
    } else if (
      this.props.associateValidateKitWithPatientSuccessMessage != null
    ) {
      //this.RBSuccessSheet.open()
      //alert('Success')
      this.props.resetAssociateKitStates();
      this.props.patientScannedKit(this.state.kitNo);
      NavigationService.navigate('InstructionFirstScreen');
      // return;
    }
  }

  _goToDashboard() {
    // this.RBErrorSheet.close()
    // this.RBSuccessSheet.close()
    NavigationService.popScreen();
    // this.setState({IsTextMode:false})
  }

  _retryScan() { }

  renderError(id) {
    const { inputs } = this.state;

    if (inputs[id].errorLabel != '' && inputs[id].errorLabel != null) {
      return true;
    }
    return false;
  }

  _onKitInputBlur(event) {
    if (!this.renderError('kitNo')) {
      this.props.resetAssociateKitStates();
      this.setState({ kitNo: event.nativeEvent.text });
      //this.props.associateValidateKitWithPatient({kitNo:event.nativeEvent.text,PatientQrCode:this.props.authenticatedUser?.QRCode})
    }
  }

  _onEnterCodeSubmit() {
    if (!this.renderError('kitNo')) {
      this.props.resetAssociateKitStates();
      let kitno = this.state.inputs['kitNo'].value;

      this.setState({ kitNo: kitno });
      //alert(this.state.inputs["kitNo"].value)
      this.props.associateValidateKitWithPatient({
        kitNo: kitno,
        PatientQrCode: this.props.authenticatedUser?.QRCode,
        FacilityUserId: 0,
      });
    }
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
  _closeBottomSheet() {
    this.props.resetAssociateKitStates();
    let self = this;
    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate();
      }
    }, 1500);
  }
  resetScaner() {
    let self = this;

    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate();
      }
    }, 2500);
  }

  renderScanner(transformStyle) {
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
            onRead={this.onSuccess.bind(this)}
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
                  color: '#815CCC',
                  textAlign: 'center',
                  height: 60,
                  marginBottom: 15,
                  width: '100%',
                },
                Helpers.mediumFont,
              ]}>
              {' '}
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
              {' '}
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
                  backgroundColor: '#614698',
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
                  borderColor: '#614698',
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 8,
                },
              ]}
              onPress={() => {
                NavigationService.popScreen();
              }}>
              <Text style={[Helpers.btnText, { color: '#614698', fontSize: 15 }]}>
                {this.props.selectedMessage['TestResult-Cancel']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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

        <RBSheet
          ref={(ref) => {
            this.RBSuccessSheet = ref;
          }}
          height={successHeight}
          openDuration={250}
          onClose={this._OnClickCrossButton.bind(this)}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            // wrapper: {
            //   backgroundColor: "transparent",
            //   paddingHorizontal:2
            // },
            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,

              backgroundColor: successColor,
            },
          }}>
          <ApprovedKit
            cardContainerStyle={[
              {
                height: '100%',
                width: '100%',
                backgroundColor: Colors.facilityColor,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
            ]}
            cardFirstBoxContainerStyle={[
              {
                height: 150,
                width: '100%',
                backgroundColor: 'red',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
              },
            ]}
            cardBgImage={Images.ApprovedKitBackground}
            cardBgImageContainerStyle={[
              {
                width: '100%',
                backgroundColor: Colors.facilityColor,
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
              },
            ]}
            cardImageContainerStyle={[
              {
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              },
            ]}
            cardHeaderStyle={[
              Helpers.btnText,
              {
                color: 'white',
                fontSize: 38,
                textAlign: 'left',
                marginHorizontal: 10,
                fontWeight: 'bold',
                justifyContent: 'center',
              },
            ]}
            cardHeader={this.props.selectedMessage['SearchFacility-Success!']}
            cardParagraphStyle={[
              Helpers.btnText,
              {
                color: 'white',
                fontSize: 18,
                textAlign: 'left',
                marginHorizontal: 10,
                fontWeight: 'bold',
                justifyContent: 'center',
              },
            ]}
            cardParagraph={this.props.selectedMessage[
              'SearchFacility-WeHaveInitiateYourTest'
            ]
              .toString()
              .replace('name', this.props.authenticatedUser?.FirstName)}
            cardSecondBoxContainerStyle={[
              {
                height: 420,
                width: '100%',
                backgroundColor: 'white',
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'space-around',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                bottom: 0,
              },
            ]}
            cardKnobStyle={[
              {
                height: 5,
                width: '8%',
                backgroundColor: Colors.facilityColor,
                borderRadius: 20,
              },
            ]}
            cardTableStyle={[
              {
                height: 195,
                width: '90%',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                borderRadius: 22,
                borderColor: '#d1e7e5',
                borderWidth: 1,
              },
            ]}
            cardTableHeaderStyle={[
              {
                height: 48,
                backgroundColor: '#d1e7e5',
                justifyContent: 'center',
              },
            ]}
            cardTableHeaderTextStyle={[
              { fontSize: 16, color: Colors.facilityColor, textAlign: 'center' },
            ]}
            cardTableRowStyle={[
              {
                height: 48,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'space-between',
              },
            ]}
            cardTableRowLableContainerStyle={[
              { width: '50%', justifyContent: 'center', marginHorizontal: 10 },
            ]}
            cardTableRowLableTextStyle={[
              {
                fontSize: 13,
                color: 'black',
                textAlign: 'left',
                fontWeight: 'bold',
              },
            ]}
            cardTableRowValueContainerStyle={[
              { width: '50%', justifyContent: 'center', marginHorizontal: 10 },
            ]}
            cardTableRowValueTextStyle={[
              { fontSize: 11, color: 'black', fontWeight: 'bold' },
            ]}
            cardButtonOnPress={this._goToDashboard.bind(this)}
            cardButton={[
              Helpers.buttonContainer,
              {
                backgroundColor: 'transparent',
                width: '90%',
                borderColor: '#614698',
                borderWidth: 1,
                height: 50,
              },
            ]}
            cardButtonTextStyle={[
              Helpers.btnText,
              { color: '#614698', fontSize: 14 },
            ]}
            cardButtonText={
              this.props.selectedMessage['RegisterSuccess-GoToDashboard']
            }
            cardTableData={[
              {
                itemLable: this.props.selectedMessage[
                  'SearchFacility-TestKitId'
                ],
                itemValue: this.state.kitNo,
                IsHeader: true,
              },
              {
                itemLable: this.props.selectedMessage[
                  'SearchFacility-TestDate'
                ],
                itemValue: 'TBD',
                IsHeader: false,
              },
              {
                itemLable: this.props.selectedMessage[
                  'SearchFacility-TimeOfResults'
                ],
                itemValue: 'TBD',
                IsHeader: false,
              },
              {
                itemLable: this.props.selectedMessage[
                  'SearchFacility-TestFacility'
                ],
                itemValue: 'TBD',
                IsHeader: false,
              },
            ]}></ApprovedKit>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.RBErrorSheet = ref;
          }}
          height={errorHeight}
          openDuration={250}
          onClose={this._closeBottomSheet.bind(this)}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            // draggableIcon: {
            //   backgroundColor: "white"
            // },
            container: {
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              //backgroundColor:rejectColor,
            },
          }}>
          <View>
            <Image
              style={{ width: 120, height: 120, alignSelf: 'center' }}
              resizeMode="contain"
              source={Images.Rejectedkitimage}
            />
          </View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <Text
              style={[
                Helpers.btnText,
                Helpers.mediumfont,
                {
                  color: Colors.patientColor,
                  fontSize: 30,
                  textAlign: 'center',
                  marginTop: 25,
                  justifyContent: 'center',
                },
              ]}>
              {
                this.props.selectedMessage[
                'TestingSiteListScreen-QRCodeRejected'
                ]
              }
            </Text>

            <Text
              style={[
                Helpers.btnText,
                Helpers.book,
                {
                  color: Colors.BlueColorNew,
                  fontSize: 15,
                  textAlign: 'center',
                  marginTop: 15,
                  marginBottom: 15,
                  width: 330,
                },
              ]}>
              {
                this.props.selectedMessage[
                'TestingSiteListScreen-QRCodeRejectedAndSupport'
                ]
              }
            </Text>
          </View>
          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                backgroundColor: Colors.patientColor,
                width: '90%',
                alignSelf: 'center',
              },
            ]}
            onPress={() => {
              this.RBErrorSheet.close();
            }}
          //   onPress={()=>{NavigationService.navigate('InstructionFirstScreen')}}
          >
            <Text
              style={[Helpers.btnText, { color: Colors.white, fontSize: 17 }]}>
              {this.props.selectedMessage['AccountLogin-TryAgainButton']}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              Helpers.btn,
              {
                marginTop: 12,
                marginBottom: 10,
                backgroundColor: Colors.white,
                width: '90%',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Colors.patientColor,
              },
            ]}
            onPress={() => {
              this.RBErrorSheet.close();
            }}>
            <Text
              style={[
                Helpers.btnText,
                { color: Colors.patientColor, fontSize: 17 },
              ]}>
              {this.props.selectedMessage['TestResult-Cancel']}
            </Text>
          </TouchableOpacity>

          {/* <RejectedKit
  containerStyle={[{height:'100%',width:'100%',backgroundColor:'white',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}]}
  bgImageContainerStyle={[{height:150,width:150,backgroundColor:'white',alignSelf:'center'}]}
  bgImage={Images.Rejectedkitimage}
  imageContainerStyle={[{height:'100%',width:'100%',flexDirection:'column',justifyContent:'flex-start'}]}
  rejectKitTopHeaderStyle={[Helpers.btnText,{color:'white',fontSize:20,marginTop:20,textAlign:'center',fontWeight:'bold'}]}
  //rejectKitTopHeader={this.props.selectedMessage["SearchFacility-InvalidQRCode"]}
  rejectKitHeaderStyle={[Helpers.btnText,Helpers.mediumfont,{color:Colors.patientColor,fontSize:30,textAlign:'center', marginTop:50, justifyContent:'center'}]}
  rejectKitHeader='QR Code Rejected!'
  txtConatinerStyle={[{height:280,width:'100%',backgroundColor:'white', alignItems:'center',justifyContent:'space-around'}]}
  rejectKitParagraphStyle={[Helpers.btnText,{color:'#000000',fontSize:15,textAlign:'center', marginTop:10,width:'80%',  justifyContent:'flex-start'}]}
  rejectKitParagraph={this.props.selectedMessage["SearchFacility-TheTestKitQRCodeThatYouScannedIsIncorrect"]}

  rejectedKitButtonContainerStyle={[Helpers.buttonContainer,{backgroundColor:'#f92a2a',width:'70%'}]}
  rejectedKitButtonTextStyle={[Helpers.btnText]}
  rejectKitbtnText={this.props.selectedMessage["SearchFacility-RescanQRCode"]}

  rejectKitCanelButtonContainerStyle={[Helpers.buttonContainer,{backgroundColor:'white',width:'70%',marginBottom:20 }]}
  rejectKitCanelButtonTextStyle={[Helpers.btnText,{fontSize:18,color:'#f92a2a',fontWeight:"bold"}]}
  rejectKitbtnCanelText={this.props.selectedMessage["SearchFacility-Cancel"]}
  onPress={()=>{this.RBErrorSheet.close()}}
  onCancelPress={this._goToDashboard.bind(this)} >
  </RejectedKit>
  */}
        </RBSheet>

        {this.state.IsTextMode ? (
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
                    {
                      fontSize: 15,
                      color: '#152C52',
                      width: 80,
                      textAlign: 'left',
                    },
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
                    color: '#815CCC',
                    textAlign: 'center',
                    width: '100%',
                    marginTop: 20,
                  },
                ]}>
                {
                  this.props.selectedMessage[
                  'SearchFacility-EnterTestKitQRCode'
                  ]
                }
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
                  this.state.inputs['kitNo'].touched
                    ? this.renderError('kitNo')
                      ? { borderColor: Colors.error }
                      : { borderColor: Colors.patientColor }
                    : { borderColor: Colors.GreyColor }
                ]}
                inputBoxstyle={[Helpers.txtRoundInputs]}
                placeholder={
                  this.props.selectedMessage[
                  'TestingSiteListScreen-TypeQRCodeNumber'
                  ]
                }
                placeholderTextColor="#8492A6"
                onChangeText={(value) =>
                  this.onInputChange({ id: 'kitNo', value })
                }
                onEndEditing={this._onKitInputBlur.bind(this)}
                value={this.state.inputs.kitNo.value}
                inputLabl={''}
                componentStyle={[
                  Helpers.column,
                  Helpers.crossStart,
                  { height: 50, marginLeft: 15, marginBottom: 10 },
                ]}
                inputBoxLableStyle={[Helpers.inputBoxLable, { marginLeft: 15 }]}
                rightIconStyle={[Helpers.rightIconStyle, { marginRight: 20 }]}
                hasEvent={false}
                hasRightIcon={true}
                maxLength={50}
                rightIcon={
                  this.state.inputs['kitNo'].touched
                    ? this.renderError('kitNo')
                      ? Images.InValid
                      : Images.ValidPurple
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
                      backgroundColor: '#815CCC',
                      borderColor: '#614698',
                      borderWidth: 1,
                      height: 50,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={this._onEnterCodeSubmit.bind(this)}>
                  <Text
                    style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
                    {this.props.selectedMessage['SearchFacility-EnterCodeNew']}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
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
                onRead={this.onScanDelay}
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
                      color: '#815CCC',
                      textAlign: 'center',
                      height: 60,
                      marginBottom: 15,
                      width: '100%',
                    },
                    Helpers.mediumFont,
                  ]}>
                  {' '}
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
                  {' '}
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
                  <Text
                    style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
                    {this.props.selectedMessage['NewTester-ScanQRCode']}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    Helpers.btn,
                    {
                      backgroundColor: '#614698',
                      height: 50,
                      width: '47%',
                      borderRadius: 8,
                    },
                  ]}
                  onPress={() => {
                    this.setState({ IsTextMode: true });
                  }}>
                  <Text
                    style={[Helpers.btnText, { color: '#FFFFFF', fontSize: 15 }]}>
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
                      borderColor: '#614698',
                      borderWidth: 1,
                      height: 50,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={() => {
                    NavigationService.popScreen();
                  }}>
                  <Text
                    style={[Helpers.btnText, { color: '#614698', fontSize: 15 }]}>
                    {this.props.selectedMessage['TestResult-Cancel']}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

PatientQRCodeScannerScreen.propTypes = {
  authenticatedUser: PropTypes.object,
  associateValidateKitWithPatientSuccessMessage: PropTypes.string,
  associateValidateKitWithPatientFailureMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,
  associateValidateKitWithPatient: PropTypes.func,
  resetAssociateKitStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  patientScannedKit: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  associateValidateKitWithPatientSuccessMessage:
    state.patientProfile.associateValidateKitWithPatientSuccessMessage,
  associateValidateKitWithPatientFailureMessage:
    state.patientProfile.associateValidateKitWithPatientFailureMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
  selectedMessage: state.startup.selectedMessage,
});

const mapDispatchToProps = (dispatch) => ({
  associateValidateKitWithPatient: (data) =>
    dispatch(PatientProfileActions.associateValidateKitWithPatient(data)),
  resetAssociateKitStates: () =>
    dispatch(PatientProfileActions.resetAssociateKitStates()),
  patientScannedKit: (data) =>
    dispatch(PatientProfileActions.patientScannedKit(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientQRCodeScannerScreen);
const styles = StyleSheet.create({
  centerText: {
    //fontFamily:'gothamrounded-bold',
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
