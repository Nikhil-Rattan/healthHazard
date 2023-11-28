import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import {
  Helpers,
  Colors,
  Images,
  Metrics,
} from 'App/Theme';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ResultTypeEnum } from 'App/Enums';
import HeaderProgress from 'App/Components/HeaderProgress';
import NavigationService from 'App/Services/NavigationService';
import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions';
import CustomPopUpDailog from 'App/Components/CustomPopUpDailog';

class FacilityEnterTestResult extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      IsMessageShow: false,
      Message: '',
      IsSuccess: false,
      IsResultdetected: false,
      IsResultUNdetected: false,
      IsResultInconclusive: false,
      ResultComment: '',
      IsShowPopUp: false,
      IsOnProcess: false,
    };
  }

  componentDidMount() { }

  componentWillUnmount() {
    this.setState({ IsMessageShow: false });
  }
  _CloseAlert() {
    let { IsSuccess } = this.state;
    this.setState({ IsMessageShow: false });
    if (IsSuccess) {
      NavigationService.navigateAndReset('FacilityHome');
    }
  }
  _goBackscreen() {
    NavigationService.popScreen();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.addKitResultErrorMessage != null &&
      prevProps.addKitResultErrorMessage != this.props.addKitResultErrorMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.addKitResultErrorMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: false });
    } else if (
      this.props.addKitResultSuccessMessage != null &&
      prevProps.addKitResultSuccessMessage !=
      this.props.addKitResultSuccessMessage
    ) {
      let Message = this.props.selectedMessage[
        this.props.addKitResultSuccessMessage
      ];
      this.setState({ IsMessageShow: true, Message: Message, IsSuccess: true });
    }
  }

  _Detected() {
    this.setState({
      IsResultdetected: true,
      IsResultUNdetected: false,
      IsResultInconclusive: false,
    });
  }

  _UnDetected() {
    this.setState({
      IsResultUNdetected: true,
      IsResultdetected: false,
      IsResultInconclusive: false,
    });
  }

  _Inconclusive() {
    this.setState({
      IsResultInconclusive: true,
      IsResultdetected: false,
      IsResultUNdetected: false,
    });
  }

  _OpenPresSubmit() {
    const {
      IsResultUNdetected,
      IsResultdetected,
      IsResultInconclusive,
      IsOnProcess
    } = this.state;
    if ((!IsOnProcess) && (IsResultUNdetected || IsResultdetected || IsResultInconclusive)) {
      this.props.resetAddKitResult();
      this.setState({ IsShowPopUp: true });
    }
  }

  _CancelPress() {
    this.setState({ IsShowPopUp: false });
  }

  async _ConfirmPress() {
    this.setState({ IsShowPopUp: false, IsOnProcess: true });
    const {
      IsResultUNdetected,
      IsResultdetected,
      IsResultInconclusive,
    } = this.state;
    const payload = {};
    payload.PatientId = this.props.recentlyAddedPatientResponse.PatientId;
    payload.KitNo = this.props.kitScanResponse.KitNo;
    payload.RestultTypeId = IsResultUNdetected
      ? ResultTypeEnum.Negative
      : IsResultdetected
        ? ResultTypeEnum.Positive
        : ResultTypeEnum.Inconclusive;
    payload.ResultComment = this.state.ResultComment;
    payload.FacilityUserId = this.props.authenticatedUser?.FacilityUserId;
    payload.LoginUserId = this.props.authenticatedUser?.UserId;
    await this.props.addKitResult(payload);
    setTimeout(() => {
      this.setState({ IsOnProcess: false });
    }, 2000);
  }

  render() {
    const {
      IsResultUNdetected,
      IsResultdetected,
      IsResultInconclusive,
    } = this.state;
    const alertColor = IsResultUNdetected
      ? Colors.facilityColor
      : IsResultdetected
        ? Colors.ErrorREdColor
        : Colors.patientColor;
    const testType = IsResultUNdetected
      ? this.props.selectedMessage['TestResult-Negative']
      : IsResultdetected
        ? this.props.selectedMessage['TestResult-Positive']
        : this.props.selectedMessage['TestResult-Inconclusive'];

    return (
      <SafeAreaView style={{ flex: 1 }}>
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
        <CustomPopUpDailog
          onHardwareBackPress={() => {
            this.setState({ IsShowPopUp: false });
            return true;
          }}
          scaleAnimationDialogAlert={this.state.IsShowPopUp}
          PopUpContainerStyle={{ backgroundColor: alertColor }}
          HeaderTitle={this.props.selectedMessage['TestResult-PleaseConfirm']}
          HeadTitleColor="#FFFFFF"
          MessageColor="#FFFFFF"
          leftbuttonbordercolor="#FFFFFF"
          leftbuttontextcolor="#FFFFFF"
          rightbuttontextcolor={alertColor}
          Rightbuttonbackgroundcolor="#FFFFFF"
          AlertMessageTitle={this.props.selectedMessage[
            'TestResult-PatientConfirm'
          ]
            .toString()
            .replace('(resultType)', testType)}
          _onLeftButtonPress={this._CancelPress.bind(this)}
          _onRightButtonPress={this._ConfirmPress.bind(this)}
          LeftButtonText={this.props.selectedMessage['FacProfile-Cancel']}
          RightButtonText={this.props.selectedMessage['FacProfile-Confirm']}
        />

        <View
          style={{
            height: 60,
            position: 'relative',
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this._goBackscreen.bind(this)}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              height: 45,
              width: 45,
              borderRadius: 45 / 2,
              backgroundColor: '#E5E9F2',
              marginLeft: 11,
              marginTop: 10,
            }}>
            <Image
              style={{ height: 17, width: 17, marginLeft: 15 }}
              source={Images.GreenBackIcon}
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
                progressCount={100}
                rightColor={Colors.facilityColor}
                leftColor="#E5E9F2"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text
              style={[
                Helpers.mediumFont,
                {
                  fontSize: 18,
                  color: Colors.facilityColor,
                  textAlign: 'left',
                  marginRight: 20,
                },
              ]}>
              4/4
            </Text>
          </View>
        </View>

        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={[
                    Helpers.bold,
                    {
                      marginLeft: 15,
                      fontSize: 32,
                      color: '#333333',
                      textAlign: 'left',
                      width: '90%',
                      marginTop: 80,
                    },
                  ]}>
                  {this.props.selectedMessage['TestResult-EnterTestResults']}
                </Text>
                <Text
                  style={[
                    Helpers.mediumBook,
                    {
                      marginLeft: 15,
                      fontSize: 22,
                      color: '#333333',
                      textAlign: 'left',
                      width: '90%',
                      flexWrap: 'wrap',
                    },
                    Metrics.smallVerticalMargin,
                  ]}>
                  {
                    this.props.selectedMessage[
                    'RegPatient-StateAndUSGovernment'
                    ]
                  }
                </Text>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={this._Detected.bind(this)}
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultdetected
                        ? { backgroundColor: 'red', borderColor: 'red' }
                        : { backgroundColor: 'white', borderColor: 'red' },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultdetected
                            ? { color: 'white' }
                            : { color: 'red' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Positive']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultdetected
                            ? 'white'
                            : 'red',
                          backgroundColor: this.state.IsResultdetected
                            ? 'red'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultUNdetected
                        ? { backgroundColor: '#28998D', borderColor: '#28998D' }
                        : { backgroundColor: 'white', borderColor: '#28998D' },
                    ]}
                    onPress={this._UnDetected.bind(this)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultUNdetected
                            ? { color: 'white' }
                            : { color: '#28998D' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Negative']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultUNdetected
                            ? 'white'
                            : '#28998D',
                          backgroundColor: this.state.IsResultUNdetected
                            ? '#28998D'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultInconclusive
                        ? { backgroundColor: '#614698', borderColor: '#614698' }
                        : { backgroundColor: 'white', borderColor: '#614698' },
                    ]}
                    onPress={this._Inconclusive.bind(this)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultInconclusive
                            ? { color: 'white' }
                            : { color: '#614698' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Inconclusive']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultInconclusive
                            ? 'white'
                            : '#614698',
                          backgroundColor: this.state.IsResultInconclusive
                            ? '#614698'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: 150,
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '95%',
                    height: 150,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: this.state.IsResultInconclusive
                      ? Colors.patientColor
                      : this.state.IsResultUNdetected
                        ? Colors.facilityColor
                        : this.state.IsResultdetected
                          ? 'red'
                          : '#E5E5E5',
                  }}>
                  <TextInput
                    style={
                      [{
                        height: 150,
                        fontSize: 13,
                        color: Colors.Black,
                        width: '100%',
                        marginVertical: 20,
                        paddingHorizontal: 15,
                        textAlignVertical: 'top',
                      },
                      Helpers.mediumFont]
                    }
                    multiline={true}
                    maxLength={160}
                    placeholder={
                      this.props.selectedMessage['TestResult-TestNote']
                    }
                    placeholderTextColor="#414141"
                    onChangeText={(text) => {
                      this.setState({ ResultComment: text });
                    }}
                  />
                </View>
              </View>
              <View style={{ height: 50, marginBottom: 100 }}></View>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <View
            style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                }}>
                <Text
                  style={[
                    Helpers.bold,
                    {
                      marginLeft: 15,
                      fontSize: 32,
                      color: '#333333',
                      textAlign: 'left',
                      width: '90%',
                      marginTop: 80,
                    },
                  ]}>
                  {this.props.selectedMessage['TestResult-EnterTestResults']}
                </Text>
                <Text
                  style={[
                    Helpers.mediumBook,
                    {
                      marginLeft: 15,
                      fontSize: 22,
                      color: '#333333',
                      textAlign: 'left',
                      width: '90%',
                      flexWrap: 'wrap',
                    },
                    Metrics.smallVerticalMargin,
                  ]}>
                  {
                    this.props.selectedMessage[
                    'RegPatient-StateAndUSGovernment'
                    ]
                  }
                </Text>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    onPress={this._Detected.bind(this)}
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultdetected
                        ? { backgroundColor: 'red', borderColor: 'red' }
                        : { backgroundColor: 'white', borderColor: 'red' },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultdetected
                            ? { color: 'white' }
                            : { color: 'red' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Positive']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultdetected
                            ? 'white'
                            : 'red',
                          backgroundColor: this.state.IsResultdetected
                            ? 'red'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultUNdetected
                        ? { backgroundColor: '#28998D', borderColor: '#28998D' }
                        : { backgroundColor: 'white', borderColor: '#28998D' },
                    ]}
                    onPress={this._UnDetected.bind(this)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultUNdetected
                            ? { color: 'white' }
                            : { color: '#28998D' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Negative']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultUNdetected
                            ? 'white'
                            : '#28998D',
                          backgroundColor: this.state.IsResultUNdetected
                            ? '#28998D'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
                  <TouchableOpacity
                    style={[
                      Helpers.CardWithTwoOption,
                      this.state.IsResultInconclusive
                        ? { backgroundColor: '#614698', borderColor: '#614698' }
                        : { backgroundColor: 'white', borderColor: '#614698' },
                    ]}
                    onPress={this._Inconclusive.bind(this)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginLeft: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.mediumFont,
                          Helpers.CardText,
                          this.state.IsResultInconclusive
                            ? { color: 'white' }
                            : { color: '#614698' },
                        ]}>
                        {this.props.selectedMessage['TestResult-Inconclusive']}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 15,
                      }}>
                      <View
                        style={{
                          height: 15,
                          width: 15,
                          borderRadius: 15 / 2,
                          borderWidth: 1.5,
                          borderColor: this.state.IsResultInconclusive
                            ? 'white'
                            : '#614698',
                          backgroundColor: this.state.IsResultInconclusive
                            ? '#614698'
                            : 'white',
                        }}></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  height: 150,
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: 20,
                }}>
                <View
                  style={{
                    width: '95%',
                    height: 150,
                    borderWidth: 1,
                    borderRadius: 12,
                    borderColor: this.state.IsResultInconclusive
                      ? Colors.patientColor
                      : this.state.IsResultUNdetected
                        ? Colors.facilityColor
                        : this.state.IsResultdetected
                          ? 'red'
                          : '#E5E5E5',
                  }}>
                  <TextInput
                    style={
                      [{
                        flex: 1,
                        width: '100%',
                        height: 150,
                        fontSize: 13,
                        color: Colors.Black,
                        marginVertical: 20,
                        paddingHorizontal: 15,
                        textAlignVertical: 'top',
                      },
                      Helpers.mediumFont]
                    }
                    multiline={true}
                    maxLength={160}
                    placeholder={
                      this.props.selectedMessage['TestResult-TestNote']
                    }
                    placeholderTextColor="#414141"
                    onChangeText={(text) => {
                      this.setState({ ResultComment: text });
                    }}
                  />
                </View>
              </View>
              <View style={{ height: 50, marginBottom: 100 }}></View>
            </ScrollView>
          </View>
        )}
        <View style={[{ backgroundColor: 'white' }]}>
          <View style={[Helpers.btnContainer, { marginBottom: 15 }]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={this.state.IsOnProcess ? ['#E5E5E5', '#E5E5E5'] : ['#614698', '#614698', '#614698']}
              style={[Helpers.bigBtnGradient]}>
              <TouchableOpacity
                style={[Helpers.btn, { backgroundColor: Colors.patientColor }]}
                onPress={
                  this.state.IsResultInconclusive
                    ? this._OpenPresSubmit.bind(this)
                    : this.state.IsResultUNdetected
                      ? this._OpenPresSubmit.bind(this)
                      : this.state.IsResultdetected
                        ? this._OpenPresSubmit.bind(this)
                        : null
                }>
                <Text
                  style={[
                    Helpers.btnText,
                    { color: Colors.white, fontSize: 15 },
                  ]}>
                  {this.props.selectedMessage['TestResult-SubmitTestResults']}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

FacilityEnterTestResult.propTypes = {
  kitScanResponse: PropTypes.any,
  recentlyAddedPatientResponse: PropTypes.any,
  authenticatedUser: PropTypes.object,
  addKitResult: PropTypes.func,
  addKitResultSuccessMessage: PropTypes.any,
  addKitResultErrorMessage: PropTypes.any,
  selectedMessage: PropTypes.any,
};

// getting states from reducers
const mapStateToProps = (state) => ({
  kitScanResponse: state.patientProfile.kitScanResponse,
  recentlyAddedPatientResponse:
    state.facilityProfile.recentlyAddedPatientResponse,
  authenticatedUser: state.authenticate.authenticatedUser,
  addKitResultSuccessMessage: state.facilityProfile.addKitResultSuccessMessage,
  addKitResultErrorMessage: state.facilityProfile.addKitResultErrorMessage,
  selectedMessage: state.startup.selectedMessage,
});

// getting  methods from actions
// 'AuthenticateActions'  we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  addKitResult: (data) => dispatch(FacilityProfileActions.addKitResult(data)),
  resetAddKitResult: () => dispatch(FacilityProfileActions.resetAddKitResult()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityEnterTestResult);
