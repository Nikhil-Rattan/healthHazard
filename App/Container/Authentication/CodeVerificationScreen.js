import React from 'react';
import {
  Animated,
  Platform,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AuthenticateActions from 'App/Stores/Authentication/Actions';
import { Helpers, Colors, ApplicationStyles, Images } from 'App/Theme';

import {
  Enums,
  EmailEnum,
  SubjectsEnum,
} from 'App/Enums';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import CustomInputBox from 'App/Components/CustomInputBox';
import CustomButton from 'App/Components/CustomButton';
import HeaderProgress from 'App/Components/HeaderProgress';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import NavigationService from 'App/Services/NavigationService';
import TopHeaderWithTwoOption from 'App/Components/TopHeaderWithTwoOption';
import { Config } from 'App/Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class CodeVerificationScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = { verficationCode: '', isValid: false, touched: false };
  }

  componentDidMount() { }

  onChangeVerifyCodeText(value) {

    if (value == this.props.verifyCode) {
      this.setState({ isValid: true, verificationCode: value, touched: true });
    } else {
      this.setState({ isValid: false, verificationCode: value, touched: true });
    }
  }

  _onSignUpPressButton() {
    if (this.state.isValid) {
      let screenName =
        this.props.accountType == Enums.Facility
          ? 'FacilityContanctPersonProfile'
          : 'BuildProfileScreen';
      NavigationService.navigate(screenName);
    }
  }

  _onSendCode() {
    const { buildProfilePayload } = this.props;
    let EmailPayload = {
      Email: buildProfilePayload.Email,
      Subject: SubjectsEnum['VerificationCode-' + this.props.locale], //?SubjectsEnum.VerificationCode:SubjectsEnum.VerificationCodeSpanish,
      EmailType: EmailEnum.EmailVerify,
      Params: {
        Passcode: '',
        URL: Config.ImageURL,
        SMSURL: Config.SMSFrontURL,
        Language: this.props.locale,
      },
      PhoneNo: buildProfilePayload.PhoneNo,
    };
    EmailPayload.Params.Passcode = Math.floor(100000 + Math.random() * 900000);
    this.props.sendVerifyCode(EmailPayload);
    this.setState({ IsTimerStops: false });
  }

  _GoBack() {
    NavigationService.popScreen();
  }

  render() {
    const IsFacility = this.props.accountType == Enums.Facility;
    const { isValid } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopHeaderWithTwoOption
          HeaderTitle=""
          fullComponentbackgroundColor={Colors.white}
          fullComponentHeight={60}
          RightHeaderTitle="Edit"
          IsImage={true}
          LeftImage={IsFacility ? Images.GreenBackIcon : Images.PurPleBackIcon}
          RightImage={Images.BackIcon}
          RightSideTitleColor={Colors.patientColor}
          onPressLeftButton={this._GoBack.bind(this)}
        />
        <View
          style={[
            Helpers.fill,
            { backgroundColor: 'white', paddingHorizontal: 10 },
          ]}>
          <KeyboardAwareScrollView>
            <HeaderProgress
              rowStyle={[
                ApplicationStyles.header,
                {
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: 50,
                },
              ]}
              progressStyle={[Helpers.headerLeftRow]}
              progressCount={25}
              rightColor={IsFacility ? Colors.facilityColor : Colors.patientColor}
              leftColor={'#FBFBFB'}
            />
            <View
              style={{
                height: 280,
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  Helpers.lightBook,
                  {
                    color: '#333333',
                    textAlign: 'left',
                    width: '90%',
                    marginBottom: 7,
                  },
                ]}>
                {this.props.selectedMessage['RegisterVerifyMail-Verification']}
              </Text>
              <Text
                style={[
                  Helpers.bold,
                  {
                    fontSize: 28,
                    color: '#333333',
                    textAlign: 'left',
                    width: '90%',
                    marginBottom: 10,
                  },
                ]}>
                {this.props.selectedMessage['RegisterVerifyMail-CheckYourEmail']}
              </Text>

              <CustomInputBox
                containerStyle={[
                  Helpers.txtRoundInputContainer, ,
                  this.state.touched
                    ? !this.state.isValid
                      ? { borderColor: Colors.error }
                      : {
                        borderColor: IsFacility
                          ? Colors.facilityColor
                          : Colors.patientColor,
                      }
                    : { borderColor: 'BDBDBD' },
                ]}
                inputBoxstyle={[
                  Helpers.txtRoundInputs,
                  Helpers.fill,
                  {
                    color: IsFacility
                      ? Colors.facilityColor
                      : Colors.patientColor,
                  },
                ]}
                placeholder={
                  this.props.selectedMessage[
                  'RegisterVerifyMail-EnterThe6DigitsPasscode'
                  ]
                }
                placeholderTextColor={Colors.placeholderGraycolor}
                onChangeText={this.onChangeVerifyCodeText.bind(this)}
                value={this.state.verificationCode}
                maxLength={6}
                componentStyle={[Helpers.column, Helpers.crossStart]}
                rightIconStyle={[Helpers.rightIconStyle]}
                inputBoxLableStyle={[Helpers.inputBoxLable]}
                hasEvent={false}
                hasRightIcon={true}
                keyboardType={'numeric'}
                rightIcon={
                  this.state.touched
                    ? !this.state.isValid
                      ? Images.InValid
                      : IsFacility
                        ? Images.ValidGreen
                        : Images.ValidPurple
                    : null
                }
              />

              {this.state.IsTimerStops ? (
                <View
                  style={[
                    Helpers.rowMain,
                    {
                      backgroundColor: 'transparent',
                      alignSelf: 'center',
                      marginTop: 15,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={this._onSendCode.bind(this)}
                    style={{}}>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <Text
                        style={[
                          Helpers.btnText,
                          {
                            color: '#2D60B5',
                            fontSize: 14,
                            textAlign: 'center',
                          },
                        ]}>
                        {' '}
                        {
                          this.props.selectedMessage[
                          'RegisterVerifyMail-SendNewCode'
                          ]
                        }{' '}
                      </Text>
                    </View>
                    <Text
                      ellipsizeMode="clip"
                      style={{
                        color: '#2D60B5',
                        fontSize: 12,
                        width: 150,
                        fontStyle: 'normal',
                      }}
                      numberOfLines={1}>
                      {' '}
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - -{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[
                    Helpers.rowMain,
                    { backgroundColor: 'transparent', alignSelf: 'center' },
                  ]}>
                  <View style={{ alignItems: 'center' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 15,
                      }}>
                      <Text
                        style={[
                          Helpers.btnText,
                          {
                            color: '#2D60B5',
                            fontSize: 14,
                            textAlign: 'center',
                          },
                        ]}>
                        {
                          this.props.selectedMessage[
                          'RegisterVerifyMail-ResendCode'
                          ]
                        }
                      </Text>
                      <Text
                        style={[
                          Helpers.btnText,
                          {
                            color: '#2D60B5',
                            fontSize: 14,
                            textAlign: 'right',
                            marginLeft: 5,
                          },
                        ]}>
                        (
                      </Text>
                      <CountdownCircleTimer
                        isPlaying
                        onComplete={() => {
                          this.setState({ IsTimerStops: true });
                        }}
                        duration={45}
                        colors={[
                          ['#004777', 0.4],
                          ['#F7B801', 0.4],
                          ['#A30000', 0.2],
                        ]}
                        trailColor="#d9d9d9"
                        size={Platform.OS === 'ios' ? 17 : 20}
                        strokeWidth={0}>
                        {({ remainingTime, animatedColor }) => (
                          <Animated.Text style={{ color: animatedColor, paddingTop: 2 }}>
                            {remainingTime}
                          </Animated.Text>
                        )}
                      </CountdownCircleTimer>
                      <Text
                        style={[
                          Helpers.btnText,
                          {
                            color: '#2D60B5',
                            fontSize: 14,
                            textAlign: 'left',
                          },
                        ]}>
                        {' '}
                        {
                          this.props.selectedMessage[
                          'RegisterVerifyMail-SecTimer'
                          ]
                        })
                      </Text>
                    </View>
                    <Text
                      ellipsizeMode="clip"
                      style={{
                        color: '#2D60B5',
                        fontSize: 12,
                        width: this.props.selectedMessage['RegisterVerifyMail-SecTimer'] == 'sec' ? 150 : 230,
                        fontStyle: 'normal',
                      }}
                      numberOfLines={1}>
                      {' '}
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - -{' '}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <View
              style={[
                ApplicationStyles.header,
                {
                  backgroundColor: 'transparent',
                  justifyContent: 'flex-end',
                  paddingVertical: 30,
                },
              ]}>
              <CustomButton
                buttonContainer={[
                  Helpers.buttonContainer, { borderRadius: 10 },
                  {
                    backgroundColor: IsFacility
                      ? Colors.facilityColor
                      : Colors.patientColor,
                  },
                ]}
                buttonTextStyle={[Helpers.btnText]}
                buttonText={
                  this.props.selectedMessage[
                  'RegisterVerifyMail-VerifyEmailAddress'
                  ]
                }
                onPress={this._onSignUpPressButton.bind(this)}></CustomButton>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView >
    );
  }
}

CodeVerificationScreen.propTypes = {
  registrationErrorMessage: PropTypes.string,
  registrationSuccessMessage: PropTypes.string,
  authenticatedIsLoading: PropTypes.bool,
  resetAuthenticateStates: PropTypes.func,
  verifyCode: PropTypes.string,
  verificationCodeErrorMessage: PropTypes.string,
  buildProfilePayload: PropTypes.any,
  accountType: PropTypes.any,

  sendVerifyCode: PropTypes.func,
  selectedMessage: PropTypes.any,
  locale: PropTypes.any,
};
// getting states from reducers
const mapStateToProps = (state) => ({
  authenticatedIsLoading: state.authenticate.authenticatedIsLoading,
  verifyCode: state.authenticate.verifyCode,
  verificationCodeErrorMessage: state.authenticate.verificationCodeErrorMessage,
  buildProfilePayload: state.authenticate.buildProfilePayload,
  accountType: state.authenticate.accountType,
  selectedMessage: state.startup.selectedMessage,
  locale: state.startup.locale,
});
// getting methods from actions
// 'AuthenticateActions' we can any name and import at top with any name ..getting with actions
const mapDispatchToProps = (dispatch) => ({
  resetAuthenticateStates: () =>
    dispatch(AuthenticateActions.resetAuthenticateStates()),
  sendVerifyCode: (data) => dispatch(AuthenticateActions.sendVerifyCode(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeVerificationScreen);
