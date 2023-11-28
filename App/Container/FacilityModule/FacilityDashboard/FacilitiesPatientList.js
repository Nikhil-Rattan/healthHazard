import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import PatientProfileActions from 'App/Stores/PatientProfile/Actions';
import ValidationComponent from 'react-native-form-validator';
import {
  Colors,
  Images,
  Helpers,
} from 'App/Theme';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NavigationService from 'App/Services/NavigationService';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { ValidationService } from 'App/Services/ValidationService';
import CustomInputBox from 'App/Components/CustomInputBox';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
class FacilitiesPatientList extends ValidationComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchvalue: '',
      IsCancelButton: false,
      IsPageIntailized: false,
      scaleAnimationDialogAlert: false,
      DayName: '',
      Date: '',
      IsPatientScanMode: false,
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

      QueryValue: null,
      allPatientList: [],
      currentPage: 1,
      pageLimit: 10,
      allLoaded: false,
      SearchQuery: ' and FacilityUserId=' + this.props.authenticatedUser?.FacilityUserId
    };

    this.onInputChange = ValidationService.onInputChange.bind(this);
    this.getFormValidation = ValidationService.getFormValidation.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.allPatient?.length == 1) {
      if (
        prevProps?.allPatient.length == 0 &&
        this.props?.allPatient?.length == 1
      ) {
        NavigationService.navigate('FacilityDetailsResultsListScreen', {
          itemDetail: this.props.allPatient[0],
        });
        this.setState({ IsCancelButton: false, searchvalue: '', IsPageIntailized: false });
      }
    } else {
      const { allPatientList, currentPage } = this.state;

      var isExist = false;
      if (this.props.allPatient.length > 0) {
        isExist = allPatientList.some(element => {
          if (element?.PatientId === this.props.allPatient[0]?.PatientId) {
            return true;
          }
        });
      }

      /////
      if (this.state.currentPage > 1 && this.props.allPatient.length == 0 && (!this.state.allLoaded)) {
        await this.setState({ allLoaded: true });
      }

      if (this.props.allPatient.length > 0) {
        if (allPatientList.length == 0 && currentPage == 1) {
          this.setState({ allPatientList: this.props.allPatient });
        }
        else if (!isExist) {
          this.setState({ allPatientList: allPatientList.concat(this.props.allPatient) })
        }
      } else if (allPatientList.length > 0 && !this.state.allLoaded) {
        this.setState({ allPatientList: [] });
      }
    }
    //////
  }
  componentDidMount() {

    this.animationInterval = setInterval(() => {
      this.startAnimation();
    }, 2000);
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.resetScaner();
    });
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
  getItemDetail(item) {
    NavigationService.navigate('FacilityDetailsResultsListScreen', {
      itemDetail: item,
    });
    this.setState({ IsCancelButton: false, searchvalue: '' });
  }

  onChangeText(test) {
    if (test != '') {
      this.setState({ searchvalue: test, IsCancelButton: true, QueryValue: test });
    } else {
      this.setState({ searchvalue: test, IsCancelButton: false, QueryValue: test });
    }
  }

  _OnClickCancel() {
    this.setState({
      IsCancelButton: false,
      searchvalue: '',
      IsPageIntailized: false,
      QueryValue: null,
      currentPage: 1,
      allLoaded: false
    });
    this.props.resetAllPatientStates();
  }
  _ClosePopup() {
    this.setState({ scaleAnimationDialogAlert: false });
  }

  componentWillUnmount() {
    this.props.resetAllPatientStates();
    this.setState({ IsCancelButton: false, searchvalue: '' });

    this.setState({ IsMessageShow: false });

    clearInterval(this.animationInterval);

    this._unsubscribe();
  }

  async onEndEditing() {
    if (this.state.searchvalue == '') {
      return;
    }

    await this.setState({ IsPageIntailized: true, currentPage: 1, allLoaded: false });
    this.getPatientQrCode();
  }
  _GotoBackScreen() {
    NavigationService.popScreen();
  }
  goToTop = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };
  onPressBack_Button() {
    NavigationService.popScreen();
  }

  _addPatient() {
    NavigationService.navigate('FacilityPatientProfileScreen');
  }

  _GotoPatientScanMode() {
    this.setState({ IsPatientScanMode: true });
  }

  // Render Scanner for patient search

  resetScaner() {
    let self = this;

    setTimeout(() => {
      if (self.scanner) {
        self.scanner.reactivate();
      }
    }, 2500);
  }

  onSuccess = async (e) => {
    await this.setState({
      kitNo: e.data,
      IsPatientScanMode: false,
      IsPageIntailized: true,
      QueryValue: e.data,
      currentPage: 1,
      allLoaded: false
    });

    this.getPatientQrCode();
  };

  getPatientQrCode() {
    this.props.resetAllPatientStates();
    let payload = {
      PatientId: 0,
      OrderBy: 'desc',
      // OrderByColumn: 'CreatedOn',
      OrderByColumn: 'PatientId',
      PageSize: this.state.pageLimit,
      PageNo: this.state.currentPage,
      FacilityUserId: this.props.authenticatedUser?.FacilityUserId,
      SearchValue: this.state.QueryValue,
      SearchQuery: " and (Email='" + this.state.QueryValue + "'" + " or PhoneNo='" + this.state.QueryValue + "')"
    };

    // if (QRCode) {
    //   payload.SearchValue = QRCode;
    //   payload.SearchQuery =
    //     " and (Email='" + QRCode + "'" + " or PhoneNo='" + QRCode + "')";
    // } else {
    //   payload.SearchValue = this.state.searchvalue;
    //   payload.SearchQuery =
    //     " and (Email='" +
    //     this.state.searchvalue +
    //     "'" +
    //     " or PhoneNo='" +
    //     this.state.searchvalue +
    //     "')";
    // }
    // alert(JSON.stringify(payload));
    console.log("\n\nPayLoad Data", payload, "\n\n");

    this.props.getAllPatientProfiles(payload);
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
      this.setState({ kitNo: event.nativeEvent.text });
    }
  }

  async _onEnterCodeSubmit() {
    if (!this.renderError('kitNo')) {
      let kitno = this.state.inputs['kitNo'].value;

      await this.setState({
        kitNo: kitno,
        IsPatientScanMode: false,
        IsPageIntailized: true,
        QueryValue: kitno,
        currentPage: 1,
        allLoaded: false
      });

      this.getPatientQrCode();
    }
  }

  ScanPatientQRCode() {
    this.setState({ IsPatientScanMode: true });
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

  scroll_timer = 0;
  handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;

    clearTimeout(this.scroll_timer);
    this.scroll_timer = setTimeout(() => {
      const paddingToBottom = 200;
      if (
        layoutHeight + scrollPosition >= contentHeight - paddingToBottom &&
        (!this.state.allLoaded)
      ) {
        this.setState({ currentPage: this.state.currentPage + 1 })
        this.getPatientQrCode()
      }
    }, 200);
  };

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
            {this.props.selectedMessage['NewTester-EnterPatientQRCode']}
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
              {this.props.selectedMessage['NewTester-ScanPatientQRCode']}
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
              ]}></Text>
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
                this.setState({
                  IsPageIntailized: false,
                  IsPatientScanMode: false,
                });
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

  renderPatientSearchWithQRCode() {
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
        {this.state.IsTextMode
          ? this.renderTextMode()
          : this.renderScanMode(transformStyle)}
      </SafeAreaView>
    );
  }

  renderPatientListSearch() {
    return (
      <SafeAreaView style={[{ backgroundColor: 'white', flex: 1 }]}>
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
        <View
          style={[
            {
              height: 80,
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
              shadowOffset: { width: 0.5, height: 0.5 },
              shadowColor: 'black',
              shadowOpacity: 0.5,
              elevation: 15,
            },
          ]}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                width: 46,
                height: 46,
                borderRadius: 46 / 2,
                marginLeft: 9,
                backgroundColor: '#f6f5fa',
                alignItems: 'center',
              }}
              onPress={this.onPressBack_Button.bind(this)}>
              <Image
                style={{ height: 17, width: 17, marginTop: 16 }}
                source={Images.GreenBackIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={[
                {
                  color: Colors.facilityColor,
                  textAlign: 'center',
                  marginTop: 10,
                  fontSize: 16,
                  marginRight: 10,
                  fontFamily: 'gothamrounded-bold',
                },
              ]}>
              {this.props.selectedMessage['FacilitiesPatientList-PatientsHeader']}{' '}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              onPress={this._addPatient.bind(this)}
              style={[
                {
                  color: Colors.facilityColor,
                  textAlign: 'right',
                  marginTop: 10,
                  fontSize: 16,
                  marginRight: 10,
                  fontFamily: 'gothamrounded-bold',
                },
              ]}>
              {this.props.selectedMessage['FacilitiesPatientList-PatientsAdd']}
            </Text>
          </View>
        </View>

        <ScrollView ref={(c) => { this.scroll = c }} onScroll={this.handleScroll}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              height: 60,
              marginTop: 30,
            }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: Colors.TooLightGray,
                  width: '90%',
                  borderRadius: 30,
                },
                this.state.IsCancelButton ? { width: '70%' } : { width: '90%' },
              ]}>
              {this.state.IsCancelButton ? (
                <Image
                  style={[
                    Helpers.iconsmall,
                    { marginLeft: 20, marginVertical: 15 },
                  ]}
                  resizeMode="contain"
                  source={Images.NewSearchIcon}
                />
              ) : (
                <Image
                  style={[
                    Helpers.iconsmall,
                    { marginLeft: 20, marginVertical: 15 },
                  ]}
                  resizeMode="contain"
                  source={Images.NewSearchIcon}
                />
              )}
              <TextInput
                style={{
                  height: 40,
                  fontSize: 17,
                  borderColor: 'gray',
                  marginLeft: 10,
                  width: '80%',
                  marginTop: 8,
                }}
                onChangeText={(text) => this.onChangeText(text)}
                placeholderTextColor="#7B8BB2"
                placeholder={
                  this.props.selectedMessage[
                  'FacilitiesPatientList-FindPatientByName'
                  ]
                }
                onEndEditing={this.onEndEditing.bind(this)}
                value={this.state.searchvalue}
                returnKeyType="done"
              />
            </View>
            {this.state.IsCancelButton ? (
              <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
                <Text
                  style={[
                    ,
                    {
                      fontSize: 18,
                      color: Colors.ErrorREdColor,
                      textAlign: 'left',
                      marginLeft: 20,
                      marginTop: 0,
                    },
                  ]}>
                  {this.props.selectedMessage['TestResult-Cancel']}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {this.state.IsPageIntailized ? (
            this.state.allPatientList.length > 0 ? (
              <View>
                {/* <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 18,
                      color: Colors.lightblack,
                      textAlign: 'left',
                      marginLeft: 20,
                      marginTop: 35,
                      marginBottom: 10,
                      backgroundColor: 'red'
                    },
                  ]}></Text> */}
                <FlatList
                  style={Helpers.Listroot}
                  data={this.state.allPatientList}
                  keyExtractor={(item) => {
                    return item.PatientId;
                  }}
                  maxToRenderPerBatch={this.state.pageLimit}
                  windowSize={this.state.pageLimit}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          width: '100%',
                          marginTop: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                          }}>
                          <TouchableOpacity
                            onPress={this.getItemDetail.bind(this, item)}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              backgroundColor: '#eff2f7',
                              width: '95%',
                              borderRadius: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'column',
                                backgroundColor: 'transparent',
                                justifyContent: 'flex-start',
                                marginTop: 10,
                                marginBottom: 10,
                                width: '80%',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  width: '100%',
                                }}>
                                <Text
                                  style={[
                                    Helpers.bold,
                                    {
                                      marginLeft: 10,
                                      fontSize: 20,
                                      color: '#152c52',
                                      textAlign: 'left',
                                      width: '90%',
                                    },
                                  ]}>
                                  {item.Email}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  style={[
                                    Helpers.lightBook,
                                    {
                                      marginLeft: 10,
                                      fontSize: 16,
                                      color: '#3a295c',
                                      textAlign: 'left',
                                      width: '90%',
                                    },
                                  ]}>
                                  {item.DisplayPhoneNo}
                                </Text>
                              </View>
                            </View>

                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: '20%',
                              }}>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'column',
                                  justifyContent: 'flex-start',
                                  marginRight: 0,
                                }}>
                                <View>
                                  <Image
                                    style={{
                                      width: 25,
                                      height: 25,
                                      marginTop: 20,
                                    }}
                                    resizeMode="cover"
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={[{ height: 100, width: 100, marginTop: 100 }]}
                      resizeMode="contain"
                      source={Images.TesterListend}
                    />
                  </View>
                  <Text
                    style={[
                      Helpers.mediumFont,
                      {
                        fontSize: 18,
                        color: Colors.BlueColorNew,
                        textAlign: 'center',
                        marginTop: 20,
                      },
                    ]}>
                    {
                      this.props.selectedMessage[
                      'FacilitiesPatientList-EndofSearchResults'
                      ]
                    }
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={[
                        Helpers.btn,
                        {
                          height: 50,
                          width: '65%',
                          backgroundColor: 'rgba(88, 150, 138, 0.1)',
                        },
                      ]} onPress={this.goToTop}>
                      <Text
                        style={[
                          Helpers.btnText,
                          { color: Colors.facilityColor, fontSize: 17 },
                        ]}>
                        {
                          this.props.selectedMessage[
                          'FacilitiesPatientList-BacktoTop'
                          ]
                        }
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (!this.props.isPatientProfileLoading) && (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={[{ height: 100, width: 100, marginTop: 100 }]}
                    resizeMode="contain"
                    source={Images.TesterListend}
                  />
                </View>

                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 26,
                      color: Colors.facilityColor,
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                      width: '90%',
                    },
                  ]}>
                  {this.props.selectedMessage['PatientSearch-Result']}
                </Text>
                <Text
                  style={[
                    Helpers.mediumFont,
                    {
                      fontSize: 18,
                      color: Colors.BlueColorNew,
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                      width: '90%',
                    },
                  ]}>
                  {
                    this.props.selectedMessage[
                    'FacilitiesPatientList-SearchPaientByEmailAndPhone'
                    ]
                  }
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <TouchableOpacity
                    style={[
                      Helpers.btn,
                      {
                        height: 50,
                        width: '65%',
                        backgroundColor: 'rgba(88, 150, 138, 0.1)',
                      },
                    ]}
                    onPress={this.ScanPatientQRCode.bind(this)}>
                    <Text
                      style={[
                        Helpers.btnText,
                        { color: Colors.facilityColor, fontSize: 17 },
                      ]}>
                      {this.props.selectedMessage['NewTester-ScanQRCode']}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ) : (
            <View style={{ height: 500 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                  marginBottom: 25,
                }}>
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 46 / 2,
                    justifyContent: 'center',
                    backgroundColor: '#f6f5fa',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      Helpers.book,
                      { fontSize: 18, color: '#152C52', marginRight: 5 },
                    ]}>
                    {' '}
                    {
                      this.props.selectedMessage[
                      'BottomTab-FindPatientQRCodeOR'
                      ]
                    }
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 135,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableWithoutFeedback
                  style={{ height: 135, width: 170, alignSelf: 'center' }}
                  onPress={() => {
                    this.setState({ IsPatientScanMode: true });
                  }}>
                  <View
                    style={[
                      Helpers.PatientCard,
                      {
                        height: 150,
                        width: 170,
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      },
                    ]}>
                    <Image
                      style={{ height: 35, width: 35, marginBottom: 4 }}
                      resizeMode="cover"
                      source={Images.FrameScanQRCode}
                    />
                    <Text
                      style={[
                        {
                          color: '#28998D',
                          fontSize: 12,
                          width: 120,
                          textAlign: 'center',
                        },
                        Helpers.bold,
                      ]}>
                      {
                        this.props.selectedMessage[
                        'BottomTab-FindPatientQRCode'
                        ]
                      }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  render() {
    if (this.state.IsPatientScanMode) {
      return this.renderPatientSearchWithQRCode();
    } else {
      return this.renderPatientListSearch();
    }
  }
}

FacilitiesPatientList.propTypes = {
  allPatient: PropTypes.any,
  allPatientErrorMessage: PropTypes.string,
  isPatientProfileLoading: PropTypes.bool,

  getAllPatientProfiles: PropTypes.func,
  resetAllPatientStates: PropTypes.func,
  selectedMessage: PropTypes.any,
  authenticatedUser: PropTypes.any,
};

const mapStateToProps = (state) => ({
  allPatient: state.patientProfile.allPatient,
  allPatientErrorMessage: state.patientProfile.allPatientErrorMessage,
  isPatientProfileLoading: state.patientProfile.isPatientProfileLoading,
  selectedMessage: state.startup.selectedMessage,
  authenticatedUser: state.authenticate.authenticatedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPatientProfiles: (data) =>
    dispatch(PatientProfileActions.getAllPatientProfiles(data)),
  resetAllPatientStates: () =>
    dispatch(PatientProfileActions.resetAllPatientStates()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilitiesPatientList);
const styles = StyleSheet.create({});
